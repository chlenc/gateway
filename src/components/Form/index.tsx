import React from 'react';
import AccountStore from '@stores/AccountStore';
import { inject, observer } from 'mobx-react';
import FreedForm from '@components/Form/FreedForm';
import LoanedForm from '@components/Form/LoanedForm';
import DappStore from '@stores/DappStore';

interface IState {
}

interface IProps {
    accountStore?: AccountStore
    dappStore?: DappStore
}

@inject('accountStore', 'dappStore')
@observer
export default class Form extends React.Component<IProps, IState> {


    handleGetLoan = (u: number) => this.props.dappStore!.borrow(u);
    handleReturnLoan = () => this.props.dappStore!.buyBack();

    render(): React.ReactNode {
        const {wavesKeeperAccount, isApplicationAuthorizedInWavesKeeper: isLogin} = this.props.accountStore!;
        const {
            isLoaned, interestPeriod, maxTokenCount,
            currentRate, gracePeriod, start, height, deposit, lend
        } = this.props.dappStore!;
        return isLogin && isLoaned && wavesKeeperAccount != null && start != null && deposit != null && lend != null
            ? <LoanedForm
                balance={+wavesKeeperAccount.balance.available}
                rate={currentRate}
                onReturnLoan={this.handleReturnLoan}
                start={+start}
                grace={gracePeriod}
                height={+height}
                interestPeriod={interestPeriod}
                deposit={+deposit}
                lend={+lend}
            />
            : <FreedForm
                interestPeriod={interestPeriod}
                maxTokenCount={maxTokenCount}
                onGetLoan={this.handleGetLoan}
                isLogin={isLogin}
                rate={currentRate}
            />;
    }
}
