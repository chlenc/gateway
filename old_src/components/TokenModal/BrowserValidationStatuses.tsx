import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl';

import Status from './Status';

import {
  RouterStore,
  AccountStore,
  TokenListStore
} from '@stores';

import { Message } from '@src/locales/messages';

import { getKeeperLinkToInstall } from '@utils';

interface IInjectedProps {
  intl: InjectedIntl
  routerStore?: RouterStore
  accountStore?: AccountStore
  tokenListStore?: TokenListStore
}

interface IProps extends IInjectedProps {}

interface IStatus {
  type?: string
  condition: boolean
  title?: string | Element
  description?: string | JSX.Element
}

@inject('routerStore', 'accountStore', 'tokenListStore')
@observer
class BrowserValidationStatuses extends Component<IProps> {  
  private refreshApp = () => {
    window.location.reload();
  };

  private getCurrentStatus = (): IStatus | undefined => {
    const { intl, accountStore } = this.props;

    const {
      isBrowserSupportsWavesKeeper,
      isWavesKeeperInstalled,
      isWavesKeeperSetupPending
    } = accountStore!;

    const statuses: IStatus[] = [
      {
        type: 'warning',
        condition: !isBrowserSupportsWavesKeeper,
        title: intl.formatMessage({
          id: Message.validation_error_waves_keeper_is_not_supported_by_browser_title
        }),
        description: intl.formatMessage({
          id: Message.validation_error_waves_keeper_is_not_supported_by_browser_description
        }),
      },
      {
        type: 'warning',
        condition: (
          isBrowserSupportsWavesKeeper &&
          !isWavesKeeperSetupPending &&
          !isWavesKeeperInstalled
        ), 
        title: intl.formatMessage({
          id: Message.validation_error_waves_keeper_is_not_installed_title
        }),
        description: (
          <FormattedMessage
            id={Message.validation_error_waves_keeper_is_not_installed_description}
            values={{ 
              installationLink: (
                <a href={getKeeperLinkToInstall()} target="_blank">
                  {intl.formatMessage({ id: Message.waves_keeper_installation_link_text })}
                </a>
              ),
              refreshLink: (
                <a onClick={this.refreshApp}>
                  {intl.formatMessage({ id: Message.waves_keeper_refresh_link_text })}
                </a>
              ),
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
