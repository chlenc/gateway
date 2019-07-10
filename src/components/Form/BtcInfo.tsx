import React from 'react';
import Tooltip from '@components/Tooltip';
import styles from '@components/Form/styles.scss';

export default class BtcInfo extends  React.Component{
    render(): React.ReactNode {
        return <Tooltip placement="bottomRight" trigger="hover" align={{offset: [34, 0]}}
                        overlay={<div className={styles.captionFont}>Amount of WBTC available for loan.</div>}
        >
                <div className={styles.btcHelpIcn}/>
        </Tooltip>;
    }
}
