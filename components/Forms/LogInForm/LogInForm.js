import ReCAPTCHA from "react-google-recaptcha";
import React from "react";
import styles from './LogInForm.module.scss';
import { Formik, Form, Field } from "formik";
import { Row, Col, Alert } from "react-bootstrap";
import * as Yup from 'yup';
import PasswordShowHide from '../SpecialFields/PasswordShowHide';
import Link from "next/link";
import { useWindowDimensions } from "../../CommonUtils/useWindowDimensions";
import { handleLogin } from "../../../redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    recaptcha: Yup.string().required(),
});

const ISSERVER = typeof window === "undefined";


export default function LogInForm() {
    //redux 
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    //-----

    const router = useRouter()

    const recaptchaRef = React.createRef();

    const isMobile = useWindowDimensions().width <= 425


    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                rememberMe: '',
                recaptcha: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={({ email, password, rememberMe }) => {
                const recaptchaValue = recaptchaRef.current.getValue();

                if (recaptchaValue) {
                    dispatch(
                        handleLogin(email, password, rememberMe)
                    )
                        .then(res => {

                            if (res) {
                                //if login success
                                if (!ISSERVER) {
                                    localStorage.setItem("userToken", res.token);
                                    localStorage.setItem("userType", res.type);
                                    router.push('/')
                                }

                            }

                        })
                }
            }}
        >
            {
                (props) => (
                    <Form>

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

                        <Row className={!user.error && styles.commonRow}>
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

                        {user.error &&
                            <Row>
                                <Alert variant="warning" className={styles.errorRow}>
                                    {user.error}
                                </Alert>
                            </Row>
                        }

                        <Row className={styles.checkboxRow}>
                            <Col>
                                <label>
                                    <Field

                                        type="checkbox"
                                        name="rememberMe"
                                        className="checkbox"
                                    />
                                    <span>Remember me</span>
                                </label>
                            </Col>
                        </Row>
                        <Row className={styles.submitBtn}>
                            <Col>
                                <button type='submit' className='form-signUp__submitBtn'>Log In</button>
                            </Col>
                        </Row>
                        <Row className={styles.adds}>
                            <Col style={{
                                flex: '2 0'
                            }}>
                                New Employeer? <Link href='/signUp'>SIGN UP HERE</Link>
                            </Col>
                            <Col>
                                <Link href='/'>Forgot Password?</Link>
                            </Col>
                        </Row>
                        <ReCAPTCHA
                            className={styles.recaptcha}
                            ref={recaptchaRef}
                            size={isMobile ? 'compact' : 'normal'}
                            sitekey="6LcaXiUeAAAAAJ5Sc6Jo5XQbgVASWwuzS7qtkv39"
                            onChange={(value) => props.setFieldValue("recaptcha", value)}
                        />
                    </Form>
                )
            }

        </Formik >
    )
}