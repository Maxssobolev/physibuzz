import styles from './SignUpForm.module.scss'
import { Formik, Form, Field } from "formik"
import { Row, Col } from "react-bootstrap"
import * as Yup from 'yup';
import PasswordShowHide from '../SpecialFields/PasswordShowHide';
import EmployeeForm from './EmployeeForm';
import EmployerForm from './EmployerForm';
import { useDispatch } from 'react-redux';
import useProfessions from '../../Hooks/useProfessions'
import { handleRegistration } from '../../../redux/actions';
import moment from 'moment';
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { FieldTitle } from '../SpecialFields/FieldTitle'
import debounce from 'lodash.debounce'
import isEmpty from 'lodash.isempty'
import { useRef, useEffect, useMemo } from 'react'
Yup.setLocale({
    mixed: {
        defined: 'Add at least one',
    },
});
const ISSERVER = typeof window === "undefined";

const SignupSchema = Yup.object().shape({
    //common
    firstName: Yup.string().min(5, 'Too Short!').max(120, 'Too Long!').required('Required'),
    lastName: Yup.string().min(5, 'Too Short!').max(120, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    emailConfirmation: Yup.string().required('Emails must match').test('email-match', 'Emails must match', function (value) { return this.parent.email === value }),
    password: Yup.string().min(6, 'Min 6 charactres').required('Password is required'),
    passwordConfirmation: Yup.string().test('password-match', 'Passwords must match', function (value) { return this.parent.password === value }),
    agreement: Yup.bool().oneOf([true], 'Required'),

    //hiring
    company: Yup.string().when("purpose", {
        is: 'hiring',
        then: Yup.string().min(3, 'Too Short!').max(220, 'Too Long!').required("Required")
    }),
    profession: Yup.object().when("purpose", {
        is: 'hiring',
        then: Yup.object().shape({
            value: Yup.string().required('Required'),
        })
    }),

    //candidate
    gender: Yup.object().when("purpose", {
        is: 'candidate',
        then: Yup.object().shape({
            value: Yup.string().required('Required'),
        }),
    }),
    years: Yup.object().when("purpose", {
        is: 'candidate',
        then: Yup.object().shape({
            value: Yup.string().required('Required'),
        }),
    }),

    country: Yup.object().when("purpose", {
        is: 'candidate',
        then: Yup.object().shape({
            value: Yup.string().required('Required'),
        }),
    }),
    countriesOfReg: Yup.object().when("purpose", {
        is: 'candidate',
        then: Yup.object().shape({
            value: Yup.string().required('Required'),
        }),
    }),

    professionMulti: Yup.array().when("purpose", {
        is: 'candidate',
        then: Yup.array().defined('Add at least one').of(
            Yup.object().shape({
                value: Yup.string().required('Required'),

            })
        )
    }),
});


export default function SignUpForm() {


    //redux 
    const dispatch = useDispatch()
    //-----
    const router = useRouter()


    const formik = useRef()
    const professionOpt = useProfessions()

    const debouncedValidate = useMemo(
        () => debounce(() => formik.current?.validateForm, 500),
        [formik],
    );

    useEffect(() => {
        debouncedValidate(formik.current?.values);
    }, [professionOpt, formik.current?.values, debouncedValidate]);

    return (
        <Formik
            innerRef={formik}
            initialValues={{
                purpose: 'hiring',
                lastName: '',
                firstName: '',
                email: '',
                emailConfirmation: '',
                profession: '',
                professionMulti: '',
                company: '',
                passwordConfirmation: '',
                password: '',
                agreement: '',
                gender: '',
                years: '',
                country: '',
                countriesOfReg: '',
                countriesOfRegAd: '',
                availFrom: moment()

            }}
            validationSchema={SignupSchema}
            validateOnMount={true}
            validateOnChange={false}
            onSubmit={(values) => {
                dispatch(handleRegistration(values, values.purpose))
                    .then(res => {

                        //if registration success
                        if (!ISSERVER) {
                            localStorage.setItem("userToken", res.token);
                            localStorage.setItem("userType", res.type);
                            localStorage.setItem("userName", res.userName);

                            Swal.fire(
                                'You have successfully registered!',
                                '',
                                'success'
                            ).then(() => {
                                router.push('/')
                            })

                        }
                    })
                    .catch(err => {
                        console.log(err)
                        Swal.fire(
                            'Oops..',
                            `Sorry, something went wrong, please, try again`,
                            'error'
                        )
                    })

            }}
        >
            {
                ({ values, errors, touched }) => (
                    <Form>

                        <Row className={`radio ${styles.radioRow}`} >
                            <Col>
                                <label className="flex flex_align-center">
                                    <Field type="radio" name='purpose' value='hiring' />
                                    <span>I'm hiring</span>
                                </label>
                            </Col>
                            <Col style={{
                                width: 'max-content',
                                flex: 'initial'
                            }}>
                                <label className="flex flex_align-center">
                                    <Field type="radio" name='purpose' value='candidate' />
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
                                    <FieldTitle name="firstName">First Name</FieldTitle>
                                </div>
                            </Col>
                            <Col>
                                <div className="field-wrapper">
                                    <Field
                                        className="field"
                                        component="input"
                                        name="lastName"
                                    />
                                    <FieldTitle name="lastName">Last Name</FieldTitle>
                                </div>
                            </Col>
                        </Row>

                        {values.purpose == 'hiring' ? <EmployerForm styles={styles} professionOpt={professionOpt} /> : <EmployeeForm styles={styles} professionOpt={professionOpt} />}

                        <Row className={styles.commonRow}>
                            <Col>
                                <div className="field-wrapper">
                                    <Field
                                        component={PasswordShowHide}
                                        name="password"
                                    />
                                    <FieldTitle name="password">Password</FieldTitle>
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
                                    <FieldTitle name="passwordConfirmation">Confirm Password</FieldTitle>
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
                                    <FieldTitle name="agreement">I agree to the licence agreement and GDPR policy</FieldTitle>
                                </label>
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                <button type='submit' disabled={!isEmpty(errors)} className='form-signUp__submitBtn'>Sign Up</button>
                            </Col>
                        </Row>
                    </Form>
                )
            }

        </Formik >
    )
}