import React from 'react';
import Tooltip from '@components/Tooltip';
import styles from '@components/Form/styles.scss';

export default class DiscardInfo extends  React.Component{
    render(): React.ReactNode {
        return <Tooltip placement="bottomLeft" trigger="hover" align={{offset: [-29, 0]}}
                        overlay={<div className={styles.captionFont}>If you choose this option, your loan will be discarded, you will keep WBTC and the servce will keep your WAVES deposit. </div>}
        >
                <div className={styles.rateHelpIcn}/>
        </Tooltip>;
    }
}
