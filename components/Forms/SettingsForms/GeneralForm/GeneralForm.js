import styles from './GeneralFrom.module.scss'
import { Formik, Form, Field } from "formik"
import { Row, Col } from "react-bootstrap"
import * as Yup from 'yup';
import { years, countries, countriesOfRegAd, countriesOfReg, gender } from '../../../CommonUtils/CommonUtils';
import { useSelector } from 'react-redux';
import { useWindowDimensions } from '../../../CommonUtils/useWindowDimensions';

const SignupSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
    email: Yup.string().email('Invalid email'),
});

export default function GeneralForm() {
    const user = useSelector(state => state.user)
    const isMobile = useWindowDimensions().width <= 425

    return (
        <Formik
            initialValues={{
                lastName: user.lastName,
                firstName: user.firstName,
                email: user.email,
                gender: user.gender,
                years: user.yearsOfGraduation,
                countries: user.countriesQualified,
                countriesOfReg: user.countryReg,
                countriesOfRegAd: user.addCountryReg,

            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
                console.log(values)
            }}
        >
            {
                (props) => (

                    <Form className='form-settings-general'>
                        {isMobile ? (
                            <>
                                <Row className={styles.commonRow}>
                                    <Col>

                                        <div className="field-wrapper">
                                            <Field
                                                className="field"
                                                component="input"
                                                name="firstName"
                                            />
                                            <span>First Name</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className={styles.commonRow}>
                                    <Col>
                                        <div className="field-wrapper">
                                            <Field
                                                className="field"
                                                component="input"
                                                name="lastName"
                                            />
                                            <span>Last Name</span>
                                        </div>
                                    </Col>
                                </Row>
                            </>

                        ) : (
                            <Row className={styles.commonRow}>
                                <Col>

                                    <div className="field-wrapper">
                                        <Field
                                            className="field"
                                            component="input"
                                            name="firstName"
                                        />
                                        <span>First Name</span>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="field-wrapper">
                                        <Field
                                            className="field"
                                            component="input"
                                            name="lastName"
                                        />
                                        <span>Last Name</span>
                                    </div>
                                </Col>
                            </Row>
                        )}
                        <Row className={styles.commonRow}>
                            <Col>
                                <div className="field-wrapper">
                                    <Field
                                        className="field field_select"
                                        component="select"
                                        name="profession"
                                    >
                                        {gender.map((item, index) => <option value={item} key={`${index}__signUp-gender`} >{item}</option>)}
                                    </Field>
                                    <span>Gender</span>
                                </div>
                            </Col>
                        </Row>
                        <Row className={styles.commonRow}>
                            <Col>
                                <div className="field-wrapper">
                                    <Field
                                        className="field"
                                        type="email"
                                        name="email"
                                    />
                                    <span>Email address</span>
                                </div>
                            </Col>
                        </Row>
                        <Row className={styles.commonRow}>
                            <Col>
                                <div className="field-wrapper">
                                    <Field
                                        className="field field_select"
                                        component="select"
                                        name="years"
                                    >
                                        {years.map((item, index) => <option value={item} key={`${index}__signUp-years`} >{item}</option>)}
                                    </Field>
                                    <span>Year of Graduation</span>
                                </div>
                            </Col>
                        </Row>
                        <Row className={styles.commonRow}>
                            <Col>
                                <div className="field-wrapper">
                                    <Field
                                        className="field field_select"
                                        component="select"
                                        name="countries"
                                    >
                                        {countries.map((item, index) => <option value={item} key={`${index}__signUp-counries`} >{item}</option>)}
                                    </Field>
                                    <span>Country where you Qualified</span>
                                </div>
                            </Col>
                        </Row>
                        {isMobile ? (
                            <>
                                <Row className={styles.commonRow}>
                                    <Col>
                                        <div className="field-wrapper">
                                            <Field
                                                className="field field_select"
                                                component="select"
                                                name="countriesOfReg"
                                            >
                                                {countriesOfReg.map((item, index) => <option value={item} key={`${index}__signUp-counriesOfReg`} >{item}</option>)}
                                            </Field>
                                            <span>Country of Registration</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className={styles.commonRow}>
                                    <Col>
                                        <div className="field-wrapper">
                                            <Field
                                                className="field field_select"
                                                component="select"
                                                name="countriesOfRegAd"
                                            >
                                                {countriesOfRegAd.map((item, index) => <option value={item} key={`${index}__signUp-counriesOfRegAd`} >{item}</option>)}
                                            </Field>
                                            <span>Additional Country of Registration</span>
                                        </div>
                                    </Col>
                                </Row>
                            </>) : (
                            <Row className={styles.commonRow}>
                                <Col>
                                    <div className="field-wrapper">
                                        <Field
                                            className="field field_select"
                                            component="select"
                                            name="countriesOfReg"
                                        >
                                            {countriesOfReg.map((item, index) => <option value={item} key={`${index}__signUp-counriesOfReg`} >{item}</option>)}
                                        </Field>
                                        <span>Country of Registration</span>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="field-wrapper">
                                        <Field
                                            className="field field_select"
                                            component="select"
                                            name="countriesOfRegAd"
                                        >
                                            {countriesOfRegAd.map((item, index) => <option value={item} key={`${index}__signUp-counriesOfRegAd`} >{item}</option>)}
                                        </Field>
                                        <span>Additional Country of Registration</span>
                                    </div>
                                </Col>
                            </Row>)}

                        <Row >
                            <Col>
                                <button type='submit' className='form-settings-general__submitBtn'>Save Changes</button>
                            </Col>
                        </Row>
                    </Form>
                )
            }

        </Formik >
    )
}