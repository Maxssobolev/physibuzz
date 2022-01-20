import styles from '../GeneralForm/GeneralFrom.module.scss';
import PasswordShowHide from '../../SpecialFields/PasswordShowHide';
import { Formik, Form, Field } from "formik"
import { Row, Col } from "react-bootstrap"
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    newPass: Yup.string().required('Password is required'),
    newPassConfirmation: Yup.string().test('password-match', 'Passwords must match', function (value) { return this.parent.newPass === value }),

});

export default function SecurityForm() {

    return (
        <Formik
            initialValues={{
                oldPass: '',
                newPass: '',
                newPassConfirmation: ''

            }}
            validationSchema={SignupSchema}
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
                                        component={PasswordShowHide}
                                        name="oldPass"
                                    />
                                    <span>Type your old password</span>
                                </div>
                            </Col>
                        </Row>
                        <Row className={styles.commonRow}>
                            <Col>
                                <div className="field-wrapper">
                                    <Field
                                        component={PasswordShowHide}
                                        name="newPass"
                                    />
                                    <span>New Password</span>
                                </div>
                            </Col>
                        </Row>
                        <Row className={styles.commonRow}>
                            <Col>
                                <div className="field-wrapper">
                                    <Field
                                        component={PasswordShowHide}
                                        name="newPassConfirmation"
                                    />
                                    <span>Confirm new password</span>
                                </div>
                            </Col>
                        </Row>

                        <Row >
                            <Col>
                                <button type='submit' className='form-settings-professionCoverLetter__submitBtn'>Save Changes</button>
                            </Col>
                        </Row>
                    </Form>
                )
            }

        </Formik >
    )
}