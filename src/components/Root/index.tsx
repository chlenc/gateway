import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Header from '@components/Header';

import styles from './styles.scss';
import Face from '@components/Face';
import HowItWorks from '@src/components/HowItWorks';
import Advantages from '@src/components/Advantages';
import Footer from '@src/components/Footer';

@inject('routerStore', 'tokenListStore', 'accountStore')
@observer
class Root extends Component {
    render() {
        return (
            <div className={styles.root}>
                <div className={styles.face}>
                    <Header/>
                    <Face/>
                </div>
                <div className={styles.how_it_works}>
                    <HowItWorks/>
                </div>
                <div className={styles.advantages}>
                    <Advantages/>
                </div>
                <div className={styles.footer}>
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default Root;
