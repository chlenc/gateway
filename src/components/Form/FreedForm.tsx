import React from 'react';
import styles from './styles.scss';
import SignBtn from '@components/SignBtn';
import BtcInfo from '@components/Form/BtcInfo';
import RateInfo from '@components/Form/RateInfo';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';

const Handle = Slider.Handle;

const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
        <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={value}
            visible={dragging}
            placement="top"
            key={index}
            overlayClassName={styles.tooltip}
        >
            <Handle value={value} {...restProps} />
        </Tooltip>
    );
};

interface IState {
    wavesRate: number
    btcRate: number

}

interface IProps {
    isLogin: boolean
    onGetLoan: (u: number) => void
    interestPeriod: number
    rate: number
    maxTokenCount: number
    grace: number
    balance?: string
}

const m = 100000000;

export default class FreedForm extends React.Component<IProps, IState> {

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>): void {
        prevProps.balance === undefined && this.props.balance && this.setState({
            wavesRate: this.props.balance && (+this.props.balance / m) - 1 > 0 ? (+this.props.balance / m) - 1 : 0,
            btcRate: this.props.balance && ((+this.props.balance / m) - 1) > 0
                ? ((+this.props.balance / m) - 1) / this.props.rate! : 0,
        });
    }

    state: IState = {
        wavesRate: this.props.rate || 0,
        btcRate: this.props.rate ? 1 : 0
    };


    private calculateInterestAmount = () => {
        const amountInBlock = this.state.wavesRate / this.props.interestPeriod * 1440;
        return amountInBlock > this.state.wavesRate ? this.state.wavesRate : amountInBlock;
    };

    private handleChangeWavesCount = (value: number) => {
        if (value === 0) {
            this.setState({wavesRate: 0, btcRate: 0});
        } else {
            const currentValue = this.checkWavesValue(value);
            this.setState({
                wavesRate: currentValue,
                btcRate: currentValue / this.props.rate!
            });
        }

    };

    private get gracePeriodAtDays() {
        const degree = this.props.grace / 1440;
        const days = Math.ceil(degree);
        return degree === days ? days : '~' + days;
    }

    private handleChangeBtcCount = (value: number) => {
        const currentValue = this.checkBtcValue(value);
        this.setState({
            wavesRate: currentValue * this.props.rate!,
            btcRate: currentValue,
        });
    };

    private checkWavesValue = (val: number) => {
        // const canPay = this.props.balance ? (+this.props.balance / m) - 1 : 0;
        if (val < 0) return 0;
        // if (this.props.balance && val > canPay) return canPay;
        // if (val > this.props.maxTokenCount * this.props.rate!) return this.props.maxTokenCount * this.props.rate!;
        return val;
    };

    private checkBtcValue = (val: number) => {
        // const canPay = this.props.balance ? (+this.props.balance / m) - 1 : 0;
        if (val < 0) return 0;
        // if (this.props.balance && val > canPay / this.props.rate!) return canPay / this.props.rate!;
        // if (val > this.props.maxTokenCount) return this.props.maxTokenCount;
        return val;
    };

    handleFocus = (e) => e.target.select();

    render(): React.ReactNode {
        const {wavesRate, btcRate} = this.state;
        const {isLogin, onGetLoan, rate, balance, maxTokenCount, grace} = this.props;
        return <div className={styles.root}>
            <div>
                <div className={styles.header1Font}>Loan calculator</div>
                <div className={styles.calculateField}>
                    <div className={styles.calculateField_col}>
                        <div className={styles.header2Font}>
                            Amount for deposit{/*Your balance {balance || 0} WAVES*/}
                        </div>
                        <div className={styles.captionFont}>You pay</div>
                        <div className={styles.inputField}>
                            <div className={styles.wavesIcn}/>
                            <input
                                disabled={!rate}
                                type="number"
                                onChange={(e) => this.handleChangeWavesCount(+e.target.value)}
                                onFocus={this.handleFocus}
                                value={wavesRate}
                            />
                        </div>
                    </div>
                    <div className={styles.calculateField_col}>
                        <div className={styles.header2Font}>
                            Will be borrowed{/*DApp balance {maxTokenCount} WBTC*/}
                        </div>
                        <div className={styles.captionFont}>You get</div>
                        <div className={styles.inputField}>
                            <div className={styles.btcIcn}/>
                            <input
                                disabled={!rate}
                                type="number"
                                onChange={(e) => this.handleChangeBtcCount(+e.target.value)}
                                onFocus={this.handleFocus}
                                value={btcRate}
                            />
                            <BtcInfo/>
                        </div>
                    </div>
                </div>
                <div className={styles.termInfField}>
                    <Slider
                        className={styles.slider}
                        min={0}
                        max={maxTokenCount}
                        defaultValue={btcRate}
                        value={btcRate}
                        handle={handle}
                        trackStyle={{ backgroundColor: 'blue'}}
                        step={0.000001}
                        onChange={this.handleChangeBtcCount}
                    />
                    <div className={styles.header2Font}>Loan terms:</div>
                </div>
                <div className={styles.rateField}>
                    <div className={styles.rateField_row}>
                        <div className={styles.flex}>Current rate <RateInfo/></div>
                        <div className={styles.rateFont}>
                            <b className={styles.rateCount}>{rate}</b> &nbsp;
                            <div className={styles.rateFont_waves}>WAVES</div>
                            &nbsp;/ &nbsp;<b className={styles.rateCount}>1</b> &nbsp;
                            <div className={styles.rateFont_btc}>WBTC</div>
                        </div>
                    </div>
                    <div className={styles.rateField_row}>
                        Grace period
                        <div className={styles.rateFont}>
                            <b className={styles.rateCount}>{this.gracePeriodAtDays}</b> &nbsp;Days (&nbsp;
                            <b className={styles.rateCount}>{grace}</b>
                            &nbsp;blocks&nbsp;)
                        </div>
                    </div>
                    <div className={styles.rateField_row}>
                        Interest after {this.gracePeriodAtDays} days
                        <div className={styles.rateFont}>
                            <b className={styles.rateCount}>{this.calculateInterestAmount()}</b> &nbsp;
                            <div className={styles.rateFont_waves}>WAVES</div>
                            &nbsp;/ Day
                        </div>
                    </div>
                </div>

            </div>
            <div>

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
            </div>
        </div>;
    }
}
