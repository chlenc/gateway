import React, { Component } from 'react';
import { injectIntl, InjectedIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import cn from 'classnames';

import StarRating from '@components/StarRating';
import TopBadge from '@components/TopBadge';

import Table, { ColumnProps } from 'antd/lib/table';

import {
  RouterStore,
  TokenListStore
} from '@stores';

import { IToken, IAntPaginationConfig, defaultQuery } from '@stores/TokenListStore';

import { getTokenQuantityWithPrecision } from '@utils';

import { Message } from '@src/locales/messages';

import styles from './styles.scss';

interface IInjectedProps {
  intl: InjectedIntl
  routerStore?: RouterStore
  tokenListStore?: TokenListStore
}

interface IProps extends IInjectedProps {}

@inject('routerStore', 'tokenListStore', 'accountStore')
@observer
class TokenList extends Component<IProps> {
  handleRowClick = (token: IToken) => {
    const { routerStore } = this.props;

    routerStore!.push({
      pathname: `/tokens/${token.assetId}`,
      state: { isModalRouteOpened: true }
    });
  };

  private formatNumber = (number: number, maxDigits?: number ) => {
    const { intl } = this.props;

    return intl.formatNumber(
      number,
      { maximumFractionDigits: maxDigits }
    );
  } 

  private kFormatter = (number: number) => {
    return number > 999
      ? `${this.formatNumber(number / 1000, 1)}K`
      : this.formatNumber(number, 0);
  } 

  private formatCurrency = (currency: number, maxDigits?) => {
    const { intl }  = this.props;

    return intl.formatNumber(currency, {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: maxDigits
    });
  }

  private getNameColumn = (token: IToken) => {
    const { tokenListStore }  = this.props;

    return (
      <div className={cn(styles.tokenName)}>
        <div className={styles.tokenName_left}>
          {token.assetName}
        </div>

        {token.top && tokenListStore!.query.filter !== 'top' && (
          <div className={styles.tokenName_right}>
            <TopBadge/>
          </div>
        )}
      </div>
    );
  }

  private getTotalTokens = (token: IToken) => {
    const { intl }  = this.props;

    const amount = this.kFormatter(token!.scoreBoard!.sumTokens);

    const text = intl.formatMessage({ id: Message.mainpage_table_total_tokens_mobile });

    return (
      <>
        <span>{text}:</span>
        <div>{amount}</div>
      </>
    );
  }

  private getTotalVotes = (token: IToken) => {
    const { intl }  = this.props;

    const amount = this.formatNumber(token!.scoreBoard!.votesCount, 0);
    const text = intl.formatMessage({ id: Message.mainpage_table_total_votes_mobile });

    return (
      <>
        <span>{text}:</span>
        <div>{amount}</div>
      </>
    );
  }

  private getRatingColumn = (token: IToken) => {
    const { intl }  = this.props;

    if (token.voted && token.scoreBoard) {
      return (
        <div className={cn(styles.tokenRating)}>
          <div className={styles.tokenRating_left}>
            <div className={styles.tokenRating_averageScore}>
              <span>{token.scoreBoard.averageScore.toFixed(1)}</span>
              <div>
                {intl.formatMessage({ id: Message.mainpage_table_averageScore_text })}
              </div>
            </div>

            <div className={styles.tokenRating_stars}>
              <StarRating value={Math.round(token.scoreBoard.averageScore)}/>
            </div>
          </div>

          <div className={styles.tokenRating_right}>
            <div className={styles.tokenRating_totalTokens}>
              {token.scoreBoard
                ? this.getTotalTokens(token)
                : ''
              }
            </div>

            <div className={styles.tokenRating_totalVotes}>
              {token.scoreBoard
                ? this.getTotalVotes(token)
                : ''
              }
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={cn(styles.tokenRating)}>
          <div className={styles.tokenRating_left}>
            <div className={styles.tokenRating_status}>
              {intl.formatMessage({ id: Message.mainpage_table_rating_status })}
            </div>
          </div>
        </div>
      );
    }
  }

  private getTokensColumn = (token: IToken) => {
    const tokens = token.scoreBoard
      ? this.formatNumber(token.scoreBoard.sumTokens, 0)
      : '';

    return (
      <div className={cn(styles.tokenTokens)}>
        {tokens}
      </div>
    );
  }

  private getVotesColumn = (token: IToken) => {
    const votes = token.scoreBoard
      ? this.formatNumber(token.scoreBoard.votesCount, 0)
      : '';

    return (
      <div className={cn(styles.tokenVotes)}>
        {votes}
      </div>
    );
  }
  
  private getAmountColumn = (token: IToken) => {
    const { intl }  = this.props;

    return (
      <div className={cn(styles.tokenAmount)}>
        <div className={cn(styles.tokenAmount_title)}>
          {intl.formatMessage({ id: Message.mainpage_table_amount })}
        </div>

        <div className={cn(styles.tokenAmount_value)}>
          {token.details
            ? this.formatNumber(getTokenQuantityWithPrecision(token))
            : ''
          }
        </div>
      </div>
    );
  }

  private getPriceColumn = (token: IToken) => {   
    const { intl }  = this.props;

    return (
      <div className={cn(styles.tokenPrice)}>
        <div className={cn(styles.tokenPrice_title)}>
          {intl.formatMessage({ id: Message.mainpage_table_price })}
        </div>

        <div className={cn(styles.tokenPrice_value)}>
          {token.details && token.details.quote
            ? this.formatCurrency(token.details.quote, 6)
            : ''
          }
        </div>
      </div>
    );
  }
  
  private getColums = (): ColumnProps<any>[] => {
    const { intl }  = this.props;

    return [
      {
        title: intl.formatMessage({ id: Message.mainpage_table_token_name }),
        dataIndex: 'name',
        key: 'name',
        render: (token: IToken) => this.getNameColumn(token)
      },
      {
        title: intl.formatMessage({ id: Message.mainpage_table_rating }),
        dataIndex: 'rating',
        key: 'rating',
        render: (token: IToken) => this.getRatingColumn(token)
      },
      {
        title: intl.formatMessage({ id: Message.mainpage_table_total_tokens }),
        dataIndex: 'tokens',
        key: 'tokens',
        render: (token: IToken) => this.getTokensColumn(token)
      },
      {
        title: intl.formatMessage({ id: Message.mainpage_table_total_votes }),
        dataIndex: 'votes',
        key: 'votes',
        render: (token: IToken) => this.getVotesColumn(token)
      },
      {
        title: intl.formatMessage({ id: Message.mainpage_table_amount }),
        dataIndex: 'amount',
        key: 'amount',
        render: (token: IToken) => this.getAmountColumn(token)
      },
      {
        title: intl.formatMessage({ id: Message.mainpage_table_price }),
        dataIndex: 'price',
        key: 'price',
        render: (token: IToken) => this.getPriceColumn(token)
      },
    ];
  }

  getRows = (): any[] => {
    const { tokenListStore } = this.props;

    return  tokenListStore!.tokens.map(token => ({
      key: token.assetId,
      name: token,
      rating: token,
      votes: token,
      tokens: token,
      amount: token,
      price: token,
      token: token
    }));
  }

  handlePaginationChange = (pagination: IAntPaginationConfig) => {
    const { tokenListStore } = this.props;

    const { current } = pagination;

    tokenListStore!.updateList({
      page: current
    });
  }

  handleFilterChange = (filter: string) => {
    const { tokenListStore } = this.props;

    tokenListStore!.updateList({
      filter: filter
    });
  }

  // async componentDidMount() {
  //   const { tokenListStore }  = this.props;
  
  //   tokenListStore!.loadTokens(tokenListStore!.query);
  // }

  render() {
    const {
      intl,
      tokenListStore
    }  = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.fitler}>
          <div
            onClick={this.handleFilterChange.bind(this, 'top')}
            className={cn(
              styles.filter_item,
              { [styles.filter_item__active]: tokenListStore!.query.filter === 'top'}
            )}
          >
            {intl.formatMessage(
              { id: Message.filter_top}
            )}
          </div>
          <div
            onClick={this.handleFilterChange.bind(this, 'all')}
            className={cn(
              styles.filter_item,
              { [styles.filter_item__active]: tokenListStore!.query.filter === 'all'}
            )}
          >
            {intl.formatMessage(
              { id: Message.filter_default}
            )}
          </div>
        </div>

        <Table
          className={styles.tableWrapper}
          columns={this.getColums()}
          dataSource={this.getRows()}
          pagination={tokenListStore!.isPaginationShown
            ? tokenListStore!.antPaginationConfig
            : false
          }
          loading={tokenListStore!.isLoading}
          onChange={this.handlePaginationChange}
          locale={{
            emptyText: intl.formatMessage({ id: Message.mainpage_empty_text})
          }}
          onRow={(rowItem) => ({
            onClick: this.handleRowClick.bind(this, rowItem.token)
          })}
        />
      </div>
    );
  }
}

export default injectIntl(TokenList);
