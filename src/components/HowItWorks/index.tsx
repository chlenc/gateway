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
                <div className={styles.header2Font}>The Waves Loan service allows you to instantly lend borrowed funds
                    based on the current value of
                    cryptocurrency assets:
                </div>
                {[
                    'The user requests a loan using his crypto asset as security.',
                    'In turn, the user instantly receives the agreed loan amount in Bitcoins.',
                    'After repayment of the loan, the user receives back his security deposit, even if it has ' +
                    'increased in value.'
                ].map((text, i) => <ListItem key={i} text={text}/>)}
                <div className={styles.caption1Font}>Service Waves Loan works as a pawnshop.</div>
                <div className={styles.caption2Font}>There is a sale of cryptocurrency (YOU are the seller), which Waves
                    Loan acquires. After a
                    specified period of time you re-acquire a cryptocurrency from Waves Loan.
                </div>
            </div>
            <div className={styles.takeLoanBlock}>
                <div className={styles.wbIcon}/>
                <div className={styles.caption3Font}>You can instantly take Bitcoin for Waves with an unlimited loan
                    term and 20 days of interest-free
                    grace period. Just log in through the keeper and decide on the loan amount.
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

