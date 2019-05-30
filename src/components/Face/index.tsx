import React from 'react';
import styles from './styles.scss';
import Form from '@src/components/Form';

export default class Face extends React.Component {

    render(): React.ReactNode {
        return <>
            <div className={styles.root}>
                <div className={styles.body}>
                    <div className={styles.info}>
                        <div className={styles.headerFont}>Instantly Borrow BTC for WAVES</div>
                        <div className={styles.captionFont}>The first project on instant cryptocurrency loans from Wavees.
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
        </>;
    }
}

const ListItem = ({text}) =>
    <div className={styles.itemFont}>
        <div className={styles.handIcon}/>
        {text}
    </div>;

