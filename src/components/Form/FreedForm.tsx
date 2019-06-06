import React from 'react';
import styles from './styles.scss';
import SignBtn from '@components/SignBtn';
import BtcInfo from '@components/Form/BtcInfo';
import RateInfo from '@components/Form/RateInfo';

interface IState {
    isGracePeriod: boolean
    wavesRate: number
    btcRate: number

}

interface IProps {
    isLogin: boolean
    onGetLoan: (u: number) => void
    interestPeriod: number
    rate: number
    maxTokenCount: number

}


export default class FreedForm extends React.Component<IProps, IState> {


    state: IState = {
        isGracePeriod: true,
        wavesRate: 0,
        btcRate: 0,
    };

    private calculateInterestAmount = () => {
        const amountInBlock = this.state.wavesRate / this.props.interestPeriod * 1440;
        return amountInBlock > this.state.wavesRate ? this.state.wavesRate : amountInBlock;
    };

    private handleOnGracePeriod = () => this.setState({isGracePeriod: true});

    private handleOffGracePeriod = () => this.setState({isGracePeriod: false});

    private handleChangeWavesCount = (e) => {
        if (+e.target.value === 0) {
            this.setState({wavesRate: 0, btcRate: 0});
        } else {
            const currentValue = this.checkWavesValue(+e.target.value);
            this.setState({
                wavesRate: currentValue,
                btcRate: currentValue / this.props.rate!
            });
        }

    };

    private handleChangeBtcCount = (e) => {
        const currentValue = this.checkBtcValue(+e.target.value);
        this.setState({
            wavesRate: currentValue * this.props.rate!,
            btcRate: currentValue,
        });
    };

    private checkWavesValue = (val: number) => {
        if (val < 0) return 0;
        if (val > this.props.maxTokenCount * this.props.rate!) {
            return this.props.maxTokenCount * this.props.rate!;
        } else {
            return val;
        }

    };
    private checkBtcValue = (val: number) => {
        if (val < 0) return 0;
        if (val > this.props.maxTokenCount) {
            return this.props.maxTokenCount;
        } else {
            return val;
        }

    };

    handleFocus = (e) => e.target.select();

    render(): React.ReactNode {
        const {isGracePeriod, wavesRate, btcRate} = this.state;
        const {isLogin, onGetLoan, rate} = this.props;
        return <div className={styles.root}>
            <div className={styles.header1Font}>Loan calculator</div>
            <div className={styles.calculateField}>
                <div className={styles.calculateField_col}>
                    <div className={styles.header2Font}>Your potential Amount</div>
                    <div className={styles.captionFont}>You can pay</div>
                    <div className={styles.inputField}>
                        <div className={styles.wavesIcn}/>
                        <input
                            disabled={!rate}
                            type="number"
                            onChange={this.handleChangeWavesCount}
                            onFocus={this.handleFocus}
                            value={wavesRate}
                        />
                    </div>
                </div>
                <div className={styles.calculateField_col}>
                    <div className={styles.header2Font}>Smart contract Amount</div>
                    <div className={styles.captionFont}>You can get</div>
                    <div className={styles.inputField}>
                        <div className={styles.btcIcn}/>
                        <input
                            disabled={!rate}
                            type="number"
                            onChange={this.handleChangeBtcCount}
                            onFocus={this.handleFocus}
                            value={btcRate}
                        />
                        <BtcInfo/>
                    </div>
                </div>
            </div>
            <div className={styles.termInfField}>
                <div className={styles.header2Font}>Loan taken term information</div>
                <div className={styles.termInfField_buttonSet}>
                    <button
                        onClick={this.handleOnGracePeriod}
                        className={isGracePeriod ? styles.leftCheckbox_selected : styles.leftCheckbox}
                    >
                        in <b>20 days</b> grace period
                    </button>
                    <button
                        onClick={this.handleOffGracePeriod}
                        className={isGracePeriod ? styles.rightCheckbox : styles.rightCheckbox_selected}
                    >
                        <b>20 days +</b> loan taken
                    </button>
                </div>
            </div>
            <div className={styles.rateField}>
                <div className={styles.rateField_row}>
                    <div className={styles.flex}>Current rate <RateInfo/></div>
                    <div className={styles.rateFont}>
                        <b className={styles.rateCount}>{wavesRate}</b> &nbsp;
                        <div className={styles.rateFont_waves}>WAVES</div>
                        &nbsp;/ &nbsp;<b className={styles.rateCount}>{btcRate}</b> &nbsp;
                        <div className={styles.rateFont_btc}>BTC</div>
                    </div>
                </div>
                <div className={styles.rateField_row}>
                    Total interest amount
                    <div className={styles.rateFont}>
                        <b className={styles.rateCount}>{this.calculateInterestAmount()}</b> &nbsp;
                        <div className={styles.rateFont_waves}>WAVES</div>
                        &nbsp;/ Day
                    </div>
                </div>
            </div>
            <div className={styles.yellowCaption}>To take a loan you have to sign in first</div>
            <div className={styles.btnField}>
                <SignBtn>
                    <button
                        disabled={isLogin}
                        className={styles.submitBnt}>
                        Sign in with Keeper
                    </button>
                </SignBtn>
                <button
                    disabled={!isLogin}
                    className={styles.submitBnt}
                    onClick={() => onGetLoan(wavesRate)}
                >
                    Get a loan
                </button>
            </div>
        </div>;
    }
}
