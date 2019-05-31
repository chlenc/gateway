import React from 'react';
import styles from './styles.scss';
import Form from '@src/components/Form';
import { inject, observer } from 'mobx-react';
import AccountStore from '@stores/AccountStore';

interface IProps {
    accountStore?: AccountStore
}

@inject('accountStore')
@observer
export default class Head extends React.Component <IProps> {

    handleSign = () => {
        const accountStore = this.props.accountStore!;
        if (accountStore!.isWavesKeeperInstalled && !accountStore!.isWavesKeeperInitialized) {
            accountStore!.setupSynchronizationWithWavesKeeper();
        }
        accountStore.login().catch(e => alert(`❌  ${e.message}`));
    };

    render(): React.ReactNode {
        const accountStore = this.props.accountStore!;
        console.log(` isWavesKeeperLocked: ${accountStore.isWavesKeeperLocked}\n isWavesKeeperInitialized: ${accountStore.isWavesKeeperInitialized}\n isWavesKeeperInstalled: ${accountStore.isWavesKeeperInstalled}\n isApplicationAuthorizedInWavesKeeper: ${accountStore.isApplicationAuthorizedInWavesKeeper}\n`);
        return <div className={styles.bg}>
            <div className={styles.h}>
                <div className={styles.header}>
                    <div className={styles.header_logo}/>
                    <div className={styles.header_sign} onClick={this.handleSign}>
                        <div className={styles.header_signIcon}/>
                        Sign in with Keeper
                    </div>
                </div>
                <div className={styles.body}>
                    <div className={styles.info}>
                        <div className={styles.headerFont}>Instantly Borrow BTC for WAVES</div>
                        <div className={styles.captionFont}>The first project on instant cryptocurrency loans from
                            Wavees.
                            You can easily and quickly borrow Bitcoin for Wavees without selling your currency.
                        </div>
                        {[
                            'Affordable interest rates',
                            'Reliable and safe',
                            'Simple process of borrowing and repayment',
                        ].map((item, i) => <ListItem key={i} text={item}/>)}
                    </div>
                    <div className={styles.form}>
                        <Form onSign={this.handleSign}/>
                    </div>
                </div>
            </div>
            <div className={styles.footer}/>
        </div>;
    }
}

const ListItem = ({text}) =>
    <div className={styles.itemFont}>
        <div className={styles.handIcon}/>
        {text}
    </div>;

