import React from 'react';
import styles from './styles.scss';

interface IProps {
}

export default class Form extends React.Component<IProps> {

    render(): React.ReactNode {
        return <div className={styles.root}></div>;
    }
}
