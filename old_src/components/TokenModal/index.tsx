import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router'; 
import Media from 'react-media';
import { inject, observer } from 'mobx-react';
import { injectIntl, InjectedIntl } from 'react-intl';
import axios from 'axios';
import qs from 'query-string';
import cn from 'classnames';

import { Modal } from 'antd';
import RatingStats from '@components/RatingStats';
import StarRating from '@components/StarRating';
import TopBadge from '@components/TopBadge';
import TokenInfo from './TokenInfo';
import Status from './Status';
import RateFormStatuses from './RateFormStatuses';
import BrowserValidationStatuses from './BrowserValidationStatuses';
import WavesKeeperValidationStatuses from './WavesKeeperValidationStatuses';

import {
  RouterStore,
  AccountStore,
  TokenListStore
} from '@stores';

import { IToken, defaultQuery } from '@stores/TokenListStore';

import { Message } from '@src/locales/messages';

import wavesApiService from '@services/waves-api-service';

import { breakpoints } from '@src/constants';

import styles from './styles.scss';

interface IInjectedProps {
  intl: InjectedIntl
  routerStore?: RouterStore
  accountStore?: AccountStore
  tokenListStore?: TokenListStore
}

interface IParams {
  assetId: string
}

interface IProps extends
  RouteComponentProps<IParams>,
  IInjectedProps {}

interface IState {
  isLoading: boolean
  token?: IToken
  rateField: number
  submittingStatus: 'default' | 'processing' | 'success' | 'error',
  submittingStatusTxId?: string
}

const TX_FEE = 0.001;

@inject('routerStore', 'accountStore', 'tokenListStore')
@observer
class TokenModal extends Component<IProps, IState> {
  state: IState = {
    isLoading: false,
    rateField: 0,
    submittingStatus: 'default',
  };

  private loadToken = async () => {
    const { params } = this.props.match;

    this.setState({
      isLoading: true
    });

    const res = await axios.get(`/api/v1/token/${params.assetId}`);

    const { token } = res.data;

    if (token) {
      this.setState({
        isLoading: false,
        token
      });
    }
  }
    
  private handleUpdateRateField = (value: number) => {
    const { accountStore } = this.props;

    this.setState({
      rateField: value
    });

    if (accountStore!.isWavesKeeperInstalled && !accountStore!.isWavesKeeperInitialized) {
      accountStore!.setupSynchronizationWithWavesKeeper();
      accountStore!.runApplicationAuthorizationStatusWatcher();
      accountStore!.runWavesKeeperAccountChangeReaction();
    }
  }

  private handleVoteSubmit = async () => {
    const { accountStore } = this.props;

    const dataTx = this.prepareVoteTransaction();

    try {
      this.setState(() => ({
        submittingStatus: 'processing'
      }));
      
      const tx = await window['WavesKeeper'].signAndPublishTransaction(dataTx);

      const txId = JSON.parse(tx).id;

      await wavesApiService.checkDataTX(txId);

      await accountStore!.updateApplicationAccount();

      await this.loadToken();

      this.setState(() => ({
        submittingStatus: 'success',
        submittingStatusTxId: txId,
        rateField: 0
      }));
    } catch (error) {
      this.setState(() => ({
        submittingStatus: 'error',
        rateField: 0
      }));  
    }
  }

  private prepareVoteTransaction() {
    const { params } = this.props.match;

    const { rateField } = this.state;

    let buildData = [
      {
        type: 'string',
        key: 'tokenRating',
        value: 'tokenRating'
      },
      {
        key: 'assetId',
        type: 'string',
        value: params.assetId
      },
      {
        key: 'score',
        type: 'integer',
        value: rateField
      }
    ];

    return {
      type: 12,
      data: {
        fee: {
          assetId: 'WAVES',
          tokens: TX_FEE
        },
        data: buildData
      }
    };
  }

  private getModalTitle = () => {
    const { token } = this.state;

    return token
      ? (
        <div className={styles.modalTitle}>
          <div className={styles.modalTitle_tokenName}>
            {token.assetName}
          </div>
          
          {token.top && (
            <div className={styles.modalTitle_tokenBadge}>
              <TopBadge size={'m'}/>
            </div>
          )}
        </div>
      )
      : undefined;
  };

  private getAccountLastTokenVote() { //ref this
    const { accountStore } = this.props;

    const { token } = this.state;

    if (token) {
      return accountStore!.applicationAccount.votes.find((vote) => vote.assetId === token.assetId);
    }
  }

  private isTokenVotedByAccount() { //ref this
    const vote = this.getAccountLastTokenVote();

    return vote ? true : false;
  }

  private handleCloseModal = () => {
    const { routerStore, tokenListStore } = this.props;

    const query = tokenListStore!.query;

    const params = {
      page: (query.page && query.page !== defaultQuery.page) ? query.page : undefined,
      filter: (query.filter && query.filter !== defaultQuery.filter) ? query.filter : undefined
    };

    const search = qs.stringify(params);

    routerStore!.push({
      pathname: '/',
      search: search,
      state: { isModalOpened: false }
    });
  }

