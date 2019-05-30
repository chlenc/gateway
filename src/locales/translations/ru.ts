import { Message } from '../messages';

const translations = {
  [Message.filter_top]: `Лучшие 20`,
  [Message.filter_default]: `Все токены`,
  [Message.mainpage_empty_text]: `Нет данных`,
  [Message.mainpage_table_token_name]: `Название`,
  [Message.mainpage_table_rating]: `Рейтинг`,
  [Message.mainpage_table_price]: `Цена`,
  [Message.mainpage_table_averageScore_text]: `из 5 звезд`,
  [Message.mainpage_table_total_tokens]: `Всего WCT проголосовало`,
  [Message.mainpage_table_total_tokens_mobile]: `всего WCT`,
  [Message.mainpage_table_total_votes]: `Всего проголосовало`,
  [Message.mainpage_table_total_votes_mobile]: `всего голосов`,
  [Message.mainpage_table_amount]: `Общее количество`,
  [Message.search_input_placeholder]: `Введите ID, название или тикер токена`,
  [Message.search_unvoted_token]: `Нет оценки`,
  [Message.mainpage_table_rating_status]: `Обработка...`,
  [Message.validation_warning_mobile_version_is_not_supported_title]: `Для выставления оценки используйте десктопные версии браузеров`,
  [Message.validation_warning_mobile_version_is_not_supported_description]: `Для выставления оценки используйте сервис в десктопных версиях браузеров Google Chrome, Mozilla Firefox, Opera или Microsoft Edge с установленным Waves Keeper.`,
  [Message.validation_warning_not_voted_title]: `Оценок пока нет`,
  [Message.validation_warning_not_voted_description]: `Вы можете оценить первым!`,
  [Message.validation_warning_rating_is_not_calculated_title]: `Здесь скоро будет рейтинг!`,
  [Message.validation_warning_rating_is_not_calculated_description]: `В обработке...`,
  [Message.validation_warning_token_was_voted_title]: `Вы уже голосовали`,
  [Message.validation_warning_token_was_voted_description]: `
    Вы можете сменить свою оценку.
    
    Ваша прошлая оценка {score}.
  `,
  [Message.validation_error_waves_keeper_is_not_supported_by_browser_title]: `Ваш браузер не позволяет выставить оценку`,
  [Message.validation_error_waves_keeper_is_not_supported_by_browser_description]: `Для выставления оценки используйте Google Chrome, Mozilla Firefox, Opera или Microsoft Edge с установленным Waves Keeper.`,
  [Message.validation_error_waves_keeper_is_not_installed_title]: `Мы обнаружили, что у вас не установлен Waves Keeper`,
  [Message.validation_error_waves_keeper_is_not_installed_description]: `Для выставления оценки вам также понадобится наличие как минимум 1 WCT на балансе. {installationLink}. Когда расширение будет установлено, обновите эту страницу в браузере. {refreshLink}.`,
  [Message.waves_keeper_installation_link_text]: `Установить Waves Keeper`,
  [Message.waves_keeper_refresh_link_text]: `Обновить`,
  [Message.validation_error_application_is_not_authorized_in_waves_keeper_title]: `WavesKeeper`,
  [Message.validation_error_application_is_not_authorized_in_waves_keeper_description]: `Пожалуйста, авторизуйте сервис в Waves Keeper.`,
  [Message.validation_error_waves_keeper_is_empty_title]: `WavesKeeper`,
  [Message.validation_error_waves_keeper_is_empty_description]: `Добавьте аккаунт в Waves Keeper.`,
  [Message.validation_error_waves_keeper_is_locked_title]: `Пожалуйста, авторизуйтесь`,
  [Message.validation_error_waves_keeper_is_locked_description]: `Для выставления оценки, пожалуйста, авторизуйтесь в Waves Keeper.`,
  [Message.validation_error_waves_keeper_wrong_network_title]: `Смените сеть`,
  [Message.validation_error_waves_keeper_wrong_network_description]: `Выбранный аккаунт находится в другой сети. Измените сеть в Waves Keeper, затем повторите попытку.`,
  [Message.validation_error_waves_keeper_not_enough_balance_title]: `Недостаточно WCT`,
  [Message.validation_error_waves_keeper_not_enough_balance_description]: `Для выставления оценки необходимо иметь в кошельке как минимум 1 WCT. Токены остаются у вас, для голосования необходимо лишь их наличие.`,
  [Message.validation_error_waves_keeper_not_enough_balance_user_not_voted_title]: `Недостаточно WCT`,
  [Message.validation_error_waves_keeper_not_enough_balance_user_not_voted_description]: `Вы можете {link}.`,
  [Message.WCT_WAVES_pair_DEX_link_text]: `купить WCT в DEX`,
  [Message.voting_processing_title]: `Сохраняем оценку`,
  [Message.voting_processing_description]: `Для сохранения оценки подтвердите транзакцию в Waves Keeper.`,
  [Message.voting_success_title]: `Оценка сохранена`,
  [Message.voting_success_description]: `
    Ваша оценка будет учтена через 24 часа. Оценка в обработке.
    
    Пожалуйста, сохраняйте текущее количество токенов WCT на счету в течение этого времени.
    
    {link}.
  `,
  [Message.show_in_explorer_link_text]: `Показать в explorer`,
  [Message.voting_error_title]: `Оценка не выставлена`,
  [Message.voting_error_description]: `Пожалуйста попробуйте еще раз.`,
  [Message.voting_instruction]: `Для выставления оценки необходимо иметь в кошельке как минимум 1 WCT. Токены остаются у вас, для голосования необходимо лишь их наличие. Ваша оценка будет учтена через 24 часа. Пожалуйста, сохраняйте текущее количество токенов на счету в течение этого времени.`,
  [Message.voting_title]: `Нажмите, чтобы оценить токен`,
  [Message.voting_submit_button]: `Оценить`,
  [Message.voting_market_info_title]: `Рыночная информация`,
  [Message.voting_general_info_title]: `Основная информация`,
  [Message.voting_token_price]: `Цена`,
  [Message.voting_token_capitalization]: `Капитализация`,
  [Message.voting_token_id]: `ID`,
  [Message.voting_token_name]: `Название`,
  [Message.voting_token_amount]: `Всего выпущено`,
  [Message.voting_token_precision]: `Знаков после запятой`,
  [Message.voting_token_type]: `Тип`,
  [Message.voting_token_type_reissuable]: `Перевыпускаемый`,
  [Message.voting_token_type_not_reissuable]: `Не перевыпускаемый`,
  [Message.voting_token_issuer]: `Эмитент`,
  [Message.voting_token_block]: `Блок`,
  [Message.voting_token_issue_date]: `Дата выпуска`,
  [Message.voting_token_description]: `Описание`,

  [Message.faq_token_rating_description_question]: `Что такое Waves Token Rating?`,
  [Message.faq_token_rating_description_answer]: `
    Waves Token Rating - сервис, предоставляющий рейтинг токенов (проектов), выпущенных на платформе Waves. Рейтинг формируется на основе мнений участников сообщества (держателей токена WCT) о конкретном токене.
  `,
  [Message.faq_token_is_not_listed_question]: `Почему токена нет в списке рейтинга?`,
  [Message.faq_token_is_not_listed_answer]: `
    В рейтинге присутствуют токены, которые получили хотя бы одну оценку. Токены, еще не получившие оценок, можно найти через поиск, указав название, тикер или ID токена.

    Также обратите внимание, на то, какой фильтр у вас выбран. При фильтре Все токены отображаются все токены, а при Лучшие 20 - только токены с рейтингом и количеством оценок выше определенного порога.
  `,
  [Message.faq_token_voting_process_question]: `Как оценить токен?`,
  [Message.faq_token_voting_process_answer]: `
    Оценивать токены можно только из десктопных версий браузеров. Для мобильных версий доступен только просмотр рейтингов. Вы можете выставить оценку токену, если в браузере установлен Waves Keeper и на балансе есть как минимум 1 WCT. При этом токены не списываются, их количество на момент голосования влияет на “вес” оценки.
    
    Чтобы оценить токен, выберите его в таблице рейтинга или найдите через поиск, затем на карточке токена укажите количество звезд от 1 до 5, нажмите кнопку “Оценить” и подпишите транзакцию с помощью Waves Keeper. Ваша оценка будет учтена в течение 24 часов.
  `,
  [Message.faq_token_rating_calculation_time_question]: `Почему рейтинг токена, который я оценил, не изменился?`,
  [Message.faq_token_rating_calculation_time_answer]: `
    После выставления оценки должно пройти 24 часа, прежде чем ваша оценка будет учтена. За это время происходит расчет оценки.
    
    Если токен ещё никто не оценивал, то после выставления оценки он появится в таблице рейтинга, но без рейтинга, до того момента, пока оценка не будет рассчитана.
  `,
  [Message.faq_token_rating_calculation_question]: `Как рассчитывается рейтинг?`,
  [Message.faq_token_rating_calculation_answer]: `
    Рейтинг состоит из двух параметров: оценка и вес.
    
    Оценка - это то количество звезд, которое вы указали. Вы можете оценить токен от 1 до 5.
    
    Вес вашей оценки рассчитывается по специальной формуле и зависит от количества токенов WCT на балансе, которое нелинейно влияет на итоговый вес оценки.
    
    Чтобы все ваши токены WCT были учтены при расчете веса, сохраняйте неизменным их количество на счете в течение 24 часов после выставления оценки. Все расходные операции WCT уменьшают эффективный баланс, который влияет на вес.
    
    Текущий рейтинг токена представляет собой мгновенное среднее значение оценок, выставленных пользователями.
  `,
  [Message.faq_token_revoting_question]: `Можно ли оценить токен несколько раз?`,
  [Message.faq_token_revoting_answer]: `
    Оценить токен с одного адреса можно только один раз. Если вы ранее уже оценивали выбранный токен, то на карточке токена вы увидите свою предыдущую оценку. В этом случае вы можете изменить ее, проголосовав повторно. Предыдущая оценка будет аннулирована, а новая - учтена.
  `,
  [Message.faq_documentation_link]: `Узнать больше о Waves Token Raiting на Waves Docs`,

  [Message.page_404_text_title]: `Что-то пошло не так`,
  [Message.page_404_text_description]: `Страница, которую вы ищете, не найдена`,
  [Message.page_404_main_page_button]: `Вернуться на главную`,

  [Message.copy_notification_message]: `Cкопировано`,

  [Message.vote_unit_tokens_type_filter]: `WCT`,
  [Message.vote_unit_votes_type_filter]: `Оценок`,

  [Message.top_badge]: `ЛУЧШИЕ 20`,
};

export default translations;
