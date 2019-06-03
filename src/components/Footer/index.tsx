import React from 'react';
import styles from './styles.scss';

export default class Footer extends React.Component {

    render(): React.ReactNode {
        return <div className={styles.bg}>

            <div className={styles.root}>
                <div className={styles.links}>
                    {[
                        {
                            text: 'Github',
                            link: 'https://github.com/wavesplatform/waves-loan'
                        },
                        {
                            text: 'Explorer',
                            link: 'https://wavesexplorer.com/'
                        },
                        {
                            text: 'News',
                            link: 'https://blog.wavesplatform.com/'
                        },
                        {
                            text: 'About',
                            link: 'https://wavesplatform.com/'
                        },
                    ].map(({link, text}: { link: string, text: string }, i) =>
                        <a className={styles.link} href={link} target="_blank" key={i}>{text}</a>)}
                </div>
                <div className={styles.logo}/>
            </div>
        </div>;
    }
}
