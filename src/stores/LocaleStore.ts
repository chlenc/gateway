import { observable, action, computed } from 'mobx';
import axios from 'axios';

import { RootStore } from './RootStore';
import { SubStore } from './SubStore';

import { getCookie } from '@utils';

import translations from '@src/locales/translations';

export interface ILanguage {
  title: string
  abbr: string
}

class LocaleStore extends SubStore {  
  @observable languages: ILanguage[] = [
    { title: 'English', abbr: 'en' },
    { title: 'Русский', abbr: 'ru' }
  ];

  @observable activeLanguageIndex: number = 0;
  
  @observable locale: object = {};

  constructor(rootStore: RootStore) {
    super(rootStore);

    const activeLanguageIndex = getCookie('activeLanguageIndex');

    if (activeLanguageIndex) {
      this.activeLanguageIndex = Number(activeLanguageIndex);
    }
  }

  @computed
  get messages() {
    return translations[this.activeLanguage.abbr];
  }

  @computed
  get activeLanguage(): ILanguage {
    return this.languages[this.activeLanguageIndex];
  }

  @action
  setActiveLanguageIndex(index: number) {
    document.cookie = `activeLanguageIndex=${index}`;

    this.activeLanguageIndex = index;
  }
}

export {
  LocaleStore
};
