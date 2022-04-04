import styles from './GeneralFrom.module.scss'
import { Formik, Form, Field } from "formik"
import { Row, Col } from "react-bootstrap"
import * as Yup from 'yup';
import { years, countries, countriesOfRegAd, countriesOfReg, gender } from '../../../CommonUtils/CommonUtils';
import { useWindowDimensions } from '../../../Hooks/useWindowDimensions';
import api from '../../../../apiConfig'
import Swal from 'sweetalert2'
import { SelectField } from '../../SpecialFields/SelectField'

import Loader from '../../../Loader/Loader'

const SignupSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
    email: Yup.string().email('Invalid email'),
});

export default function GeneralForm({ user }) {
    const isMobile = useWindowDimensions().width <= 425
    if (!user) {
        return <div className='form-settings-general'> <Loader /> </div>
    }
    return (
        <Formik
            initialValues={{
                lastName: user.last_name,
                firstName: user.name,
                email: user.email,
                gender: user.gender,
                company: user.company,
                years: user.years,
                country: user.country || '',
                countriesOfReg: user.country_of_reg || '',
                countriesOfRegAd: user.country_of_reg.add || '',

            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
                let sentData = {
                    "id": user.id,
                    "name": values.firstName,
                    "last_name": values.lastName,
                    "email": values.email,
                    "type": user.type,
                    "gender": values.gender,
                    "company": values.company,

                }
                api.put('/api/v1/user/update/current', sentData).then(r => {

                    Swal.fire(
                        'Data was updated!',
                        'Success!',
                        'success'
                    )

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
                                            <FieldTitle name="lastName">Last Name</FieldTitle>
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
                                    <SelectField
                                        name="gender"
                                        options={gender}
                                    />
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
                        {user.type == 'hiring' &&
                            <Row className={styles.commonRow}>
                                <Col>
                                    <div className="field-wrapper">
                                        <Field
                                            className="field"
                                            type="text"
                                            name="company"
                                        />
                                        <span>Company</span>
                                    </div>
                                </Col>
                            </Row>
                        }
                        <Row className={styles.commonRow}>
                            <Col>
                                <div className="field-wrapper">
                                    <Field
                                        className="field field_select"
                                        component="select"
                                        name="years"
                                    >
                                        {years.map((item, index) => <option value={item} key={`${index}__signUp-years`} >{item.value}</option>)}
                                    </Field>
                                    <span>Year of Graduation</span>
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
                                    <FieldTitle name="country" additionalLevel="value">Country where you Qualified</FieldTitle>
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