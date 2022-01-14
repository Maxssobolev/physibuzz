import styles from './SignUpForm.module.scss'
import { Formik, Form, Field } from "formik"
import { Row, Col } from "react-bootstrap"
import * as Yup from 'yup';
import { useState } from 'react';
import PasswordShowHide from '../SpecialFields/PasswordShowHide';
import EmployeeForm from './EmployeeForm';
import EmployerForm from './EmployerForm';

const SignupSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    emailConfirmation: Yup.string().required('Please, confirm email').test('email-match', 'Emails must match', function (value) { return this.parent.email === value }),
    password: Yup.string().required('Password is required'),
    passwordConfirmation: Yup.string().test('password-match', 'Passwords must match', function (value) { return this.parent.password === value }),

});


export default function SignUpForm() {
    const [profession, setProfession] = useState(["Skin Specialist"])

    return (
        <Formik
            initialValues={{
                purpose: 'Im hiring',
                lastName: '',
                firstName: '',
                email: '',
                emailConfirmation: '',
                profession: profession[0],
                company: '',
                passwordConfirmation: '',
                password: '',
                agreement: '',
                gender: 'Male',
                years: '2000',
                counries: '',
                counriesOfReg: '',
                counriesOfRegAd: '',
                availFrom: 'None',

            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
                console.log(values)
            }}
        >
            {
                (props) => (
                    <Form>

                        <Row className={`radio ${styles.radioRow}`} >
                            <Col>
                                <label className="flex flex_align-center">
                                    <Field type="radio" name='purpose' value='Im hiring' />
                                    <span>I'm hiring</span>
                                </label>
                            </Col>
                            <Col style={{
                                width: 'max-content',
                                flex: 'initial'
                            }}>
                                <label className="flex flex_align-center">
                                    <Field type="radio" name='purpose' value='Im looking for job or courses' />
                                    <span>I'm looking for job or courses</span>
                                </label>
                            </Col>
                        </Row>

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

                        {props.values.purpose == 'Im hiring' ? <EmployerForm styles={styles} profession={profession} /> : <EmployeeForm styles={styles} profession={profession} />}

                        <Row className={styles.commonRow}>
                            <Col>
                                <div className="field-wrapper">
                                    <Field
                                        component={PasswordShowHide}
                                        name="password"
                                    />
                                    <span>Password</span>
                                </div>
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                <div className="field-wrapper">
                                    <Field
                                        component={PasswordShowHide}
                                        name="passwordConfirmation"
                                    />
                                    <span>Confirm Password</span>
                                </div>
                            </Col>
                        </Row>
                        <Row className={styles.checkboxRow}>
                            <Col>
                                <label>
                                    <Field
                                        required
                                        type="checkbox"
                                        name="agreement"
                                        className="checkbox"
                                    />
                                    <span>I agree to the licence agreement and GDPR policy</span>
                                </label>
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                <button type='submit' className='form-signUp__submitBtn'>Sign Up</button>
                            </Col>
                        </Row>
                    </Form>
                )
            }

        </Formik >
    )
}