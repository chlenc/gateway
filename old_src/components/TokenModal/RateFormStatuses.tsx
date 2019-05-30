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

import {
  getWavesExplorerLinkToTx
} from '@utils';

interface IInjectedProps {
  intl: InjectedIntl
  routerStore?: RouterStore
  accountStore?: AccountStore
  tokenListStore?: TokenListStore
}

interface IProps extends IInjectedProps {
  submittingStatus: 'default' | 'processing' | 'success' | 'error',
  submittingStatusTxId?: string
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
  private getCurrentStatus = (): IStatus | undefined => {
    const {
      intl,
      submittingStatus,
      submittingStatusTxId
    } = this.props;

    const statuses = [
      {
        type: 'processing',
        condition: submittingStatus === 'processing',
        title: intl.formatMessage({ id: Message.voting_processing_title }),
        description: intl.formatMessage({ id: Message.voting_processing_description })
      },
      {
        type: 'success',
        condition: submittingStatus === 'success',
        title: intl.formatMessage({ id: Message.voting_success_title }),
        description: (
          <FormattedMessage
            id={Message.voting_success_description}
            values={{ 
              link: (
                <a href={getWavesExplorerLinkToTx(submittingStatusTxId)} target="_blank">
                  {intl.formatMessage({ id: Message.show_in_explorer_link_text })}
                </a>
              )
            }}
          />
        )
      },
      {
        type: 'error',
        condition: submittingStatus === 'error',
        title: intl.formatMessage({ id: Message.voting_error_title }),
        description: intl.formatMessage({ id: Message.voting_error_description })
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
