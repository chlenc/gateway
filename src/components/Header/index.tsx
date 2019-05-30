import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { RouterStore } from '@stores';

import styles from './styles.scss';

interface IProps {
    routerStore?: RouterStore
}

@inject('routerStore')
@observer
class Header extends Component<IProps> {

    render() {
        return <div className={styles.root}>
            <div className={styles.logo}/>
            <div className={styles.sign}>
                <div className={styles.sign_icon}/>
                Sign in with Keeper
            </div>

        </div>;
    }
}

export default Header;
