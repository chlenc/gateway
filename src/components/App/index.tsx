import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Layout, Menu } from 'antd';
import { Route, Router } from 'react-router-dom';

const {Header, Content, Footer} = Layout;
import { History } from 'history';

import styles from './styles.scss';
import AccountStore from '@stores/AccountStore';
import DappStore from '@stores/DappStore';
import NewInvoice from '@components/NewInvoice';
import PayInvoice from '@components/PayInvoice';

interface IProps {
    history: History
    accountStore?: AccountStore
    dappStore?: DappStore
}


@inject('accountStore', 'dappStore')
@observer
class App extends Component<IProps> {

    componentDidMount(): void {
        this.props.accountStore!.setupWavesKeeper();
        this.props.dappStore!.startHeightWatcher();
    }

    render() {
        return (
            <div className={styles.root}>
                <Layout className="layout">
                    <Header>
                        <div className={styles.logo}/>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={[this.props.history.location.pathname]}
                            className={styles.menu}
                        >
                            <Menu.Item key="/new" onClick={() => this.props.history.push('/new')}>
                                New invoice
                            </Menu.Item>
                            <Menu.Item key="/pay"  onClick={() => this.props.history.push('/pay')}>
                                Pay by invoice
                            </Menu.Item>
                            <Menu.Item key="/withdraw" disabled={true}>Withdraw</Menu.Item>
                        </Menu>
                    </Header>
                    <Content className={styles.content}>
                        <Router history={this.props.history}>
                            <div style={{margin: '16px 0', background: '#fff', padding: 24, minHeight: 280}}>
                                <Route path="/new" component={NewInvoice}/>
                                <Route path="/pay" component={PayInvoice}/>
                            </div>
                        </Router>

                    </Content>
                    <Footer className={styles.footer}>Chlenc ©2019</Footer>
                </Layout>
            </div>
        );
    }
}

export default App;
