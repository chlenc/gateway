import * as React from 'react';
import cn from 'classnames';

import styles from './styles.scss';

interface IProps {
  type?: string,
  title?: string | Element,
  description?: string | JSX.Element
}

const Status = (props: IProps) => {
  const {
    type,
    title,
    description
  } = props;

  return (
    <div className={cn(styles.status, styles[`status__type_${type}`])}>
      {title && (
        <div className={styles.status_title}>
          {title}
        </div>
      )}

      {description && (
        <div className={styles.status_description}>
          {description}
        </div>
      )}
    </div>
  );
};

export default Status;

