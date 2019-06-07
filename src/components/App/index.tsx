import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';


import styles from './styles.scss';
import Face from '@components/Head';
import HowItWorks from '@src/components/HowItWorks';
import Advantages from '@src/components/Advantages';
import Footer from '@src/components/Footer';
import AccountStore from '@stores/AccountStore';
import DappStore from '@stores/DappStore';

interface IProps {
    accountStore?: AccountStore
    dappStore?: DappStore
}

@inject('accountStore', 'dappStore')
@observer
class App extends Component<IProps> {

    componentDidMount(): void {
        console.log('this app worked in https://devnet-aws-ir-2.wavesnodes.com D node');
        this.props.accountStore!.setupWavesKeeper();
        this.props.dappStore!.startHeightWatcher();
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
