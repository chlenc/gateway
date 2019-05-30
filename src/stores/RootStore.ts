import {
  AccountStore,
  LocaleStore,
  RouterStore,
  TokenListStore,
} from './index';

class RootStore {
  public localeStore: LocaleStore;
  public accountStore: AccountStore;
  public routerStore: RouterStore;
  public tokenListStore: TokenListStore;

  constructor() {
    this.localeStore = new LocaleStore(this);
    this.accountStore = new AccountStore(this);
    this.routerStore = new RouterStore();
    this.tokenListStore = new TokenListStore(this);
  }
}

export {
  RootStore
};
