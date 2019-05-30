import React from 'react';
import styles from './styles.scss';

export default class Footer extends React.Component {

    render(): React.ReactNode {
        return <div className={styles.root}>
            <div className={styles.links}>
                {[
                    {
                        text: 'Github',
                        link: '/'
                    },
                    {
                        text: 'Explorer',
                        link: '/'
                    },
                    {
                        text: 'News',
                        link: '/'
                    },
                    {
                        text: 'About',
                        link: '/'
                    },
                ].map(({link, text}: { link: string, text: string }, i) =>
                    <a className={styles.link} href={link} target="_blank" key={i}>{text}</a>)}
            </div>
            <div className={styles.logo}/>
        </div>;
    }
}
