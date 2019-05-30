import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import cn from 'classnames';

import { Menu, Dropdown } from 'antd';

import { LocaleStore } from '@stores';

import { ILanguage } from '@stores/LocaleStore';

import styles from './styles.scss';

interface IProps {
  localeStore?: LocaleStore
  className?: string
}

@inject('localeStore')
@observer
class LanguageSelector extends Component<IProps> {
  private handleSelectLanguage = (languageIndex: number, event: React.MouseEvent<HTMLDivElement>) => {
    const { localeStore }  = this.props;

    localeStore!.setActiveLanguageIndex(languageIndex);
  };

  private getLanguageClassName = (language: ILanguage, index: number) => {
    const { localeStore } = this.props;

    const activeLanguageIndex = localeStore!.activeLanguageIndex;

    return cn(
        styles.language,
        styles[`language__abbr_${language.abbr}`],
        { [styles.language__active]: index === activeLanguageIndex }
      );
  };

  private getOverlayReactNode = () => {
    const { localeStore } = this.props;

    const languages = localeStore!.languages;

    return (
      <Menu>
        {languages.map((language, index) => (
          <Menu.Item key={index}>
            <div
              className={this.getLanguageClassName(language, index)}
              onClick={this.handleSelectLanguage.bind(this, index)}
            >
              <div className={styles.language_left}>
                <div className={styles.language_flag}/>
                  <div className={styles.language_title}>{language.title}</div>
                </div>
              <div className={styles.language_right}>
                <div className={styles.language_check}/>
              </div>
            </div>
          </Menu.Item>
        ))}
      </Menu>
    );
  }

  render() {
    const { localeStore, className }  = this.props;

    return (
      <Dropdown
        trigger={['click']}
        overlayClassName={styles.languages}
        overlay={this.getOverlayReactNode()}
      >
        <div className={cn(styles.dropdown, className)}>
          <span className={cn(styles.dropdown_icon, styles[`dropdown_icon__${localeStore!.activeLanguage.abbr}`])}/>

          <div className={styles.dropdown_title}>
            {localeStore!.activeLanguage.title}
          </div>
        </div>
      </Dropdown>
    );
  }
}

export default LanguageSelector;
