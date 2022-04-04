import styles from '../GeneralForm/GeneralFrom.module.scss';
import PasswordShowHide from '../../SpecialFields/PasswordShowHide';
import { Formik, Form, Field } from "formik"
import { Row, Col } from "react-bootstrap"
import * as Yup from 'yup';
import Loader from '../../../Loader/Loader'
import { FieldTitle } from '../../SpecialFields/FieldTitle';
import isEmpty from 'lodash.isempty';
import api from '../../../../apiConfig'
const SignupSchema = Yup.object().shape({
    oldPass: Yup.string().required('Required'),
    newPass: Yup.string().required('Required'),
    newPassConfirmation: Yup.string().test('password-match', 'Passwords must match', function (value) { return this.parent.newPass === value }),
});

export default function SecurityForm({ user }) {
    if (!user) {

        return <div className='form-settings-general'> <Loader /> </div>
    }
    return (
        <Formik
            initialValues={{
                oldPass: '',
                newPass: '',
                newPassConfirmation: ''

            }}
            validationSchema={SignupSchema}
            validateOnMount
            onSubmit={(values) => {
                api.post('api/v1/user/reset-password', {
                    "email": user.email,
                    "password": values.newPass,
                    "confirm_password": values.newPassConfirmation,
                })
            }}
        >
            {
                ({ errors, ...props }) => (
                    <Form className='form-settings-security'>
                        <Row className={styles.commonRow}>
                            <Col>
                                <div className="field-wrapper">
                                    <Field
                                        component={PasswordShowHide}
                                        name="oldPass"
                                    />
                                    <FieldTitle name="oldPass">Type your old password</FieldTitle>
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
                                    <FieldTitle name="newPass">New Password</FieldTitle>
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
                                    <FieldTitle name="newPassConfirmation">Confirm new password</FieldTitle>
                                </div>
                            </Col>
                        </Row>

                        <Row >
                            <Col>
                                <button type='submit' disabled={!isEmpty(errors)} className='form-settings-professionCoverLetter__submitBtn'>Save Changes</button>
                            </Col>
                        </Row>
                    </Form>
                )
            }

        </Formik >
    )
}