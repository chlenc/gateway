import React from 'react';
import Tooltip from '@components/Tooltip';
import styles from '@components/Form/styles.scss';

export default class RateInfo extends  React.Component{
    render(): React.ReactNode {
        return <Tooltip placement="bottomLeft" trigger="hover" align={{offset: [-29, 0]}}
                        overlay={<div className={styles.captionFont}>The rate is set by the owner of the Dapp. Once you take a loan, the rate will be fixed no matter how exchange rate changes in the future. </div>}
        >
                <div className={styles.rateHelpIcn}/>
        </Tooltip>;
    }
}
