import React, { Component } from 'react';
import Media from 'react-media';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import Search from '@components/Search';
import LanguageSelector from '@components/LanguageSelector';

import { RouterStore } from '@stores';

import { breakpoints } from '@src/constants';

import styles from './styles.scss';

interface IProps {
  routerStore?: RouterStore
}

@inject('routerStore')
@observer
class Header extends Component<IProps> {
  private handleOpenFAQModal = () => {
    const { routerStore } = this.props;

    routerStore!.push({
      pathname: '/faq',
      state: { isModalRouteOpened: true }
    });
  };

  render() {
    return (
      <Media query={{ maxWidth: breakpoints.sm}}>
        {matches => matches
          ? (
              <>
                <div className={styles.root}>
                  <Link to="/" className={styles.projectLogo}/>

                  <div className={styles.actions}>
                    <LanguageSelector className={styles.actions_languageSelector}/>

                    <div
                      className={styles.actions_faq}
                      onClick={this.handleOpenFAQModal}
                    >
                      F.A.Q.
                    </div>
                  </div>
                </div>

                <Search/>
              </>
            )
          : (
            <div className={styles.root}>
              <Link to="/" className={styles.projectLogo}/>

              <div className={styles.search}>
                <Search/>
              </div>

              <div className={styles.actions}>
                <LanguageSelector className={styles.actions_languageSelector}/>

                <div
                  className={styles.actions_faq}
                  onClick={this.handleOpenFAQModal}
                >
                  F.A.Q.
                </div>
              </div>
            </div>
          )
        }
      </Media>
    );
  }
}

export default Header;
