import React from 'react';
import styles from './styles.scss';
import RateInfo from '@components/Form/RateInfo';

interface IState {
}

interface IProps {
    onReturnLoan: () => void
    balance: number
    grace: number
    height: number
    interestPeriod: number
    details: TDetails
}

export type TDetails = {
    start: number
    end_of_freeze: number
    rate: number
    deposit: number
    lend: number
}

const m = 100000000;
export default class LoanedForm extends React.Component<IProps, IState> {


    private calculateInterestAmount = () => {
        const amountInBlock = (this.props.details.deposit / m) / this.props.interestPeriod //* 1440;
        return amountInBlock > (this.props.details.deposit / m) ? (this.props.details.deposit / m) : amountInBlock;
    };


    calculateGetBackWaves = () => {
        const {height, details, grace} = this.props;
        if (height <= details.start + grace) {
            return details.deposit / m;
        } else if (height > details.start + grace && height <= details.end_of_freeze) {
            const amountInBlock = this.calculateInterestAmount();
            return ((details.deposit) - amountInBlock * (height - details.start + grace)) / m;
        } else {
            return 0;
        }
    };


    calculateGraceDaysLeft = () => { //blocks
        const last = (this.props.details.start + this.props.grace - this.props.height);
        return last > 0 ? last : 0;
    };

    render(): React.ReactNode {
        const {onReturnLoan, balance, details} = this.props;
        const graceDaysLeft = this.calculateGraceDaysLeft();
        return <div className={styles.root}>
            <div className={styles.header1Font}>Loan managment details</div>

            <div className={styles.loanField}>
                <div className={styles.loan_section}>
                    <div className={styles.loanField_row}>
                        You have on your account
                        <div className={styles.rateFont}>
                            <b className={styles.rateCount}>{balance / m}</b> &nbsp;
                            <div className={styles.rateFont_waves}>WAVES</div>
                            &nbsp;/ &nbsp;<b className={styles.rateCount}>{balance / m / details.rate}</b> &nbsp;
                            <div className={styles.rateFont_btc}>BTC</div>
                        </div>
                    </div>
                </div>

                <div className={styles.loan_section}>
                    <div className={styles.loanField_row}>
                        <div className={styles.flex}>Your rate <RateInfo/></div>
                        <div className={styles.rateFont}>
                            <b className={styles.rateCount}>{details.rate}</b> &nbsp;
                            <div className={styles.rateFont_waves}>WAVES</div>
                            &nbsp;/ &nbsp;<b className={styles.rateCount}>{1}</b> &nbsp;
                            <div className={styles.rateFont_btc}>BTC</div>
                        </div>
                    </div>
                    <div className={styles.loanField_row}>
                        Grace days left (blocks)
                        <b className={styles.rateCount}>{graceDaysLeft}</b>
                    </div>
                    <div className={styles.loanField_row}>
                        Curent interest ammount
                        <div className={styles.rateFont}>
                            <b className={styles.rateCount}>
                                {graceDaysLeft === 0 ? this.calculateInterestAmount() : 0}
                            </b>&nbsp;
                            <div className={styles.rateFont_waves}>WAVES</div>
                            &nbsp;/ Day (block)
                        </div>
                    </div>
                </div>

                <div className={styles.loan_section}>
                    <div className={styles.loanField_row}>
                        You paid
                        <div className={styles.rateFont}>
                            <b className={styles.rateCount}>{details.deposit / m}</b> &nbsp;
                            <div className={styles.rateFont_waves}>WAVES</div>
                        </div>
                    </div>
                    <div className={styles.loanField_row}>
                        You borrowed
                        <div className={styles.rateFont}>
                            <b className={styles.rateCount}>{details.lend / m}</b> &nbsp;
                            <div className={styles.rateFont_btc}>BTC</div>
                        </div>
                    </div>
                    <div className={styles.loanField_row}>
                        You get back now
                        <div className={styles.rateFont}>
                            <b className={styles.rateCount}>{this.calculateGetBackWaves()}</b> &nbsp;
                            <div className={styles.rateFont_waves}>WAVES</div>
                        </div>
                    </div>
                </div>

            </div>
            <button className={styles.returnBtn} onClick={onReturnLoan}>Return a loan</button>
        </div>;
    }
}
