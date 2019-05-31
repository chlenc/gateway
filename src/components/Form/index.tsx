import React from 'react';
import styles from './styles.scss';
import AccountStore from '@stores/AccountStore';
import { inject, observer } from 'mobx-react';

interface IProps {
    onSign: () => void
}

interface IState {
    isGracePeriod: boolean
}

interface IProps {
    accountStore?: AccountStore
}

@inject('accountStore')
@observer
export default class Form extends React.Component<IProps, IState> {

    state = {
        isGracePeriod: true,
    };

    handleOnGracePeriod = () => this.setState({isGracePeriod: true});
    handleOffGracePeriod = () => this.setState({isGracePeriod: false});

    render(): React.ReactNode {
        const {isGracePeriod} = this.state;
        const {isWavesKeeperLocked} = this.props.accountStore!;
        return <div className={styles.root}>
            <div className={styles.header1Font}>Loan calculator</div>
            <div className={styles.calculateField}>
                <div className={styles.calculateField_col}>
                    <div className={styles.header2Font}>Your potential Amount</div>
                    <div className={styles.captionFont}>You can pay</div>
                    <div className={styles.inputField}>
                        <div className={styles.wavesIcn}/>
                        <input/></div>
                </div>
                <div className={styles.calculateField_col}>
                    <div className={styles.header2Font}>Smart contract Amount</div>
                    <div className={styles.captionFont}>You can get</div>
                    <div className={styles.inputField}>
                        <div className={styles.btcIcn}/>
                        <input/>
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
                    <div className={styles.rateFont}><b>{0}</b> &nbsp;
                        <div className={styles.rateFont_waves}>WAVES</div>
                        &nbsp;/ &nbsp;<b>{0}</b> &nbsp;
                        <div className={styles.rateFont_btc}>BTC</div>
                    </div>
                </div>
                <div className={styles.rateField_row}>
                    Total interest amount
                    <div className={styles.rateFont}><b>{0}</b> &nbsp;
                        <div className={styles.rateFont_waves}>WAVES</div>
                        &nbsp;/ Day
                    </div>
                </div>
            </div>
            <div className={styles.yellowCaption}>To take a loan you have to sign in first</div>
            <div className={styles.btnField}>
                <button className={styles.submitBnt} onClick={this.props.onSign}>
                    Sign in with Keeper
                </button>
                <button disabled={isWavesKeeperLocked} className={styles.submitBnt}>Get a loan</button>
            </div>
        </div>;
    }
}
