import React from 'react';
import styles from './styles.scss';
import RateInfo from '@components/Form/RateInfo';
import DiscardInfo from '@components/Form/DiscardInfo';
import { round8 } from '@utils';

interface IState {
}

interface IProps {
    onReturnLoan: () => void
    onDiscard: () => void
    balance: number
    btcBalance: number
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

    private calculateDayInterestAmount = () => {
        const amountInBlock = (this.props.details.deposit / m) / this.props.interestPeriod * 1440;
        return amountInBlock > (this.props.details.deposit / m) ? (this.props.details.deposit / m) : amountInBlock;
    };
    private calculateBlockInterestAmount = () => {
        const amountInBlock = (this.props.details.deposit / m) / this.props.interestPeriod;
        return amountInBlock > (this.props.details.deposit / m) ? (this.props.details.deposit / m) : amountInBlock;
    };


    calculateGetBackWaves = () => {
        const {height, details, grace} = this.props;
        if (height <= details.start + grace) {
            return details.deposit / m;
        } else if (height > details.start + grace && height <= details.end_of_freeze) {
            const amountInBlock = this.calculateBlockInterestAmount();
            return ((details.deposit) - amountInBlock * (height - details.start + grace)) / m;
        } else {
            return '-';
        }
    };

    calculateGraceDaysLeft = () => {
        if (this.props.details.start === null) return '-';
        const last = (this.props.details.start + this.props.grace - this.props.height) / 1440;
        return last > 0 ? Math.round(last) : 0;
    };

    calculateGraceBlockseft = () => { //blocks
        const last = (this.props.details.start + this.props.grace - this.props.height);
        return last > 0 ? last : 0;
    };

    render(): React.ReactNode {
        const {onReturnLoan, balance, details, height, btcBalance} = this.props;
        const graceDaysLeft = this.calculateGraceDaysLeft();
        const graceBlocksLeft = this.calculateGraceBlockseft();
        return <div className={styles.root}>
            <div className={styles.header1Font}>Loan managment details</div>

            <div className={styles.loanField}>
                <div className={styles.loan_section}>
                    <div className={styles.loanField_row}>
                        You have on your account
                        <div className={styles.rateFont}>
                            <b className={styles.rateCount}>{round8(balance / m)}</b> &nbsp;
                            <div className={styles.rateFont_waves}>WAVES</div>

                        </div>
                    </div>
                    <div className={styles.loanField_row}>
                        &nbsp;
                        <div className={styles.rateFont}>

                            <b className={styles.rateCount}>{round8(btcBalance / m)}</b> &nbsp;
                            <div className={styles.rateFont_btc}>BTC</div>
                        </div>
                    </div>
                </div>

                <div className={styles.loan_section}>
                    <div className={styles.loanField_row}>
                        <div className={styles.flex}>Your rate <RateInfo/></div>
                        <div className={styles.rateFont}>
                            <b className={styles.rateCount}>{details.rate && details.rate}</b> &nbsp;
                            <div className={styles.rateFont_waves}>WAVES</div>
                            &nbsp;/ &nbsp;<b className={styles.rateCount}>{1}</b> &nbsp;
                            <div className={styles.rateFont_btc}>BTC</div>
                        </div>
                    </div>
                    <div className={styles.loanField_row}>
                        Grace days left (blocks)
                        <div className={styles.rateFont}>
                            <div className={styles.flex}>
                                <b className={styles.rateCount}>~&nbsp;{graceDaysLeft}</b>&nbsp;days&nbsp;/&nbsp;
                                <b className={styles.rateCount}>{graceBlocksLeft}</b>&nbsp;blocks
                            </div>
                        </div>
                    </div>
                    <div className={styles.loanField_row}>
                        Curent interest amount
                        <div className={styles.rateFont}>
                            <b className={styles.rateCount}>
                                {graceDaysLeft === 0 ? this.calculateDayInterestAmount() : 0}
                            </b>&nbsp;
                            <div className={styles.rateFont_waves}>WAVES</div>
                            &nbsp;/ Day (
                            <div
                                className={styles.rateCount}>{graceDaysLeft === 0 ? this.calculateBlockInterestAmount() : 0}</div>
                            )
                        </div>
                    </div>
                </div>

                <div className={styles.loan_section}>
                    <div className={styles.loanField_row}>
                        You paid
                        <div className={styles.rateFont}>
                            <b className={styles.rateCount}>{details.deposit && details.deposit / m}</b> &nbsp;
                            <div className={styles.rateFont_waves}>WAVES</div>
                        </div>
                    </div>
                    <div className={styles.loanField_row}>
                        You borrowed
                        <div className={styles.rateFont}>
                            <b className={styles.rateCount}>{details.lend && details.lend / m}</b> &nbsp;
                            <div className={styles.rateFont_btc}>BTC</div>
                        </div>
                    </div>
                    <div className={styles.loanField_row}>
                        You pay now
                        <div className={styles.rateFont}>
                            <b className={styles.rateCount}>{details.lend && details.lend / m}</b> &nbsp;
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
            <div className={styles.flexColumn}>
                <button
                    className={styles.returnBtn}
                    onClick={onReturnLoan}
                    disabled={details.end_of_freeze < height}
                >Return a loan
                </button>
                <div className={styles.discardCaption}>
                    or you can&nbsp; <a onClick={this.props.onDiscard} className={styles.discard}>discard</a> &nbsp;the
                    loan <DiscardInfo/>
                </div>
            </div>
        </div>;
    }
}
