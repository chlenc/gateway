import React, { Component } from 'react';
import { injectIntl, InjectedIntl } from 'react-intl';
import cn from 'classnames';

import { Message } from '@src/locales/messages';

import styles from './styles.scss';

interface IInjectedProps {
  intl: InjectedIntl
}

interface IProps {
  size?: 's' | 'm'
}

class TopBadge extends Component<IProps & IInjectedProps> {
  static defaultProps: IProps = {
    size: 's'
  };
  
  render() {
    const { intl, size } = this.props;

    return (
      <div className={cn(styles.root, styles[`root__size_${size}`])}>
        {intl.formatMessage({
          id: Message.top_badge
        })}
      </div>
    );
  }
}

export default injectIntl(TopBadge);
