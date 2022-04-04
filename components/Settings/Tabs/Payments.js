import { Row, Col } from "react-bootstrap"
import styles from '../../Forms/SettingsForms/GeneralForm/GeneralFrom.module.scss';
import Select from 'react-select'
import { customSelectStyles } from "../../CommonUtils/CommonUtils"
import { DropdownIndicator } from "../../CommonUtils/DropdownIndicator"
import BinIcon from '../../../assets/img/icons/bin.svg'
import { useState } from 'react'
import { Formik, Form, Field } from "formik"
import * as Yup from 'yup';
import { FieldTitle } from '../../Forms/SpecialFields/FieldTitle'
import { DatePickerField } from '../../CommonUtils/CustomDatepicker'
import { DataSuggestionField } from "../../Forms/SpecialFields/DataSuggestionField";
import { PhoneField } from "../../Forms/SpecialFields/PhoneField";



const SignupSchemaAddPayment = Yup.object().shape({
    cardNumber: Yup.number().required('Required'),
    cardHolder: Yup.string().required('Required'),
    expirationDate: Yup.string().nullable().required('Required'),
    cvc: Yup.string().min(3, 'Too short').required('Required'),

});
const SignupSchemaPayPal = Yup.object().shape({
    accountHolderName: Yup.string().required('Required'),
    phone: Yup.string().required('Required'),
    country: Yup.object().shape({
        value: Yup.string().required('Required')
    }),
});


