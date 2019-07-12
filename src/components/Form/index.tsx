import React from 'react';
import AccountStore from '@stores/AccountStore';
import { inject, observer } from 'mobx-react';
import FreedForm from '@components/Form/FreedForm';
import LoanedForm, { TDetails } from '@components/Form/LoanedForm';
import DappStore from '@stores/DappStore';
import styles from './styles.scss';

interface IState {
}

interface IProps {
    accountStore?: AccountStore
    dappStore?: DappStore
}

const m = 100000000;


@inject('accountStore', 'dappStore')
@observer
export default class Form extends React.Component<IProps, IState> {

    handleGetLoan = (u: number) => {
        const {wavesKeeperAccount} = this.props.accountStore!;
        if (wavesKeeperAccount && ((+wavesKeeperAccount.balance.available / m) - 0.1) >= u) {
            this.props.dappStore!.borrow(u);
        } else {
            alert('insufficient funds');
        }
    };

    handleDiscard = () => this.props.dappStore!.discard();

    handleReturnLoan = () => this.props.dappStore!.buyBack();

    render(): React.ReactNode {
        const {wavesKeeperAccount, btcBalance, isApplicationAuthorizedInWavesKeeper: isLogin} =
            this.props.accountStore!;
        const {
            isLoaned, interestPeriod, maxTokenCount,
            currentRate, gracePeriod, start, height, deposit, lend, end_of_freeze, rate
        } = this.props.dappStore!;
        const details: TDetails | null = end_of_freeze != null
            ? {
                rate: +rate!,
                start: +start!,
                end_of_freeze: +end_of_freeze,
                deposit: +deposit!,
                lend: +lend!,
            } : null
        ;
        if (this.props.dappStore!.wait) {
            return <div className={styles.root}>
                <div className={styles.load}/>
            </div>;
        }
        return isLogin && isLoaned && wavesKeeperAccount != null && details != null
            ? <LoanedForm
                onReturnLoan={this.handleReturnLoan}
                onDiscard={this.handleDiscard}
                grace={gracePeriod}
                height={+height}
                interestPeriod={interestPeriod}
                balance={+wavesKeeperAccount.balance.available}
                details={details}
                btcBalance={btcBalance}
            />
            : <FreedForm
                interestPeriod={interestPeriod}
                maxTokenCount={maxTokenCount}
                onGetLoan={this.handleGetLoan}
                isLogin={isLogin}
                rate={currentRate}
                balance={wavesKeeperAccount ? wavesKeeperAccount.balance.available : undefined}
                grace={gracePeriod}
            />;
    }
}
