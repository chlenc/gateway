import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router'; 
import { inject, observer } from 'mobx-react';
import { injectIntl, InjectedIntl } from 'react-intl';
import qs from 'query-string';

import { Modal, Collapse } from 'antd';

import {
  RouterStore,
  LocaleStore,
  TokenListStore
} from '@stores';

import { Message } from '@src/locales/messages';

import styles from './styles.scss';

const FAQItems = [
  'faq_token_rating_description',
  'faq_token_is_not_listed',
  'faq_token_voting_process',
  'faq_token_rating_calculation_time',
  'faq_token_rating_calculation',
  'faq_token_revoting',
];

interface IInjectedProps {
  intl: InjectedIntl
  routerStore?: RouterStore,
  localeStore?: LocaleStore,
  tokenListStore?: TokenListStore
}

interface IParams {
  assetId: string
}

interface IProps extends
  RouteComponentProps<IParams>,
  IInjectedProps {}

interface IState {
}

@inject('routerStore', 'accountStore', 'localeStore', 'tokenListStore')
@observer
class FAQModal extends Component<IProps, IState> {
  state: IState = {};

  private handleCloseModal = () => {
    const { routerStore, tokenListStore } = this.props;

    const query = tokenListStore!.query;

    const search = qs.stringify(query as  {[key: string]: unknown});

    routerStore!.push({
      pathname: '/',
      search: search,
      state: { isModalRouteOpened: false }
    });
  }

  private getDocumentationLink = () => {
    const { localeStore }  = this.props;

    const activeLanguageAbbr = localeStore!.activeLanguage.abbr;

    return `https://docs.wavesplatform.com/${activeLanguageAbbr}/waves-token-rating/about-waves-token-rating.html`;
  }

  render() {
    const { intl } = this.props;

    return (
      <Modal
        className={styles.modal}
        wrapClassName={styles.modalWrap}
        title={'F.A.Q.'}
        destroyOnClose={true}
        closable={false}
        visible={true}
        footer={null}
        onCancel={this.handleCloseModal}
      >
        <div className={styles.root}>
          <div
            onClick={this.handleCloseModal}
            className={styles.closeBtn}
          />

          <Collapse defaultActiveKey={['0']} accordion={true}>
            {FAQItems.map((FAQItem: string) => (
              <Collapse.Panel
                key={FAQItem}
                header={intl.formatMessage({ id: Message[`${FAQItem}_question`] })}
              >
                {intl.formatMessage({ id: Message[`${FAQItem}_answer`] })}
              </Collapse.Panel>
            ))}
          </Collapse>

          <div className={styles.help}>
            <div className={styles.help_icon}/>

            <a
              className={styles.help_link}
              href={this.getDocumentationLink()}
              target="_blank"
            >
              {intl.formatMessage({ id: Message.faq_documentation_link })}
            </a>
          </div>
        </div>
      </Modal>
    );
  }
}

export default injectIntl(FAQModal);
