import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';


import styles from './styles.scss';
import Face from '@components/Head';
import HowItWorks from '@src/components/HowItWorks';
import Advantages from '@src/components/Advantages';
import Footer from '@src/components/Footer';
import AccountStore from '@stores/AccountStore';

interface IProps {
    accountStore?: AccountStore
}

@inject('accountStore')
@observer
class App extends Component<IProps> {

    componentDidMount(): void {
    this.props.accountStore!.setupWavesKeeper();
    }

    render() {
        return (
            <div className={styles.root}>
                <Face/>
                <HowItWorks/>
                <Advantages/>
                <Footer/>
            </div>
        );
    }
}

export default App;
