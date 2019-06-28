import React from 'react';
import styles from './styles.scss';

export default class Advantages extends React.Component {

    render(): React.ReactNode {
        return <div className={styles.root}>
            {[
                {
                    icon: styles.infIcon,
                    header: 'Maximum loan term',
                    caption: 'We do not have a loan term limit.'
                },
                {
                    icon: styles.sevenIcon,
                    header: '7 days of grace period',
                    caption: 'Taking Bitcoin for Waves and returning it within 20 days, you do not pay interest'
                },
                {
                    icon: styles.dappIcon,
                    header: 'DApp',
                    caption: 'Funds are stored on the Waves DApp.'
                }
            ].map(({icon, header, caption}: { icon: string, header: string, caption: string }, i) =>
                <ListItem key={i} header={header} icon={icon} caption={caption}/>)}
        </div>;
    }
}

const ListItem = ({icon, header, caption}) =>
    <div className={styles.advBlock}>
        <div className={icon}/>
        <div className={styles.headerFont}>{header}</div>
        <div className={styles.captionFont}>{caption}</div>
    </div>;