export default function SettingsPaymentsTab({ title, user }) {
    const paymentSelectOpt = [
        { id: 0, label: 'Add payment method', value: 'apm' },
        { id: 1, label: 'Add PayPal', value: 'app' },
    ]
    const [paymentMethods, setPaymentMethods] = useState([
        { id: 0, img: '/images/visa.svg', title: 'Visa', description: 'Ending in 2098', status: 'Primary' },
        { id: 1, img: '/images/paypal.svg', title: 'PayPal', description: 'mail.paypal@mail.com', status: '' },
    ])
    const [paymentTab, setPaymentTab] = useState('main')
    const handleChangeMethod = (val) => {
        setPaymentTab(val.value)
    }
    const handleSetAsPrimary = (methodId) => {
        //
    }
    const handleDeletePaymentMethod = (methodId) => {
        setPaymentMethods(paymentMethods.filter(({ id }) => id !== methodId))
    }
    switch (paymentTab) {
        //add PayPal
        case 'app':
            return <>
                <div className="settings-tab-header">
                    {title}
                </div>
                <div className="settings-tab-content payments payments-addCreditCard">
                    <div className="miniTitle">Add PayPal</div>
                    <Formik
                        initialValues={{
                            accountHolderName: '',
                            phone: '+1',
                            country: '',
                        }}
                        validationSchema={SignupSchemaPayPal}
                        onSubmit={(values) => {
                            console.log(values)
                        }}
                    >
                        {
                            (props) => (
                                <Form className='form-settings-security'>
                                    <Row className={styles.commonRow}>
                                        <Col>
                                            <div className="field-wrapper">
                                                <Field
                                                    className="field"
                                                    component="input"
                                                    name="accountHolderName"
                                                />
                                                <FieldTitle name="accountHolderName"
                                                >Account Holder Name</FieldTitle>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className={styles.commonRow}>
                                        <Col>
                                            <div className="field-wrapper">
                                                <PhoneField
                                                    name="phone"
                                                    fieldTitle="Phone"
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className={styles.commonRow}>
                                        <Col>
                                            <div className="field-wrapper">
                                                <DataSuggestionField
                                                    name="country"
                                                    filterFromBound="country"
                                                    firstAddressField
                                                />
                                                <FieldTitle name="country" additionalLevel="value"
                                                >Country</FieldTitle>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className={styles.commonRow}>
                                        <Col>
                                            By clicking “Continue” you will be directed to PayPal to authenticate the account and choose any available options.
                                        </Col>
                                    </Row>

                                    <Row >
                                        <Col>
                                            <button type='submit' className='form-settings-professionCoverLetter__submitBtn' >Continue</button>
                                        </Col>
                                        <Col>
                                            <button type='submit' className='form-settings-professionCoverLetter__submitBtn cancelBtn' onClick={() => setPaymentTab('main')}>Cancel</button>
                                        </Col>
                                    </Row>
                                </Form>
                            )
                        }

                    </Formik >
                </div>
            </>

        //add payment method
        case 'apm':
            return (
                <>
                    <div className="settings-tab-header">
                        {title}
                    </div>
                    <div className="settings-tab-content payments payments-addCreditCard">
                        <div className="miniTitle">Add Credit Card</div>
                        <Formik
                            initialValues={{
                                cardNumber: '',
                                cardHolder: '',
                                expirationDate: '',
                                cvc: '',

                            }}
                            validationSchema={SignupSchemaAddPayment}
                            onSubmit={(values) => {
                                console.log(values)
                            }}
                        >
                            {
                                (props) => (
                                    <Form className='form-settings-security'>
                                        <Row className={styles.commonRow}>
                                            <Col>
                                                <div className="field-wrapper">
                                                    <input
                                                        className="field field_numeric"
                                                        type="number"
                                                        onChange={props.handleChange}
                                                        onBlur={props.handleBlur}
                                                        value={props.values.cardNumber}
                                                        name="cardNumber"
                                                        autocomplete="cc-number"
                                                    />
                                                    <FieldTitle name="cardNumber"
                                                    >Card Number</FieldTitle>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className={styles.commonRow}>
                                            <Col>
                                                <div className="field-wrapper">
                                                    <Field
                                                        className="field"
                                                        component="input"
                                                        name="cardHolder"
                                                        autocomplete="cc-name"
                                                    />
                                                    <FieldTitle name="cardHolder"
                                                    >Card Holder Name</FieldTitle>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className={styles.commonRow}>
                                            <Col>
                                                <div className="field-wrapper">
                                                    <DatePickerField
                                                        name="expirationDate"
                                                        dateFormat="MM/yyyy"
                                                        placeholderText="MM/YYYY"
                                                        showMonthYearPicker
                                                        autocomplete="cc-exp"
                                                    />
                                                    <FieldTitle name="expirationDate"
                                                    >Expiration Date</FieldTitle>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="field-wrapper">
                                                    <Field
                                                        className="field"
                                                        component="input"
                                                        type="password"
                                                        name="cvc"
                                                        maxlength={3}
                                                        autocomplete="cc-csc"
                                                    />
                                                    <FieldTitle name="cvc"
                                                    >CVC/CVV</FieldTitle>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className={styles.commonRow}>
                                            <Col>
                                                For verification purposes we will charge your card a random amount of up to $3.95. You will need to enter the exact amount on Guru.com to verify your card.
                                            </Col>
                                        </Row>

                                        <Row >
                                            <Col>
                                                <button type='submit' className='form-settings-professionCoverLetter__submitBtn' >Add Card</button>
                                            </Col>
                                            <Col>
                                                <button type='submit' className='form-settings-professionCoverLetter__submitBtn cancelBtn' onClick={() => setPaymentTab('main')}>Cancel</button>
                                            </Col>
                                        </Row>
                                    </Form>
                                )
                            }

                        </Formik >
                    </div>
                </>
            )

        default:
            return (
                <>
                    <div className="settings-tab-header">
                        {title}
                    </div>
                    <div className="settings-tab-content payments">
                        <Row className={styles.commonRow}>
                            <Col>
                                <p>You have 27 evaluation days remaining.</p>
                                <p>After that you will bill $0.15/job or course to apply</p>
                                <p>We will auto bill to your payment method when it researches 50 jobs/courses apply</p>
                            </Col>
                        </Row>
                        <Row className={`payments__selectRow`}>
                            <Col>Payments methods</Col>
                            <Col>
                                <Select
                                    styles={customSelectStyles}
                                    options={paymentSelectOpt}
                                    onChange={handleChangeMethod}
                                    inputProps={{ autoComplete: 'random-string', autoFill: 'off' }}
                                    components={{ DropdownIndicator }}
                                    responsive={{
                                        xsmall: {
                                            display: 'bottom',
                                            touchUi: true
                                        },
                                        small: {
                                            display: 'bottom',
                                            touchUi: true
                                        },

                                    }} />
                            </Col>
                        </Row>
                        <div className="payments-methods">
                            {paymentMethods.map((itm, index) => {
                                return (
                                    <div className="payments-methods__row" key={`method-row__${itm.title}`}>
                                        <div className="payments-methods__col payments-methods__col_image" style={{ backgroundImage: `url(${itm.img})` }}></div>
                                        <div className="payments-methods__col payments-methods__col_title-description">
                                            <span>{itm.title}</span>
                                            <span>{itm.description}</span>
                                        </div>
                                        <div className="payments-methods__col payments-methods__col_status">
                                            {itm.status == 'Primary' ?
                                                <span className="payment-status_primary">Primary</span>
                                                :
                                                <button type="button" className="payment-status_secondary" onClick={() => handleSetAsPrimary(itm.id)}>Set as Primary</button>
                                            }
                                        </div>
                                        <div className="payments-methods__col payments-methods__col_delete">
                                            <button type="button" onClick={() => handleDeletePaymentMethod(itm.id)}><BinIcon width={20} /></button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </>
            )
            break;
    }

}