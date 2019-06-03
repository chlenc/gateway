import React from 'react';
import styles from './styles.scss';
import SignBtn from '@components/SignBtn';

interface IState {
    isGracePeriod: boolean
    wavesRate: number
    btcRate: number
    maxTokenCount: number
    interestPeriod: number
    rate?: number
}

interface IProps {
    isLogin: boolean
}

export default class FreedForm extends React.Component<IProps, IState> {

    dappAddress = '3FjvHCTfkkkEhBoVzDD7N6s6YuyC7gmVVnw';
    dappAsset = '7LZvLr9A1e4YJCZJMGEGpFu9ZoHfuJ9iNj9iqXqXd93r';
    nodeUrl = 'https://devnet-aws-ir-2.wavesnodes.com';

    state: IState = {
        isGracePeriod: true,
        wavesRate: 0,
        btcRate: 0,
        maxTokenCount: 0,
        interestPeriod: 1
    };

    async componentDidMount() {
        this.getNodeField(`/addresses/data/${this.dappAddress}/rate`, 'rate');
        this.getNodeField(`/addresses/data/${this.dappAddress}/interestPeriod`, 'interestPeriod');

        const path = `${this.nodeUrl}/assets/balance/${this.dappAddress}/${this.dappAsset}`;
        const json = await (await fetch(path)).json();
        if (!json.error) this.setState({maxTokenCount: json.balance});

        // console.dir((await fetch(`${this.nodeUrl}/addresses/data/${this.dappAddress}`)).json());
    }

    private getNodeField = async (path: string, key: string) => {
        const json = await (await fetch(`${this.nodeUrl}${path}`)).json();
        const state = {};
        if (!json.error) {
            state[key] = json.value;
            this.setState(state);
        }
    };

    private calculateInterestAmount = () => this.state.wavesRate / this.state.interestPeriod;

    handleOnGracePeriod = () => this.setState({isGracePeriod: true});

    handleOffGracePeriod = () => this.setState({isGracePeriod: false});

    handleChangeWavesCount = (e) => {
        if (+e.target.value === 0) {
            this.setState({wavesRate: 0, btcRate: 0});
        } else {
            const currentValue = this.checkWavesValue(+e.target.value);
            this.setState({
                wavesRate: currentValue,
                btcRate: currentValue / this.state.rate!
            });
        }

    };

    handleChangeBtcCount = (e) => {
        const currentValue = this.checkBtcValue(+e.target.value);
        this.setState({
            wavesRate: currentValue * this.state.rate!,
            btcRate: currentValue,
        });
    };

    private checkWavesValue = (val: number) => {
        if (val < 0) return 0;
        if (val > this.state.maxTokenCount * this.state.rate!) {
            return this.state.maxTokenCount * this.state.rate!;
        } else {
            return val;
        }

    };
    private checkBtcValue = (val: number) => {
        if (val < 0) return 0;
        if (val > this.state.maxTokenCount) {
            return this.state.maxTokenCount;
        } else {
            return val;
        }

    };

    handleFocus = (e) => e.target.select();

    render(): React.ReactNode {
        const {isGracePeriod, rate, wavesRate, btcRate} = this.state;
        const {isLogin} = this.props;
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
                        <div className={styles.btcHelpIcn}/>
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
                    <div className={styles.flex}>Current rate <div className={styles.rateHelpIcn}/></div>
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
                <button disabled={!isLogin} className={styles.submitBnt}>Get a loan</button>
            </div>
        </div>;
    }
}
