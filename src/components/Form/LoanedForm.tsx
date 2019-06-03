import React from 'react';
import styles from './styles.scss';

export default class LoanedForm extends React.Component {
    render(): React.ReactNode {
        return <div className={styles.root}>
            <div className={styles.header1Font}>Loan managment details</div>


            <div className={styles.loanField}>
                <div className={styles.loan_section}>
                    <div className={styles.loanField_row}>
                        You have on your account
                        <div className={styles.rateFont}>
                            <b className={styles.rateCount}>{0}</b> &nbsp;
                            <div className={styles.rateFont_waves}>WAVES</div>
                            &nbsp;/ &nbsp;<b className={styles.rateCount}>{0}</b> &nbsp;
                            <div className={styles.rateFont_btc}>BTC</div>
                        </div>
                    </div>
                </div>

                <div className={styles.loan_section}>
                    <div className={styles.loanField_row}>
                        <div className={styles.flex}>Your rate <div className={styles.rateHelpIcn}/></div>
                        <div className={styles.rateFont}>
                            <b className={styles.rateCount}>{0}</b> &nbsp;
                            <div className={styles.rateFont_waves}>WAVES</div>
                            &nbsp;/ &nbsp;<b className={styles.rateCount}>{0}</b> &nbsp;
                            <div className={styles.rateFont_btc}>BTC</div>
                        </div>
                    </div>
                    <div className={styles.loanField_row}>
                        Grace days left (blocks)
                        <b className={styles.rateCount}>{0}</b>
                    </div>
                    <div className={styles.loanField_row}>
                        Curent interest ammount
                        <div className={styles.rateFont}>
                            <b className={styles.rateCount}>{0}</b> &nbsp;
                            <div className={styles.rateFont_waves}>WAVES</div>
                            &nbsp;/ Day
                        </div>
                    </div>
                </div>

                <div className={styles.loan_section}>
                    <div className={styles.loanField_row}>
                        You paid
                        <div className={styles.rateFont}>
                            <b className={styles.rateCount}>{0}</b> &nbsp;
                            <div className={styles.rateFont_waves}>WAVES</div>
                        </div>
                    </div>
                    <div className={styles.loanField_row}>
                        You borrowed
                        <div className={styles.rateFont}>
                            <b className={styles.rateCount}>{0}</b> &nbsp;
                            <div className={styles.rateFont_btc}>BTC</div>
                        </div>
                    </div>
                    <div className={styles.loanField_row}>
                        You get back now
                        <div className={styles.rateFont}>
                            <b className={styles.rateCount}>{0}</b> &nbsp;
                            <div className={styles.rateFont_waves}>WAVES</div>
                        </div>
                    </div>
                </div>

            </div>
            <button className={styles.returnBtn}>Return a loan</button>
        </div>;
    }
}
