import React from 'react';
import styles from './styles.scss';
import Form from '@src/components/Form';
import SignBtn from '@components/SignBtn';
import AccountStore from '@stores/AccountStore';
import { inject, observer } from 'mobx-react';
import Avatar from '@components/Avatar';


interface IProps {
    accountStore?: AccountStore
}

@inject('accountStore')
@observer
export default class Head extends React.Component<IProps> {

    render(): React.ReactNode {
        const {wavesKeeperAccount} = this.props.accountStore!;
        return <div className={styles.bg}>
            <div className={styles.h}>
                <div className={styles.header}>
                    <div className={styles.header_logo}/>
                    {
                        wavesKeeperAccount
                            ? <div className={styles.header_sign}>
                                <Avatar className={styles.header_avatar} address={wavesKeeperAccount.address}/>
                                {wavesKeeperAccount.address}
                            </div>
                            : <SignBtn className={styles.header_sign}>
                                <div className={styles.header_signIcon}/>
                                Sign in with Keeper
                            </SignBtn>
                    }
                </div>
                <div className={styles.body}>
                    <div className={styles.info}>
                        <div className={styles.headerFont}>Instantly Borrow WBTC for WAVES</div>
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
                        <Form/>
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

