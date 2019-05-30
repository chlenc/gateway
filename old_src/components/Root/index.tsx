import React, { Component } from 'react';
import { Route, RouteComponentProps } from 'react-router';
import { inject, observer } from 'mobx-react';
import cn from 'classnames';

import Header from '@components/Header';
import TokenList from '@components/TokenList';
import TokenModal from '@components/TokenModal';
import FAQModal from '@components/FAQModal';

import styles from './styles.scss';

interface IProps extends
  RouteComponentProps {}

@inject('routerStore', 'tokenListStore', 'accountStore')
@observer
class Root extends Component<IProps> {
  render() {
    return (
      <div className={styles.root}>
        <div className={cn(styles.layout, 'container', 'container__fluid')}>
          <Header/> 

          {/*<div className={styles.layout_content}>*/}
            {/*<TokenList/>*/}
          {/*</div>*/}
        </div>
      </div>
    );
  }
}

export default Root;
