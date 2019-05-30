import { Message } from '../messages';

const translations = {
  [Message.filter_top]: `Top 20`,
  [Message.filter_default]: `All tokens`,
  [Message.mainpage_empty_text]: `No data`,
  [Message.mainpage_table_token_name]: `Name`,
  [Message.mainpage_table_rating]: `Rating`,
  [Message.mainpage_table_price]: `Price`,
  [Message.mainpage_table_averageScore_text]: `out of 5 stars`,
  [Message.mainpage_table_total_tokens]: `Total WCT votes`,
  [Message.mainpage_table_total_tokens_mobile]: `total WCT`,
  [Message.mainpage_table_total_votes]: `Total votes number`,
  [Message.mainpage_table_total_votes_mobile]: `total votes`,
  [Message.mainpage_table_amount]: `Total amount`,
  [Message.search_input_placeholder]: `Search token by ID, name or ticker`,
  [Message.search_unvoted_token]: `No rating yet`,
  [Message.mainpage_table_rating_status]: `Processing...`,
  [Message.validation_warning_mobile_version_is_not_supported_title]: `To rate for tokens use desktop browsers`,
  [Message.validation_warning_mobile_version_is_not_supported_description]: `Please use this service via desktop version Google Chrome, Mozilla Firefox, Opera or Microsoft Edge, with Waves Keeper installed to rate for tokens.`,
  [Message.validation_warning_not_voted_title]: `No rating yet`,
  [Message.validation_warning_not_voted_description]: `You can first to rate!`,
  [Message.validation_warning_rating_is_not_calculated_title]: `There will be a rating here soon!`,
  [Message.validation_warning_rating_is_not_calculated_description]: `Processing ...`,
  [Message.validation_warning_token_was_voted_title]: `You have already voted`,
  [Message.validation_warning_token_was_voted_description]: `
    But you can change your score.
    Your last score is {score}.
  `,
  [Message.validation_error_waves_keeper_is_not_supported_by_browser_title]: `Your browser is not suitable for this application`,
  [Message.validation_error_waves_keeper_is_not_supported_by_browser_description]: `Please use this service via Google Chrome, Mozilla Firefox, Opera or Microsoft Edge, with Waves Keeper installed.`,
  [Message.validation_error_waves_keeper_is_not_installed_title]: `We have detected that you had not install Waves Keeper.`,
  [Message.validation_error_waves_keeper_is_not_installed_description]: `To rate a token, you will also need at least 1 WCT in your balance. {installationLink}. When extension was installed, refresh this page in browser. {refreshLink}.`,
  [Message.waves_keeper_installation_link_text]: `Install Waves Keeper`,
  [Message.waves_keeper_refresh_link_text]: `Refresh`,
  [Message.validation_error_application_is_not_authorized_in_waves_keeper_title]: `WavesKeeper`,
  [Message.validation_error_application_is_not_authorized_in_waves_keeper_description]: `Please, approve service by Waves Keeper.`,
  [Message.validation_error_waves_keeper_is_empty_title]: `WavesKeeper`,
  [Message.validation_error_waves_keeper_is_empty_description]: `Add Waves Keeper account.`,
  [Message.validation_error_waves_keeper_is_locked_title]: `Please log in`,
  [Message.validation_error_waves_keeper_is_locked_description]: `To rate a token, please log in with Waves Keeper.`,
  [Message.validation_error_waves_keeper_wrong_network_title]: `Change network`,
  [Message.validation_error_waves_keeper_wrong_network_description]: `The account you have selected is on the wrong network. Change the network in Waves Keeper, then try again.`,
  [Message.validation_error_waves_keeper_not_enough_balance_title]: `Not enough WCT`,
  [Message.validation_error_waves_keeper_not_enough_balance_description]: `To rate a token, you must have at least 1 WCT in your wallet. Tokens are not transferred, only on existing balance is required for voting.`,
  [Message.validation_error_waves_keeper_not_enough_balance_user_not_voted_title]: `Not enough WCT`,
  [Message.validation_error_waves_keeper_not_enough_balance_user_not_voted_description]: `You can {link}.`,
  [Message.WCT_WAVES_pair_DEX_link_text]: `buy WCT at DEX`,
  [Message.voting_processing_title]: `Saving score`,
  [Message.voting_processing_description]: `To save the score, please, approve the transaction in Waves Keeper.`,
  [Message.voting_success_title]: `Score saved`,
  [Message.voting_success_description]: ( 
    `
    Your score will be applied after 24 hours. Rating in processing.
    
    Please keep the current WCT tokens in the account during this time.
    
    {link}.
  `),
  [Message.show_in_explorer_link_text]: `Show in explorer`,
  [Message.voting_error_title]: `Score not set`,
  [Message.voting_error_description]: `Please try again.`,
  [Message.voting_instruction]: `To rate a token, you must have at least 1 WCT in your wallet. Tokens are not transferred, only on existing balance is required for voting.our score will be applied after 24 hours. Please keep the current tokens in the account during this time.`,
  [Message.voting_title]: `Click to rate token`,
  [Message.voting_submit_button]: `Rate`,
  [Message.voting_market_info_title]: `Market information`,
  [Message.voting_general_info_title]: `General Information`,
  [Message.voting_token_price]: `Price`,
  [Message.voting_token_capitalization]: `Cap`,
  [Message.voting_token_id]: `ID`,
  [Message.voting_token_name]: `Name`,
  [Message.voting_token_amount]: `Total amount`,
  [Message.voting_token_precision]: `Decimal points`,
  [Message.voting_token_type]: `Type`,
  [Message.voting_token_type_reissuable]: `Reissuable`,
  [Message.voting_token_type_not_reissuable]: `Not reissuable`,
  [Message.voting_token_issuer]: `Issuer`,
  [Message.voting_token_block]: `Block`,
  [Message.voting_token_issue_date]: `Issue date`,
  [Message.voting_token_description]: `Description`,
  
  [Message.faq_token_rating_description_question]: `What is Waves Token Rating?`,
  [Message.faq_token_rating_description_answer]: `
    Waves Token Rating is a service that provides ratings for tokens (projects) issued on the Waves platform. Ratings are based on opinions of community members (WCT token holders) on a specific token.
  `,
  [Message.faq_token_is_not_listed_question]: `Why is a token not included in the rating table?`,
  [Message.faq_token_is_not_listed_answer]: `
    The rating features only tokens that have been rated at least once. You can find tokens that haven’t been rated yet by searching for a name, ticker or token ID.

    Also, pay attention to which filter you have selected. With the All tokens filter, all tokens are displayed. With the Top 20 filter, only tokens surpassing a minimum rating and number of votes, are displayed.
  `,
  [Message.faq_token_voting_process_question]: `How do you rate a token?`,
  [Message.faq_token_voting_process_answer]: `
    Tokens can be rated from desktop browsers only. In mobile browsers, only display of ratings is available. To be able to rate a token, you need Waves Keeper to be installed in your browser and have a balance of at least 1 WCT. Tokens are not transferred, only on existing balance is required for voting. Each vote is weighted according to the number of WCT in your balance.
  
    To rate a token, select it in the ratings table or in the search bar, then on the token page click on 1 to 5 stars. Then, click the Rate button and sign the transaction using Waves Keeper - your vote will be applied after 24 hours.
  `,
  [Message.faq_token_rating_calculation_time_question]: `Why has the rating for a token that I have rated not changed?`,
  [Message.faq_token_rating_calculation_time_answer]: `
    After you vote, you will need to wait 24 hours before your rating is applied. During this time, a new rating is calculated.
    
    If no one has yet rated a token, then after you vote it will listed in the ratings table, but without a value, until the rating is calculated.
  `,
  [Message.faq_token_rating_calculation_question]: `How is the rating calculated?`,
  [Message.faq_token_rating_calculation_answer]: `
    The rating consists of two parameters: score and weight.

    The score is the number of stars that you selected. You can rate the token from 1 to 5.

    The weight of your score is calculated using a special formula and depends on the number of WCT tokens in your balance, which impacts the final weight of the score in a non-linear way.

    In order for all your WCT tokens to be taken into account when calculating the vote’s weight, keep their balance in the account unchanged for 24 hours after you rate the token. All WCT spending operations reduce the effective balance, impacting your vote’s weight.

    The current token rating is the average of user ratings.
  `,
  [Message.faq_token_revoting_question]: `Can I rate the token several times?`,
  [Message.faq_token_revoting_answer]: `
    You can rate a token from each address only once. If you have already rated the selected token, you will see your previous score on the token page. In this case, you can change your score if you rate this token again. Your previous score will be canceled, and the new one will be applied.
  `,
  [Message.faq_documentation_link]: `Learn more about Waves Token Rating on Waves Docs`,

  [Message.page_404_text_title]: `Something's missing`,
  [Message.page_404_text_description]: `The page you are looking for is not found`,
  [Message.page_404_main_page_button]: `Back to home`,

  [Message.copy_notification_message]: `Copied`,

  [Message.vote_unit_tokens_type_filter]: `By WCT`,
  [Message.vote_unit_votes_type_filter]: `By votes`,
  [Message.top_badge]: `TOP 20`,
};

export default translations;