  componentDidMount() {
    const { accountStore } = this.props;

    this.loadToken();

    if (!accountStore!.isWavesKeeperInitialized) {
      accountStore!.setupWavesKeeper();
    }
  }

  render() {
    const {
      intl,
      accountStore
    } = this.props;

    const {
      isWavesKeeperLocked,
      isApplicationAuthorizedInWavesKeeper,
      isWavesKeeperInstalled,
      isBrowserSupportsWavesKeeper,
      isSupportedAccountNetwork,
      hasEnoughBalance,
      isWavesKeeperAccountUpdatePending,
      isWavesKeeperSetupPending,
      isApplicationAuthorizationPending
    } = accountStore!;

    const {
      token,
      rateField,
      submittingStatus,
      submittingStatusTxId
      
    } = this.state;

    const isValid = (
      isApplicationAuthorizedInWavesKeeper &&
      isBrowserSupportsWavesKeeper &&
      isWavesKeeperInstalled &&
      !isWavesKeeperLocked &&
      isSupportedAccountNetwork &&
      hasEnoughBalance &&
      submittingStatus !== 'processing'
    );

    if (!token) {
      return null;
    }

    return (
      <Modal
        className={styles.modal}
        wrapClassName={styles.modalWrap}
        title={this.getModalTitle()}
        destroyOnClose={true}
        closable={false}
        visible={true}
        footer={null}
        onCancel={this.handleCloseModal}
      >
        <div className={styles.root}>
          <div
            onClick={this.handleCloseModal}
            className={styles.closeBtn}
          />

          {token.voted && token!.scoreBoard && (
            <RatingStats
              scoreBoard={token!.scoreBoard}
            />
          )}

          <Media query={{ maxWidth: breakpoints.sm}}>
            <Status
              type={'warning'}
              title={intl.formatMessage(
                { id: Message.validation_warning_mobile_version_is_not_supported_title }
              )}
              description={intl.formatMessage(
                { id: Message.validation_warning_mobile_version_is_not_supported_description }
              )}
            />
          </Media>

          <Media query={{ minWidth: breakpoints.sm}}>
            <>
              {!token.voted && !token.scoreBoard && (
                <Status
                  type={'warning'}
                  title={intl.formatMessage(
                    { id: Message.validation_warning_not_voted_title }
                  )}
                  description={intl.formatMessage(
                    { id: Message.validation_warning_not_voted_description }
                  )}
                />
              )}

              {token.voted && !token.scoreBoard && (
                <Status
                  type={'warning'}
                  title={intl.formatMessage(
                    { id: Message.validation_warning_rating_is_not_calculated_title }
                  )}
                  description={intl.formatMessage(
                    { id: Message.validation_warning_rating_is_not_calculated_description }
                  )}
                />
              )}

              {this.isTokenVotedByAccount() && (
                <Status
                  type={'warning'}
                  title={intl.formatMessage(
                    { id: Message.validation_warning_token_was_voted_title }
                  )}
                  description={intl.formatMessage(
                    { id: Message.validation_warning_token_was_voted_description },
                    { score: this.getAccountLastTokenVote()!.score }
                  )}
                />
              )}

              <BrowserValidationStatuses/>

              {rateField !== 0 && !isApplicationAuthorizationPending && !isWavesKeeperAccountUpdatePending && (
                <WavesKeeperValidationStatuses
                  token={token}
                />
              )}

              <RateFormStatuses
                submittingStatus={submittingStatus}
                submittingStatusTxId={submittingStatusTxId}
              />

              <div
                className={cn(
                  styles.rate,
                  { [styles.rate__disabled]: isWavesKeeperSetupPending && !isWavesKeeperInstalled }
                )}
              >
                <div className={styles.rate_title}>
                  {intl.formatMessage({ id: Message.voting_title })}
                </div>

                <div className={styles.rate_stars}>
                  <StarRating
                    size={'m'}
                    value={rateField}
                    isEditable={true}
                    onSelect={this.handleUpdateRateField}
                  />
                </div>

                <div className={styles.rate_instruction}>
                  {intl.formatMessage({ id: Message.voting_instruction})}
                </div>

                <button
                  className={cn(
                    styles.rate_submitBtn,
                    { [styles.rate_submitBtn__disabled]: rateField === 0 || !isValid }
                  )}
                  onClick={this.handleVoteSubmit}
                >
                  {intl.formatMessage({ id: Message.voting_submit_button })}
                </button>

                <div className={styles.rate_fee}>
                  <div>Fee</div>
                  <span>{`${intl.formatNumber(TX_FEE)} WAVES`}</span>
                </div>
              </div>
            </>
          </Media>

          <div className={styles.infoBlocks}>
            <TokenInfo token={token}/>
          </div>
        </div>
      </Modal>
    );
  }
}

export default injectIntl(TokenModal);
