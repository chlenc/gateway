import React from 'react';
import styles from './styles.scss';
import RateInfo from '@components/Form/RateInfo';

interface IState {
    graceDaysLeft: number
}

interface IProps {
    onReturnLoan: () => void
    balance: number
    rate: number
    start: number
    grace: number
    height: number
    interestPeriod: number
    lend: number
    deposit: number
}

const m = 100000000;
export default class LoanedForm extends React.Component<IProps, IState> {

    state = {
        graceDaysLeft: 0
    };

    componentDidMount(): void {
        this.calculateGraceDaysLeft();
    }


    private calculateInterestAmount = () => {
        const amountInBlock = (this.props.deposit / m) / this.props.interestPeriod * 1440;
        return amountInBlock > (this.props.deposit / m) ? (this.props.deposit / m) : amountInBlock;
    };


    calculateGetBackWaves = () => {
        const amountInBlock = (this.props.deposit / m) / this.props.interestPeriod * 1440;
        const res = this.props.deposit/m - ((this.props.height + this.props.grace) * amountInBlock);
        return res > 0 ? res / m : 0;
    };


    calculateGraceDaysLeft = () => {
        const last = (this.props.start + this.props.grace - this.props.height) / 1440;
        return last > 0 ? last : 0;
    };

    render(): React.ReactNode {
        const {onReturnLoan, balance, rate, deposit, lend} = this.props;
        const {graceDaysLeft} = this.state;
        return <div className={styles.root}>
            <div className={styles.header1Font}>Loan managment details</div>

            <div className={styles.loanField}>
                <div className={styles.loan_section}>
                    <div className={styles.loanField_row}>
                        You have on your account
                        <div className={styles.rateFont}>
                            <b className={styles.rateCount}>{balance / m}</b> &nbsp;
                            <div className={styles.rateFont_waves}>WAVES</div>
                            &nbsp;/ &nbsp;<b className={styles.rateCount}>{balance / m / rate}</b> &nbsp;
                            <div className={styles.rateFont_btc}>BTC</div>
                        </div>
                    </div>
                </div>

                <div className={styles.loan_section}>
                    <div className={styles.loanField_row}>
                        <div className={styles.flex}>Your rate <RateInfo/></div>
                        <div className={styles.rateFont}>
                            <b className={styles.rateCount}>{rate}</b> &nbsp;
                            <div className={styles.rateFont_waves}>WAVES</div>
                            &nbsp;/ &nbsp;<b className={styles.rateCount}>{1}</b> &nbsp;
                            <div className={styles.rateFont_btc}>BTC</div>
                        </div>
                    </div>
                    <div className={styles.loanField_row}>
                        Grace days left
                        <b className={styles.rateCount}>{graceDaysLeft}</b>
                    </div>
                    <div className={styles.loanField_row}>
                        Curent interest ammount
                        <div className={styles.rateFont}>
                            <b className={styles.rateCount}>
                                {graceDaysLeft === 0 ? this.calculateInterestAmount() : 0}
                            </b>&nbsp;
                            <div className={styles.rateFont_waves}>WAVES</div>
                            &nbsp;/ Day
                        </div>
                    </div>
                </div>

                <div className={styles.loan_section}>
                    <div className={styles.loanField_row}>
                        You paid
                        <div className={styles.rateFont}>
                            <b className={styles.rateCount}>{deposit / m}</b> &nbsp;
                            <div className={styles.rateFont_waves}>WAVES</div>
                        </div>
                    </div>
                    <div className={styles.loanField_row}>
                        You borrowed
                        <div className={styles.rateFont}>
                            <b className={styles.rateCount}>{lend / m}</b> &nbsp;
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
