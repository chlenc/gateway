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
                <div className={styles.header1Font}>How does it work?</div>
                <div className={styles.header2Font}>Description: The service is powered by a dApp on the Waves
                    blockchain.
                </div>
                {[
                    'The user signs in with Waves Keeper.',
                    'He deposits his crypto assets as collateral to request a loan.',
                    'In return, the user instantly receives the agreed loan in WBTC.',
                    'Each time the user logs in using Waves Keeper, he will see the details of the loan, including ' +
                    'when it should be repaid.',
                    'After loan repayment, the user receives back his security deposit, even if its value has ' +
                    'increased.'
                ].map((text, i) => <ListItem key={i} text={text}/>)}
                <div className={styles.caption1Font}>If the user makes full repayment in 7 days then the service will
                    charge no fees.
                </div>
                <div className={styles.caption2Font}>Otherwise, the interest rate will be charged from his deposit on a
                    daily basis, until it is reduced to zero.
                </div>
            </div>
            <div className={styles.takeLoanBlock}>
                <div className={styles.wbIcon}/>
                <div className={styles.caption3Font}>Sign in using Waves Keeper and borrow WBTC for WAVES, with a 7-day
                    interest-free period.
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

