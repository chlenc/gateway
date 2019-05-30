import React, { Component } from 'react';
import { injectIntl, InjectedIntl } from 'react-intl';

import {
  copyToClipboard
} from '@utils';

import { Message } from '@src/locales/messages';

import { notification } from 'antd';

import styles from './styles.scss';

interface IInjectedProps {
  intl: InjectedIntl
}

interface IProps extends IInjectedProps {
  data: String | Number
}

class TokenInfo extends Component<IProps> {
  constructor(props: IProps) {
    super(props);

    notification.config({
      placement: 'bottomRight'
    });
  }

  private handleCopy = (data: string) => {
    const { intl } = this.props;

    if (copyToClipboard(data)) {    
      notification.open({
        message: intl.formatMessage({ id: Message.copy_notification_message })
      });
    }
  };

  render() {
    const {
      data
    } = this.props;

    return (
      <div
        className={styles.root}
        onClick={this.handleCopy.bind(this, data)}
      />
    );
  }
}

export default injectIntl(TokenInfo);

