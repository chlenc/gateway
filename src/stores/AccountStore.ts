import {
  observable,
  action,
  computed,
  autorun,
  set
} from 'mobx';

import axios from 'axios';

import { RootStore } from './RootStore';
import { SubStore } from './SubStore';

import { getCurrentBrowser } from '@utils';

const defaultApplicationAccount = {
  votes: [],
  balance: 0
};

interface IWavesKeeperAccount {
  address: string
  name: string
  network: string
  networkCode: string
  publicKey: string
  type: string
  balance: {
    available: string
    leasedOut: string
    network: string
  }
}

interface IVote {
  txId: string;
  score: number;
  assetId: string;
  assetName: string;
  sender: string;
  timestamp: number;
  createdAt: Date;
}

interface IApplicationAccount {
  votes: IVote[]
  balance: number
}

interface IKeeperError {
  code: string
  data: any
  message: string
}

class AccountStore extends SubStore {
  @observable applicationNetwork: string = 'testnet';
  @observable applicationAccount: IApplicationAccount = defaultApplicationAccount;
  @observable wavesKeeperAccount?: IWavesKeeperAccount;
  @observable isWavesKeeperLocked: boolean = true;
  @observable isWavesKeeperInitialized: boolean = false;
  @observable isWavesKeeperInstalled: boolean = false;
  @observable isApplicationAuthorizedInWavesKeeper: boolean = false;

  @observable isWavesKeeperAccountUpdatePending: boolean = false;
  @observable isWavesKeeperSetupPending: boolean = true;
  @observable isApplicationAuthorizationPending: boolean = true;
  
  constructor(rootStore: RootStore) {
    super(rootStore);

    if (['tokenrating.wavesexplorer.com', 'tokenrating.philsitumorang.com'].includes(window.location.host)) {
      this.applicationNetwork = 'mainnet';
    }
  }

  @computed 
  get isWavesKeeperEmpty(): boolean {
    return this.wavesKeeperAccount
      ? false
      : true;
  }

  @computed 
  get isBrowserSupportsWavesKeeper(): boolean {
    const browser = getCurrentBrowser();

    return ['chrome', 'firefox', 'opera', 'edge'].includes(browser);
  }

  @computed 
  get isSupportedAccountNetwork(): boolean {
    if (this.wavesKeeperAccount) {
      return this.wavesKeeperAccount!.network === this.applicationNetwork;
    }

    return false;
  }

  @computed
  get hasEnoughBalance () {
    return this.applicationAccount!.balance < 1
      ? false
      : true;
  }

  @action
  resetApplicationAccount = () => {
    this.applicationAccount.votes = [];
    this.applicationAccount.balance = 0;
  }

  @action
  updateApplicationAccount = async () => {
    if (this.wavesKeeperAccount) {
      const { address } = this.wavesKeeperAccount;

      try {
        this.isWavesKeeperAccountUpdatePending = true;

        let [balance, votes]: [number, IVote[]] = await Promise.all([
          this.getApplicationAccountBalance(address),
          this.getApplicationAccountVotes(address)
        ]);

        this.applicationAccount.balance = balance;
        this.applicationAccount.votes = votes;
        this.isWavesKeeperAccountUpdatePending = false;

      } catch (error) {
        this.isWavesKeeperAccountUpdatePending = false;
      }
    }
  }

  getApplicationAccountBalance = (address: string) => {
    return axios.get(`/api/v1/account/asset/balance?address=${address}`)
      .then((res) => res.data.balance)
      .catch((error) => console.error(error));
  }

  getApplicationAccountVotes = (address: string) => {
    return axios.get(`/api/v1/account?sender=${address}`)
      .then((res) => res.data.votes)
      .catch((error) => console.error(error));
  }

  @action
  updateWavesKeeperAccount = (account: IWavesKeeperAccount) => {
    this.wavesKeeperAccount && set(this.wavesKeeperAccount, {
      ...account
    });
  }

  @action
  resetWavesKeeperAccount = () => {
    this.wavesKeeperAccount = undefined;
  }

  @action
  async updateWavesKeeper(publicState: any) {
    this.isWavesKeeperLocked = publicState.locked;

    if (this.wavesKeeperAccount) {
      publicState.account
        ? this.updateWavesKeeperAccount(publicState.account)
        : this.resetWavesKeeperAccount();
    } else {
      this.wavesKeeperAccount = publicState.account;
    }
  }
  
  setupWavesKeeper = () => {
    let attemptsCount = 0;

    autorun(
      (reaction) => {
        if (attemptsCount === 2) {
          reaction.dispose();

          this.isWavesKeeperSetupPending = false;
        } else if (window['WavesKeeper']) {
          reaction.dispose();

          this.isWavesKeeperSetupPending = false;
          this.isWavesKeeperInstalled = true;
        } else {
          attemptsCount += 1;
        }
      },
      { scheduler: run => setInterval(run, 1000)}
    );
  }

  @action
  setupSynchronizationWithWavesKeeper = () => {
    window['WavesKeeper'].initialPromise
      .then(keeperApi => {
        this.isWavesKeeperInitialized = true;

        return keeperApi;
      })
      .then(keeperApi => keeperApi.publicState())
      .then(publicState => {        
        this.isApplicationAuthorizedInWavesKeeper = true;
        this.isApplicationAuthorizationPending = false;

        this.updateWavesKeeper(publicState);

        this.subscribeToWavesKeeperUpdate();
      })
      .catch((error: IKeeperError) => {
        if (error.code === '12') {
          this.isApplicationAuthorizedInWavesKeeper = false;
          this.isApplicationAuthorizationPending = false;
        }

        if (error.code === '14') {
          this.isWavesKeeperLocked = false;

          this.isApplicationAuthorizedInWavesKeeper = true;
          this.isApplicationAuthorizationPending = false;

          this.subscribeToWavesKeeperUpdate();
        }
      });
  }

  subscribeToWavesKeeperUpdate() {
    window['WavesKeeper'].on('update', async (publicState: any) => {
      this.updateWavesKeeper(publicState);
    });
  }

  runWavesKeeperAccountChangeReaction = () => {
    autorun(() => {
      const wavesKeeperAccount = this.wavesKeeperAccount;

      if (wavesKeeperAccount && wavesKeeperAccount.address) {
        this.updateApplicationAccount();
      } else {
        this.resetApplicationAccount();
      }
    });
  }

  // watch for application authorization status in waves keeper
  runApplicationAuthorizationStatusWatcher = () => {
    autorun(
      () => {        
        window['WavesKeeper'].publicState()
          .then((publicState) => {
            this.isApplicationAuthorizedInWavesKeeper = true;

            this.updateWavesKeeper(publicState);
          })
          .catch((error: IKeeperError) => {
            if (error.code === '12') {
              this.isApplicationAuthorizedInWavesKeeper = false;
            }
          });
      },
      { scheduler: run => setInterval(run, 1000)}
    );
  }
}

export default AccountStore;
