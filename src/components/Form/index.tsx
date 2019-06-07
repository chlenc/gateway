import React from 'react';
import AccountStore from '@stores/AccountStore';
import { inject, observer } from 'mobx-react';
import FreedForm from '@components/Form/FreedForm';
import LoanedForm, { TDetails } from '@components/Form/LoanedForm';
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
        return isLogin && isLoaned && wavesKeeperAccount != null && details != null
            ? <LoanedForm
                onReturnLoan={this.handleReturnLoan}
                grace={gracePeriod}
                height={+height}
                interestPeriod={interestPeriod}
                balance={+wavesKeeperAccount.balance.available}
                details={details}
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
