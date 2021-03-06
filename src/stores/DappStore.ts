import { SubStore } from './SubStore';
import { action, autorun, computed, IReactionPublic, observable } from 'mobx';
import { RootStore } from '@stores';

export const NODE_URL = 'https://testnodes.wavesnodes.com';
export const DAPP_ASSET = 'ED8edEtbWVhMHNMsHsMiEmmJjyQfmcky7qkUywjjawzY';
export const DAPP_ADDRESS = '3N2MgATULesg3Pbc1z77qNaN92FwMGTrFqv';


//waves deposit u/1000000000
//superBtc lend u/100000000
const m = 100000000;

class DappStore extends SubStore {
    @observable maxTokenCount = 0;
    @observable interestPeriod = 1;
    @observable gracePeriod = 1;

    @observable currentRate: number = 10000;
    //loanDetails
    @observable start: string | null = null;
    @observable end_of_freeze: string | null = null;
    @observable rate: string | null = null;
    @observable deposit: string | null = null;
    @observable lend: string | null = null;
    //
    @observable height: number = 0;

    @observable wait: boolean = false;


    constructor(rootStore: RootStore) {
        super(rootStore);

        this.updateRate();
        this.updateInterestPeriod();
        this.updateGracePeriod();
        this.updateMaxTokenCount();
        this.updateHeight();

        this.printDappData(); //todo remove
    }

    @computed get isLoaned(): boolean {
        return this.end_of_freeze != null && this.end_of_freeze !== '0';
    }

    @action
    setWait = (wait: boolean) => {
        console.log(wait);
        this.wait = wait;
    };


    @action
    updateHeight = async () => {
        const json = await (await fetch(`${NODE_URL}/blocks/height`)).json();
        if (!json.error) this.height = json.height;
    };


    @action
    updateRate = async () => {
        const json = await (await fetch(`${NODE_URL}/addresses/data/${DAPP_ADDRESS}/rate`)).json();
        if (!json.error) this.currentRate = json.value;
    };

    @action
    updateInterestPeriod = async () => {
        const json = await (await fetch(`${NODE_URL}/addresses/data/${DAPP_ADDRESS}/interestPeriod`)).json();
        if (!json.error) this.interestPeriod = json.value;
    };

    @action
    updateGracePeriod = async () => {
        const json = await (await fetch(`${NODE_URL}/addresses/data/${DAPP_ADDRESS}/gracePeriod`)).json();
        if (!json.error) this.gracePeriod = json.value;
    };

    @action
    updateMaxTokenCount = async () => {
        const json = await (await fetch(`${NODE_URL}/assets/balance/${DAPP_ADDRESS}/${DAPP_ASSET}`)).json();
        if (!json.error) this.maxTokenCount = json.balance / m;
    };

    @action
    updateLoanDetails = async (address: string) => {
        const landDetailsMap = ['lend', 'start', 'rate', 'deposit'];
        const resp = await fetch(`${NODE_URL}/addresses/data/${DAPP_ADDRESS}/end_of_freeze_of_${address}`);
        const json = await (resp).json();

        // if (this.end_of_freeze == json.value) this.setWait(false);

        if (json.error || json.value === '0') {
            landDetailsMap.forEach(key => this[key] = null);
            return;
        } else {
            this.end_of_freeze = (json.value || null);
        }
        landDetailsMap.map(async (key) => {
            const path = `${NODE_URL}/addresses/data/${DAPP_ADDRESS}/${key}_of_${address}`;
            const json = await (await fetch(path)).json();
            const out = {};
            this[key] = (json.value || null);
            return out;
        });
        return;
    };

     printDappData = async () =>
        console.dir(await (await fetch(`${NODE_URL}/addresses/data/${DAPP_ADDRESS}`)).json());

    @action
    borrow = (u: number) => {
        if (u <= 0) {
            alert('Your amount cannot be less than or equal to zero.');
            return;
        }
        this.wait = true;
        window['WavesKeeper'].signAndPublishTransaction({
            type: 16,
            data: {
                dApp: DAPP_ADDRESS,
                fee: {'tokens': '0.05', 'assetId': 'WAVES'},
                call: {function: 'borrow', args: []},
                payment: [{assetId: null, tokens: u}]
            }
        }).then((tx) => {
            const transaction = JSON.parse(tx);
            this.updateDetailsByTxObject(transaction);
            this.startTxByIdWatcher(transaction);
        }).catch((error) => {
            alert(error.message);
            this.wait = false;
        });
    };


    @action
    buyBack = () => {
        if (this.lend === null) {
            alert('Invalid lend');
            return;
        } else {
            this.wait = true;
            window['WavesKeeper'].signAndPublishTransaction({
                type: 16,
                data: {
                    dApp: DAPP_ADDRESS,
                    fee: {'tokens': '0.05', 'assetId': 'WAVES'},
                    call: {function: 'buyBack', args: []},
                    payment: [{assetId: DAPP_ASSET, tokens: +this.lend / m}]
                }
            }).then((tx) => {
                const transaction = JSON.parse(tx);
                console.log(transaction);
                this.updateDetailsByTxObject(transaction);
                this.startTxByIdWatcher(transaction);
            }).catch((error) => {
                alert(error.message);
                this.wait = false;
            });
        }
    };


    @action
    discard = () => {
        this.wait = true;
        window['WavesKeeper'].signAndPublishTransaction({
            type: 16,
            data: {
                dApp: DAPP_ADDRESS,
                fee: {'tokens': '0.05', 'assetId': 'WAVES'},
                call: {function: 'discard', args: []},
                payment: []
            }
        }).then((tx) => {
            const transaction = JSON.parse(tx);
            this.updateDetailsByTxObject(transaction);
            this.startTxByIdWatcher(transaction);
        }).catch((error) => {
            alert(error.message);
            console.log(error);
            this.wait = false;
        });
    };

    @action
    updateDetailsByTxObject(tx: any) {
        const landDetailsMap = ['lend', 'start', 'end_of_freeze', 'rate', 'deposit'];
        const data = tx.trace[tx.trace.length - 1].result.data;
        try {
            landDetailsMap.forEach(k => {
                const val = (data.find(({key}) => key === `${k}_of_${tx.sender}`).value);
                this[k] = val === '0' ? null : val;
            });
        } catch (e) {
            console.log(e);
            this.updateLoanDetails(JSON.parse(tx).sender);
        }
    }

    startHeightWatcher = () =>
        autorun((reaction) => this.updateHeight(), {scheduler: run => setInterval(run, 30000)});

    @action
    getTxById = async ({id, address}: { id: string, address: string }, reaction: IReactionPublic) => {
        const resp = await fetch(`${NODE_URL}/transactions/info/${id}`);
        if (resp.status === 200) {
            this.updateLoanDetails(address).then(() => {
                this.setWait(false);
            });
            reaction.dispose();
        }
    };

    startTxByIdWatcher = (tx) =>
        autorun((reaction) => this.getTxById(tx, reaction), {scheduler: run => setInterval(run, 2000)});


}

export default DappStore;
