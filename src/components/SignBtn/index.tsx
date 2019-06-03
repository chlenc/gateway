import React from 'react';
import cl from 'classnames';
import { inject, observer } from 'mobx-react';
import AccountStore from '@stores/AccountStore';
import styles from './styles.scss';

interface IProps {
    children: React.ReactNode
    className?: string
    accountStore?: AccountStore
}

@inject('accountStore')
@observer
export default class SignBtn extends React.Component <IProps> {
    handleSign = () => {
        const accountStore = this.props.accountStore!;
        if (accountStore!.isWavesKeeperInstalled && !accountStore!.isWavesKeeperInitialized) {
            accountStore!.setupSynchronizationWithWavesKeeper();
        }
        accountStore.login().catch(e => alert(e.message));
    };

    render(): React.ReactNode {
        const {className, children} = this.props;
        return <div className={cl(styles.root, className)} onClick={this.handleSign}>{children}</div>;
    }

}
