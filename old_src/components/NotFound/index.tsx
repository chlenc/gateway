import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { injectIntl, InjectedIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import wavesLogo from '@src/assets/icons/waves-logo.svg';
import page404Illustration from '@src/assets/icons/page-404.svg';

import {
  RouterStore,
  LocaleStore,
} from '@stores';

import { Message } from '@src/locales/messages';

import styles from './styles.scss';

interface IInjectedProps {
  intl: InjectedIntl
  routerStore?: RouterStore,
  localeStore?: LocaleStore,
}

interface IProps extends IInjectedProps {}

@inject('routerStore', 'localeStore')
@observer
class NotFound extends Component<IProps> {
  render() {
    const { intl } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.logo}>
          <img src={wavesLogo}/>
        </div>

        <img
          src={page404Illustration}
          className={styles.illustration}
        />
        
        <div className={styles.text}>
          <div className={styles.text_title}>
            {intl.formatMessage({
              id: Message.page_404_text_title
            })}
          </div>

          <div className={styles.text_description}>
            {intl.formatMessage({
              id: Message.page_404_text_description
            })}
          </div>
        </div>

        <Link to="/" className={styles.btn}>
          {intl.formatMessage({
            id: Message.page_404_main_page_button
          })}
        </Link>
      </div>
    );
  }
}

export default injectIntl(NotFound);
