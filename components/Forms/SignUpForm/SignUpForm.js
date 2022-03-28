import styles from './SignUpForm.module.scss'
import { Formik, Form, Field } from "formik"
import { Row, Col } from "react-bootstrap"
import * as Yup from 'yup';
import PasswordShowHide from '../SpecialFields/PasswordShowHide';
import EmployeeForm from './EmployeeForm';
import EmployerForm from './EmployerForm';
import { useDispatch, useSelector } from 'react-redux';
import useProfessions from '../../Hooks/useProfessions'
import { handleRegistration } from '../../../redux/actions';
import moment from 'moment';
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
const ISSERVER = typeof window === "undefined";

const SignupSchema = Yup.object().shape({
    firstName: Yup.string().min(5, 'Too Short!').max(120, 'Too Long!').required('Required'),
    lastName: Yup.string().min(5, 'Too Short!').max(120, 'Too Long!').required('Required'),
    company: Yup.string().min(3, 'Too Short!').max(220, 'Too Long!').when("purpose", {
        is: 'hiring',
        then: Yup.string().required("Required")
    }),
    email: Yup.string().email('Invalid email').required('Email is required'),
    emailConfirmation: Yup.string().required('Please, confirm email').test('email-match', 'Emails must match', function (value) { return this.parent.email === value }),
    password: Yup.string().required('Password is required'),
    passwordConfirmation: Yup.string().test('password-match', 'Passwords must match', function (value) { return this.parent.password === value }),

});


export default function SignUpForm() {
    //redux 
    const dispatch = useDispatch()
    //-----
    const router = useRouter()

    const professionOpt = useProfessions()
    return (
        <Formik
            initialValues={{
                purpose: 'hiring',
                lastName: '',
                firstName: '',
                email: '',
                emailConfirmation: '',
                profession: '',
                professionMulti: [],
                company: '',
                passwordConfirmation: '',
                password: '',
                agreement: '',
                gender: 'Male',
                years: '2000',
                countries: '',
                countriesOfReg: '',
                countriesOfRegAd: '',
                availFrom: moment()

            }}
            validationSchema={SignupSchema}
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
                        Swal.fire(
                            'Oops..',
                            `Sorry, something went wrong, please, try again`,
                            'error'
                        )
                    })

            }}
        >
            {
                (props) => (
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

                        {props.values.purpose == 'hiring' ? <EmployerForm styles={styles} professionOpt={professionOpt} /> : <EmployeeForm styles={styles} professionOpt={professionOpt} />}

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