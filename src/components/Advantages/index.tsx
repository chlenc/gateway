import React from 'react';
import styles from './styles.scss';

export default class Advantages extends React.Component {

    render(): React.ReactNode {
        return <div className={styles.root}>
            {[
                {
                    icon: styles.infIcon,
                    header: 'Unlimited loans',
                    caption: 'Currencies can be borrowed an unlimited number of times'
                },
                {
                    icon: styles.sevenIcon,
                    header: '7 days free of charge period',
                    caption: 'If you will return the borrowed amount in 7 days – you won’t pay interest rates'
                },
                {
                    icon: styles.dappIcon,
                    header: 'DApp',
                    caption: 'Funds are stored on the Waves DApp'
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
