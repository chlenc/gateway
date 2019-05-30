import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { IntlProvider, addLocaleData } from 'react-intl';
import enLocale from 'react-intl/locale-data/en';
import ruLocale from 'react-intl/locale-data/ru';
import { LocaleStore } from '@stores/LocaleStore';

addLocaleData([
  ...enLocale,
  ...ruLocale,
]);

interface IProps {
  localeStore?: LocaleStore
  children: any
}

@inject('localeStore')
@observer
class MobxIntlProvider extends Component<IProps> {
  render() {
    const {
      localeStore,
      children
    } = this.props;

    const locale = localeStore!.activeLanguage.abbr;
    const messages = localeStore!.messages;

    return (
      <IntlProvider
        key={locale}
        locale={locale}
        messages={messages}
      >
        {children}
      </IntlProvider>
    );
  }
}

export default MobxIntlProvider;
