import { observable, action, computed, autorun, set, observe } from 'mobx';
import axios from 'axios';
import qs from 'query-string';

import { PaginationProps } from 'antd/lib/pagination';

import { RootStore } from './RootStore';
import { SubStore } from './SubStore';

export interface ITokenDetails {
  ticker: string;
  id: string;
  name: string;
  precision: number;
  description: string;
  height: number;
  timestamp: string;
  sender: string;
  quantity: string;
  reissuable: boolean;
  hasScript: boolean;
  minSposoredFee: string;
  quote: number;
}

export interface IScoreBoard {
  assetId: string;
  averageScore: number;
  votesCount: number;
  sumTokens: number;
  scoreBoard: {
    '1': {
      votes: number;
      tokens: number;
    };
    '2': {
      votes: number;
      tokens: number;
    };
    '3': {
      votes: number;
      tokens: number;
    };
    '4': {
      votes: number;
      tokens: number;
    };
    '5': {
      votes: number;
      tokens: number;
    };
  },
  createdAt: Date;
  updatedAt: Date;
}

export interface IToken {
  txId: string;
  assetName: string | any;
  assetId: string;
  sender: string;
  timestamp: number;
  createdAt: Date;
  details: ITokenDetails;
  averageScore?: number;
  lastAverageScore?: number;
  scoreBoard?: IScoreBoard;
  voted?: boolean;
  top?: boolean;
}

export interface IPaginationInfo {
  pages: number;
  limit: number;
  count: number;
}

export interface IAntPaginationConfig {
  current?: number,
  pageSize?: number,
  total?: number
}

export interface IQuery {
  limit?: number,
  page?: number,
  filter?: string
}

export const defaultQuery: IQuery = {
  page: 1,
  filter: 'top'
};

const defaultPaginationInfo = {
  pages: 0,
  limit: 20,
  count: 0
};

export default class TokenListStore extends SubStore {
  @observable tokens: IToken[] = [];

  @observable query: IQuery = defaultQuery;

  @observable paginationInfo: IPaginationInfo = defaultPaginationInfo;

  @observable isLoading: boolean = true;

  constructor(rootStore: RootStore) {
    super(rootStore);

    // observe(this.query, 'page', (change) => {
    //   if (change!.newValue !== change!.oldValue) {
    //     this.loadTokens();
    //   }
    // });

    // observe(this.query, 'filter', (change) => {
    //   if (change!.newValue !== change!.oldValue) {
    //     this.loadTokens();
    //   }
    // });

    observe(this.rootStore.routerStore, 'location', (change) => {
      const location = change.newValue;

      const isModalRouteOpened = location.state && location.state!.isModalRouteOpened;

      if (!isModalRouteOpened || !change.oldValue) {
        const search = qs.parse(location.search);

        this.loadTokens({
          page: search.page ? Number(search.page) : defaultQuery.page,
          filter: search.filter ? String(search.filter) : defaultQuery.filter
        });

        // this.updateQuery({
        //   page: search.page ? Number(search.page) : defaultQuery.page,
        //   filter: search.filter ? String(search.filter) : defaultQuery.filter
        // });
      }
    });
  }

  @computed
  get antPaginationConfig(): IAntPaginationConfig {
    return ({
      current: this.query.page,
      pageSize: this.paginationInfo.limit,
      total: this.paginationInfo.count
    });
  }

  @computed
  get isPaginationShown(): boolean {
    return this.paginationInfo.pages > 1 && this.paginationInfo.count > 0;
  }

  @action
  updateQuery(query: IQuery) {
    set(this.query, {
      ...query
    });
  }

  @action
  updatePaginationInfo(paginationInfo: IPaginationInfo) {
    set(this.paginationInfo, {
      ...paginationInfo
    });
  }

  @action
  updateList(query: IQuery) {
    const newQuery: IQuery = {
      ...this.query,
      ...query
    };

    if (newQuery.page === defaultQuery.page) {
      newQuery.page = undefined;
    }

    if (newQuery.filter === defaultQuery.filter) {
      newQuery.filter = undefined;
    }

    const search = qs.stringify(newQuery as { [key: string]: unknown; });

    this.rootStore.routerStore.push({
      pathname: '/',
      search: search
    });
  }

  @action
  async loadTokens(query: IQuery) {
    const { page, filter } = query;

    if (
      page === this.query.page &&
      filter === this.query.filter &&
      this.tokens.length > 0
    ) {
      return;
    }

    const params = {
      page: page ? page : undefined,
      filter: filter ? filter : undefined
    };

    const search = qs.stringify(params, { encode: false });

    this.isLoading = true;

    const res = await axios.get(`/api/v1/token?${search}`);

    const {
      tokens,
      paginationInfo,
    }: { 
      tokens: IToken[],
      paginationInfo: IPaginationInfo
    } = res.data;

    if (page && page > paginationInfo.pages) {
      const newPage = paginationInfo.pages;

      this.updateList({
        page: newPage,
        filter: filter
      });
    } else {
      this.tokens = tokens;

      this.updateQuery(query);

      this.updatePaginationInfo(paginationInfo);

      this.isLoading = false;
    }
  }
}

// TO DO Fix  export
// export default TokenListStore;

// export {
//   IToken
// }
