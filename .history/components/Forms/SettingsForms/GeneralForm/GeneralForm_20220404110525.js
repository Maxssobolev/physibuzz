import styles from './GeneralFrom.module.scss'
import { Formik, Form, Field } from "formik"
import { Row, Col } from "react-bootstrap"
import * as Yup from 'yup';
import { years, countries, countriesOfRegAd, countriesOfReg, gender } from '../../../CommonUtils/CommonUtils';
import { useWindowDimensions } from '../../../Hooks/useWindowDimensions';
import isEmpty from 'lodash.isempty'
import api from '../../../../apiConfig'
import Swal from 'sweetalert2'
import { SelectField } from '../../SpecialFields/SelectField'
import { DataSuggestionField } from '../../SpecialFields/DataSuggestionField'
import { FieldTitle } from '../../SpecialFields/FieldTitle'
import Loader from '../../../Loader/Loader'
import moment from 'moment'
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
                countriesOfRegAd: user.country_of_reg_add || '',

            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
                let profIds = []
                user.professions.forEach(profession => {
                    profIds.push(profession.id)
                })
                let sentData = {
                    "type": user.type,
                    "id": user.id,
                    "name": values.firstName,
                    "last_name": values.lastName,
                    "email": values.email,
                    'birthday': moment(new Date()).format('YYYY-MM-DD HH:MM:S'),
                    "gender": values.gender.value || 'male',
                    //"company": values.company,
                    "available_from": user.available_from,
                    "profession_id": profIds,
                    "years": values.years?.value,
                    "country": values.country?.value,
                    "country_of_reg": values.countriesOfReg?.value,
                    "country_of_reg_add": values.countriesOfRegAd?.value,

                }
                api.put('/api/v1/user/update/current', sentData).then(r => {

                    Swal.fire(
                        'Data was updated!',
                        'Success!',
                        'success'
                    )

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
                ({ values }) => (

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
                        )}
                        {user.type == 'candidate' && <Row className={styles.commonRow}>
                            <Col>
                                <div className="field-wrapper">
                                    <SelectField
                                        name="gender"
                                        options={gender}
                                    />
                                    <FieldTitle name="gender" additionalLevel='value'>Gender</FieldTitle>
                                </div>
                            </Col>
                        </Row>}
                        <Row className={styles.commonRow}>
                            <Col>
                                <div className="field-wrapper">
                                    <Field
                                        className="field"
                                        type="email"
                                        name="email"
                                    />
                                    <FieldTitle name="email">Email address</FieldTitle>
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
                                        <FieldTitle name="company">Company</FieldTitle>
                                    </div>
                                </Col>
                            </Row>
                        }
                        {user.type == 'candidate' && <Row className={styles.commonRow}>
                            <Col>
                                <div className="field-wrapper">
                                    <SelectField
                                        name="years"

                                        options={years}
                                        {...(!isEmpty(values.years)) ? { defaultValue: values.years } : {}}
                                    />
                                    <FieldTitle name="years" additionalLevel="value">Year of Graduation</FieldTitle>
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
                        }
                        {isMobile ? (
                            <>
                                <Row className={styles.commonRow}>
                                    <Col>
                                        <div className="field-wrapper">

                                            <DataSuggestionField
                                                name="countriesOfReg"
                                                filterFromBound="country"
                                                firstAddressField
                                            />
                                            <FieldTitle name="countriesOfReg" additionalLevel="value">Country of Registration</FieldTitle>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className={styles.commonRow}>
                                    <Col>
                                        <div className="field-wrapper">

                                            <DataSuggestionField
                                                name="countriesOfRegAd"
                                                filterFromBound="country"
                                                firstAddressField
                                            />
                                            <FieldTitle name="countriesOfRegAd" additionalLevel="value">Additional Country of Registration</FieldTitle>

                                        </div>
                                    </Col>
                                </Row>
                            </>) : (
                            <Row className={styles.commonRow}>
                                <Col>
                                    <div className="field-wrapper">
                                        <DataSuggestionField
                                            name="countriesOfReg"
                                            filterFromBound="country"
                                            firstAddressField
                                        />
                                        <FieldTitle name="countriesOfReg" additionalLevel="value">Country of Registration</FieldTitle>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="field-wrapper">
                                        <DataSuggestionField
                                            name="countriesOfRegAd"
                                            filterFromBound="country"
                                            firstAddressField
                                        />
                                        <FieldTitle name="countriesOfRegAd" additionalLevel="value">Additional Country of Registration</FieldTitle>
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