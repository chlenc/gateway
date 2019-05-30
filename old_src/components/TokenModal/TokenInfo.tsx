import React, { Component } from 'react';
import { injectIntl, InjectedIntl } from 'react-intl';
import cn from 'classnames';

import {
  getTokenQuantityWithPrecision
} from '@utils';

import { IToken } from '@stores/TokenListStore';

import { Message } from '@src/locales/messages';

import CopyToClipboardBtn from '@components/CopyToClipboardBtn';

import styles from './styles.scss';

interface IInjectedProps {
  intl: InjectedIntl
}

interface IProps extends IInjectedProps {
  token: IToken
}

class TokenInfo extends Component<IProps> {
  private formatDate = (date: Date) => {
    const { intl }  = this.props;

    return intl.formatDate(date, {
      day:   'numeric',
      month: 'numeric',
      year:  'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  }

  private formatCurrency = (currency: number, maxDigits?) => {
    const { intl }  = this.props;

    return intl.formatNumber(currency, {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: maxDigits
    });
  }

  private getTokenCapitalization = (token: IToken) => {
    const capitalization = getTokenQuantityWithPrecision(token) * token.details.quote;

    return this.formatCurrency(capitalization);
  }

  render() {
    const {
      intl,
      token
    } = this.props;

    const isMarketInfoVisible = !!token.details.quote && token.details.quote > 0;

    return (
      <>
        {token.details
          ? (
              <>
                {isMarketInfoVisible && (
                  <div className={styles.info}>
                    <div className={styles.info_title}>
                      {intl.formatMessage({ id: Message.voting_market_info_title })}
                    </div>
                    <div className={styles.info_items}>
                        <div className={styles.info_item}>
                          <div className={styles.info_left}>
                            {intl.formatMessage({ id: Message.voting_token_price })}
                          </div>
                          <div className={styles.info_right}>
                            {this.formatCurrency(token.details.quote, 6)}
                          </div>
                        </div>

                        <div className={styles.info_item}>
                          <div className={styles.info_left}>
                            {intl.formatMessage({ id: Message.voting_token_capitalization })}
                          </div>
                          <div className={styles.info_right}>
                            {this.getTokenCapitalization(token)}
                          </div>
                        </div>
                    </div>
                  </div>
                )}

                <div className={styles.info}>
                  <div className={styles.info_title}>
                    {intl.formatMessage({ id: Message.voting_general_info_title })}
                  </div>
                  <div className={styles.info_items}>
                    <div className={styles.info_item}>
                      <div className={styles.info_left}>
                      {intl.formatMessage({ id: Message.voting_token_id})}
                      </div>
                      <div className={styles.info_right}>
                        <a
                          href={`https://wavesexplorer.com/assets/${token.details.id}`}
                          target={'_blank'}
                          className={cn(styles.info_id, styles.info_link)}
                        >
                          {token.details.id}
                        </a>

                        <CopyToClipboardBtn data={token.details.id}/>
                      </div>
                    </div>

                    <div className={styles.info_item}>
                      <div className={styles.info_left}>
                        {intl.formatMessage({ id: Message.voting_token_name})}
                      </div>
                      <div className={styles.info_right}>
                        {token.details.name}
                      </div>
                    </div>

                    <div className={styles.info_item}>
                      <div className={styles.info_left}>
                        {intl.formatMessage({ id: Message.voting_token_amount })}
                      </div>
                      <div className={styles.info_right}>
                        {intl.formatNumber(getTokenQuantityWithPrecision(token))}
                      </div>
                    </div>

                    <div className={styles.info_item}>
                      <div className={styles.info_left}>
                        {intl.formatMessage({ id: Message.voting_token_precision})}
                      </div>
                      <div className={styles.info_right}>
                        {token.details.precision}
                      </div>
                    </div>

                    <div className={styles.info_item}>
                      <div className={styles.info_left}>
                        {intl.formatMessage({ id: Message.voting_token_type })}
                      </div>
                      <div className={styles.info_right}>
                        {token.details.reissuable
                          ? intl.formatMessage({ id: Message.voting_token_type_reissuable })
                          : intl.formatMessage({ id: Message.voting_token_type_not_reissuable })
                        }
                      </div>
                    </div>

                    {token.details.sender && (
                        <div className={styles.info_item}>
                          <div className={styles.info_left}>
                            {intl.formatMessage({ id: Message.voting_token_issuer })}
                          </div>
                          <div className={styles.info_right}>
                            <a
                              href={`https://wavesexplorer.com/address/${token.details.sender}`}
                              target={'_blank'}
                              className={cn(styles.info_id, styles.info_link)}
                            >
                              {token.details.sender}
                            </a>

                            <CopyToClipboardBtn data={token.details.sender}/>
                          </div>
                        

                        </div>
                      )
                    }

                    <div className={styles.info_item}>
                      <div className={styles.info_left}>
                        {intl.formatMessage({ id: Message.voting_token_block})}
                      </div>
                      <div className={styles.info_right}>
                        {intl.formatNumber(token.details.height)}
                      </div>
                    </div>

                    <div className={styles.info_item}>
                      <div className={styles.info_left}>
                        {intl.formatMessage({ id: Message.voting_token_issue_date })}
                      </div>
                      <div className={styles.info_right}>
                        {this.formatDate(new Date(token.details.timestamp))}
                      </div>
                    </div>
                  </div>
                </div>

                {token.details.description && (
                  <div className={styles.description}>
                    <div className={styles.description_title}>
                      {intl.formatMessage({ id: Message.voting_token_description })}
                    </div>

                    <div className={styles.description_text}>
                      {token.details.description}
                    </div>
                  </div>
                )}
              </>
            )
          : (
            <div className={styles.info}>
              <div className={styles.info_title}>
                {intl.formatMessage({ id: Message.voting_general_info_title })}
              </div>
              <div className={styles.info_items}>
                <div className={styles.info_item}>
                  <div className={styles.info_left}>
                    {intl.formatMessage({ id: Message.voting_token_id })}
                  </div>
                  <div className={styles.info_right}>
                    {token.assetId}
                  </div>
                </div>

                <div className={styles.info_item}>
                  <div className={styles.info_left}>
                    {intl.formatMessage({ id: Message.voting_token_name })}
                  </div>
                  <div className={styles.info_right}>
                    {token.assetName}
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </>
    );
  }
}

export default injectIntl(TokenInfo);
