import React from 'react';
import styles from './styles.scss';
import { animateScroll as scroll } from 'react-scroll';

export default class HowItWorks extends React.Component {

    scrollToTop = () => {
        scroll.scrollToTop();
    };

    render(): React.ReactNode {
        return <div className={styles.root}>
            <div className={styles.howItWorksBlock}>
                <div className={styles.header1Font}>How it works?</div>
                <div className={styles.header2Font}>The service is powered by the DApp on the decentralized
                    decentralized application.
                </div>
                {[
                    'An user signs in with Waves Keeper to borrow WBTC',
                    'Then he deposits his crypto assets as a security to request a loan',
                    'Each time the user will log in with Keeper, he will see details of the loan, including when it ' +
                    'should be repaid',
                    'In turn, the user instantly receives an agreed loan amount in WBTC tokens',
                    'After the repayment, the user receives back his security deposit, even if it has increased ' +
                    'in value'
                ].map((text, i) => <ListItem key={i} text={text}/>)}
                <div className={styles.caption1Font}>If the user will make the repayment in 7 days – the service will
                    take no fees.
                </div>
                <div className={styles.caption2Font}>Otherwise, the interest rate will be charged from his deposit each
                    day, until it will be taken completely.
                </div>
            </div>
            <div className={styles.takeLoanBlock}>
                <div className={styles.wbIcon}/>
                <div className={styles.caption3Font}>Sign in with Keeper and borrow some WBTC for WAVES with 7 days free of charge period
                </div>
                <div onClick={this.scrollToTop} className={styles.takeBtn}>Take a loan <div className={styles.arrow}/>
                </div>
            </div>
        </div>;
    }
}

const ListItem = ({text}) =>
    <div className={styles.itemFont}>
        <div className={styles.oval}/>
        {text}
    </div>;

