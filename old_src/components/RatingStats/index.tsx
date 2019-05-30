import React, { Component } from 'react';
import { injectIntl, InjectedIntl } from 'react-intl';
import cn from 'classnames';

import StarRating from '@components/StarRating';

import { IScoreBoard } from '@stores/TokenListStore';

import { Message } from '@src/locales/messages';

import styles from './styles.scss';

interface IInjectedProps {
  intl: InjectedIntl
}

interface IProps extends IInjectedProps {
  scoreBoard: IScoreBoard
}

type TVoteUnitType = 'tokens' | 'votes';

interface IState {
  voteUnitType: TVoteUnitType
}

class RatingStats extends Component<IProps, IState> {
  state: IState = {
    voteUnitType: 'tokens'
  };

  private formatNumber = (number: number, maxDigits?: number ) => {
    const { intl } = this.props;

    return intl.formatNumber(
      number,
      { maximumFractionDigits: maxDigits }
    );
  } 

  private kFormatter = (number: number) => {
    return number > 999
      ? `${this.formatNumber(number / 1000, 1)}K`
      : this.formatNumber(number, 0);
  } 

  private getTotalVotesByUnitType = () => {
    const { scoreBoard } = this.props;

    const  { voteUnitType } = this.state;

    return voteUnitType === 'tokens'
      ? scoreBoard.sumTokens
      : scoreBoard.votesCount;
  }

  private calcScorePercent = (score: number) => {
    const totalScore = this.getTotalVotesByUnitType();
    
    return (100 / totalScore) * score;
  }

  private handleChangeVoteUnitType(type: TVoteUnitType) {
    this.setState({
      voteUnitType: type
    });
  }

  render() {
    const {
      intl,
      scoreBoard
    } = this.props;

    const { voteUnitType } = this.state;

    const totalVoteInUnitType = this.getTotalVotesByUnitType();

    return (
      <div className={styles.root}>
        <div className={styles.averageStats}>
          <div className={styles.averageStats_score}>
            <span>{scoreBoard.averageScore.toFixed(1)}</span>
            <i>/ 5</i>
          </div>
          
          <div className={styles.averageStats_starRating}>
            <StarRating
              size={'s'}
              value={Math.round(scoreBoard.averageScore)}
            />
          </div>

          <div className={styles.averageStats_totalVoteInUnitType}>
            {intl.formatNumber(
              Number(totalVoteInUnitType),
              { maximumFractionDigits: 0 }
            )}
          </div>
        </div>
        <div className={styles.detailtedStats}>
          {Object.entries(scoreBoard.scoreBoard).reverse().map(([i, scoreItem]) => (
            <div key={i} className={styles.score}>
              <div className={styles.score_vote}>
                {+i}
              </div>

              <div className={styles.score_percent}>
                <i style={{ width: `${this.calcScorePercent(scoreItem[voteUnitType])}%` }}/>
              </div>

              <div className={styles.score_tokens}>
                {this.kFormatter(Number(scoreItem[voteUnitType]))}
              </div>
            </div>
          ))}

          <div className={styles.voteUnitTypeFilter}>
            <span
              onClick={this.handleChangeVoteUnitType.bind(this, 'tokens')}
              className={cn(
                styles.voteUnitTypeFilter_item,
                { [styles.voteUnitTypeFilter_item__isActive]: voteUnitType === 'tokens' }
              )}
            >
              {intl.formatMessage({ id: Message.vote_unit_tokens_type_filter })}
            </span>
            <span
              onClick={this.handleChangeVoteUnitType.bind(this, 'votes')}
              className={cn(
                styles.voteUnitTypeFilter_item,
                { [styles.voteUnitTypeFilter_item__isActive]: voteUnitType === 'votes' }
              )}
            >
              {intl.formatMessage({ id: Message.vote_unit_votes_type_filter })}
            </span> 
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(RatingStats);
