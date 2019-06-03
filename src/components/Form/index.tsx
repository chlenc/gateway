import React from 'react';
import AccountStore from '@stores/AccountStore';
import { inject, observer } from 'mobx-react';
import FreedForm from '@components/Form/FreedForm';
import LoanedForm from '@components/Form/LoanedForm';

interface IState {
    isLoaned: boolean
}

interface IProps {
    accountStore?: AccountStore
}

@inject('accountStore')
@observer
export default class Form extends React.Component<IProps, IState> {
    state = {
        isLoaned: false
    };

    componentDidMount(): void {
        this.setState({isLoaned: true}); //todo add request
    }

    render(): React.ReactNode {
        const isLogin = this.props.accountStore!.isApplicationAuthorizedInWavesKeeper;
        return isLogin && this.state.isLoaned ? <LoanedForm/> : <FreedForm isLogin={isLogin}/>;
    }
}
