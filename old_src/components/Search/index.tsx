import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { injectIntl, InjectedIntl } from 'react-intl';
import axios from 'axios';

import { Select, Spin } from 'antd';

import { RouterStore } from '@stores';

import { IToken } from '@stores/TokenListStore';

import { Message } from '@src/locales/messages';

import styles from './styles.scss';

interface IInjectedProps {
  intl: InjectedIntl
  routerStore?: RouterStore
}

interface IProps extends IInjectedProps {}

interface IState {
  isLoading: boolean
  suggestTokens: IToken[]
}

@inject('routerStore')
@observer
class Search extends Component<IProps, IState> {
  state: IState = {
    isLoading: false,
    suggestTokens: []
  };

  handleFocus = () => {    
    this.setState({
      suggestTokens: []
    });
  }

  handleSearch = async (value) => {    
    this.setState({
      isLoading: true
    });

    if (value.trim() !== '') {
      try {
        let res = await axios.get('/api/v1/token', {
          params: {
            search: value
          }
        });

        this.setState({
          isLoading: false,
          suggestTokens: res.data.tokens
        });
      } catch (error) {
        this.setState({
          isLoading: false
        });
      }
    } else {
      this.setState({
        suggestTokens: []
      });
    }
  }

  handleChange = (tokenAssetId: string) => {
    const { routerStore } = this.props;

    routerStore!.push({
      pathname: `/tokens/${tokenAssetId}`,
      state: { isModalRouteOpened: true }
    });
  };

  private getClearIconReactNode = () => {
    return (
      <div className={styles.clearIcon}/>
    );
  };

  render() {
    const { intl }  = this.props;

    const {
      isLoading,
      suggestTokens
    } = this.state;

    return (
      <div id={'searchComponent'} className={styles.root}>
        <Select
          showSearch
          autoClearSearchValue={false}
          value={undefined}
          allowClear={true}
          notFoundContent={null}
          clearIcon={this.getClearIconReactNode()}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onFocus={this.handleFocus}
          onSearch={this.handleSearch}
          onChange={this.handleChange}
          dropdownClassName={styles.dropdown}
          getPopupContainer={() => document.getElementById('searchComponent')!}
          placeholder={intl.formatMessage({ id: Message.search_input_placeholder})}
        >
          {suggestTokens.map((token, i) => (
            <Select.Option key={i} value={token.assetId}>
              <div className={styles.suggestItem}>
                <div className={styles.suggestItem_left}>
                  <div className={styles.suggestItem_title}>
                      <div className={styles.suggestItem_name}>{token.assetName}</div>
                      {token.voted && token.details.ticker && (
                        <>
                          <span>|</span>
                          <div className={styles.suggestItem_ticker}>{token.details.ticker}</div>
                        </>
                      )}
                  </div>
                  <div className={styles.suggestItem_id}>{token.assetId}</div>
                </div>
                <div className={styles.suggestItem_right}>
                  {token.voted && token.scoreBoard
                    ? (
                      <div className={styles.suggestItem_rating}>
                        <div className={styles.suggestItem_star}/>
                        <div className={styles.suggestItem_score}>
                          {token.scoreBoard.averageScore.toFixed(1)}
                        </div>
                      </div>
                    )
                    : (
                      <div className={styles.suggestItem_rating}>
                        {intl.formatMessage({ id: Message.search_unvoted_token })}
                      </div>
                    )
                  }
                </div>
              </div>
            </Select.Option>
          ))}
        </Select>          
      </div>
    );
  }
}

export default injectIntl(Search);
