import React, { Component } from 'react';
import cn from 'classnames';

import styles from './styles.scss';

interface IProps {
  value: number
  isEditable?: boolean
  size: 's' | 'm'
  onSelect?: (value: number) => void
}

class StarRating extends Component<IProps> {
  static defaultProps: IProps = {
    value: 0,
    isEditable: false,
    size: 's'
  };
  
  private handleSelect = (value: number) => {
    const { onSelect } = this.props;

    onSelect && onSelect(value);
  }

  private getStarsClassname = () => {
    const { isEditable } = this.props;

    return cn(
      styles.starRating_stars,
      { [styles.starRating_stars__editable]: isEditable}
    );
  }

  render() {
    const {
      value,
      size
    } = this.props;

    return (
      <div className={cn(styles.starRating, styles[`starRating__size_${size}`])}>
        <div
          className={this.getStarsClassname()}
          data-count={value}
        >
          <div className={styles.starRating_item} onClick={this.handleSelect.bind(this, 1)}/>
          <div className={styles.starRating_item} onClick={this.handleSelect.bind(this, 2)}/>
          <div className={styles.starRating_item} onClick={this.handleSelect.bind(this, 3)}/>
          <div className={styles.starRating_item} onClick={this.handleSelect.bind(this, 4)}/>
          <div className={styles.starRating_item} onClick={this.handleSelect.bind(this, 5)}/>
        </div>
      </div>
    );
  }
}

export default StarRating;
