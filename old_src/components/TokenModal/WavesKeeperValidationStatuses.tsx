import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl';

import Status from './Status';

import {
  RouterStore,
  AccountStore,
  TokenListStore
} from '@stores';

import { IToken } from '@stores/TokenListStore';

import { Message } from '@src/locales/messages';

const WCT_WAVES_PAIR_DEX_LINK = 'https://client.wavesplatform.com/dex?assetId2=DHgwrRvVyqJsepd32YbBqUeDH4GJ1N984X8QoekjgH8J&assetId1=WAVES';

interface IInjectedProps {
  intl: InjectedIntl
  routerStore?: RouterStore
  accountStore?: AccountStore
  tokenListStore?: TokenListStore
}

interface IProps extends IInjectedProps {
  token: IToken
}

interface IStatus {
  type?: string
  condition: boolean
  title?: string | Element
  description?: string | JSX.Element
}

@inject('routerStore', 'accountStore', 'tokenListStore')
@observer
class BrowserValidationStatuses extends Component<IProps> {
  private getAccountLastTokenVote() { //ref this
    const {
      accountStore,
      token
    } = this.props;

    if (token) {
      return accountStore!.applicationAccount.votes.find((vote) => vote.assetId === token.assetId);
    }
  }

  private isTokenVotedByAccount() { //ref this
    const vote = this.getAccountLastTokenVote();

    return vote ? true : false;
  }

  private getCurrentStatus = (): IStatus | undefined => {
    const { intl, accountStore } = this.props;

    const {
      isBrowserSupportsWavesKeeper,
      isWavesKeeperInstalled,
      isApplicationAuthorizedInWavesKeeper,
      isWavesKeeperLocked,
      isWavesKeeperEmpty,
      isSupportedAccountNetwork,
      hasEnoughBalance
    } = accountStore!;

    const statuses: IStatus[] = [
      {
        type: 'warning',
        condition: (
          isBrowserSupportsWavesKeeper &&
          isWavesKeeperInstalled &&
          !isApplicationAuthorizedInWavesKeeper
        ),
        title: intl.formatMessage({
          id: Message.validation_error_application_is_not_authorized_in_waves_keeper_title
        }),
        description: intl.formatMessage({
          id: Message.validation_error_application_is_not_authorized_in_waves_keeper_description
        }),
      },
      {
        type: 'warning',
        condition: (
          isBrowserSupportsWavesKeeper &&
          isWavesKeeperInstalled &&
          isApplicationAuthorizedInWavesKeeper &&
          isWavesKeeperLocked
        ),
        title: intl.formatMessage({
          id: Message.validation_error_waves_keeper_is_locked_title
        }),
        description: intl.formatMessage({
          id: Message.validation_error_waves_keeper_is_locked_description
        })
      },
      {
        type: 'warning',
        condition: (
          isBrowserSupportsWavesKeeper &&
          isWavesKeeperInstalled &&
          isApplicationAuthorizedInWavesKeeper &&
          !isWavesKeeperLocked &&
          isWavesKeeperEmpty
        ),
        title: intl.formatMessage({
          id: Message.validation_error_waves_keeper_is_empty_title
        }),
        description: intl.formatMessage({
          id: Message.validation_error_waves_keeper_is_empty_description
        }),
      },
      {
        type: 'warning',
        condition: (
          isBrowserSupportsWavesKeeper &&
          isWavesKeeperInstalled &&
          isApplicationAuthorizedInWavesKeeper &&
          !isWavesKeeperLocked &&
          !isSupportedAccountNetwork
        ),
        title: intl.formatMessage({
          id: Message.validation_error_waves_keeper_wrong_network_title
        }),
        description: intl.formatMessage({
          id: Message.validation_error_waves_keeper_wrong_network_description
        })
      },
      {
        type: 'error',
        condition: (
          isBrowserSupportsWavesKeeper &&
          isWavesKeeperInstalled &&
          !isWavesKeeperLocked &&
          isSupportedAccountNetwork &&
          !hasEnoughBalance &&
          this.isTokenVotedByAccount()
        ),
        title: intl.formatMessage({
          id: Message.validation_error_waves_keeper_not_enough_balance_title
        }),
        description: intl.formatMessage({
          id: Message.validation_error_waves_keeper_not_enough_balance_description
        })
      },
      {
        type: 'error',
        condition: (
          isBrowserSupportsWavesKeeper &&
          isWavesKeeperInstalled &&
          !isWavesKeeperLocked &&
          isSupportedAccountNetwork &&
          !hasEnoughBalance &&
          !this.isTokenVotedByAccount()
        ),
        title: intl.formatMessage({
          id: Message.validation_error_waves_keeper_not_enough_balance_user_not_voted_title
        }),
        description: (
          <FormattedMessage
            id={Message.validation_error_waves_keeper_not_enough_balance_user_not_voted_description}
            values={{ 
              link: (
                <a href={WCT_WAVES_PAIR_DEX_LINK} target="_blank">
                  {intl.formatMessage({ id: Message.WCT_WAVES_pair_DEX_link_text })}
                </a>
              )
            }}
          />
        )
      }
    ];

    const currentStatus = statuses.find(status => status.condition);

    return currentStatus;
  }

  render() {
    const currentStatus = this.getCurrentStatus();

    if (!currentStatus) {
      return null;
    }

    return (
      <Status
        type={currentStatus.type}
        title={currentStatus.title}
        description={currentStatus.description}
      />
    );
  }
}

export default injectIntl(BrowserValidationStatuses);
