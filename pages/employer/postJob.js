import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";
import MainContent from "../../components/Layout/MainContent/MainContent";
import RightSidebar from "../../components/Layout/RightSidebar/RightSidebar";
import * as Yup from 'yup';
import { Formik, Form, Field } from "formik"
import { Row, Col } from "react-bootstrap"
import { city, countries, currency, state } from "../../components/CommonUtils/CommonUtils";
import useProfessions from "../../components/Hooks/useProfessions";
import { SelectField } from "../../components/Forms/SpecialFields/SelectField";
import api from '../../apiConfig'
import Swal from 'sweetalert2'

const SignupSchema = Yup.object().shape({
    jobTitle: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required(),

});

export default function EmployerPostJob() {
    const professionsOpt = useProfessions()

    return (
        <>
            <Header />
            <div className="page page-employer page-employer_postJob">
                <Formik
                    initialValues={{
                        jobTitle: '',
                        jobDesc: '',
                        countries: '',
                        city: '',
                        state: '',
                        address: '',
                        profession: '',
                        currency: 'USD',
                        hourlyMin: 1,
                        hourlyMax: 2,
                        annualMin: 1,
                        annualMax: 2,
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values, { resetForm }) => {
                        let sentData = {
                            "title": values.jobTitle,
                            "description": values.jobDesc,
                            "address": values.address,
                            "profession_id": values.profession.id,
                            "hourly_min_pay": values.hourlyMin,
                            "hourly_max_pay": values.hourlyMax,
                            "annual_min_pay": values.annualMin,
                            "annual_max_pay": values.annualMax,
                            "currency_id": 1,
                            "active": 1, //0 - active, 1 - hide (??? , но сделано так)
                        }
                        api.post('/api/v1/vacancies', sentData).then(r => {
                            if (r.status == 200) {
                                Swal.fire(
                                    'Course was created!',
                                    'Success!',
                                    'success'
                                )
                                resetForm();
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
                            <Form className='form-postJob'>
                                <div className="form-postJob__header">
                                    Create Job
                                </div>
                                <Layout>

                                    <MainContent>
                                        <div className="leftPartForm">
                                            <div className="form-postJob__card-header">
                                                Job Information
                                            </div>
                                            <Row className="form-postJob__row">
                                                <Col>

                                                    <div className="field-wrapper">
                                                        <Field
                                                            required
                                                            className="field"
                                                            component="input"
                                                            name="jobTitle"
                                                        />
                                                        <span>Job Title</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className="form-postJob__row">
                                                <Col>
                                                    <div className="field-wrapper field-wrapper_textarea">
                                                        <Field
                                                            required
                                                            className="field field_textarea"
                                                            component="textarea"
                                                            name="jobDesc"
                                                            placeholder="..."
                                                        />
                                                        <span>Job Description</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </MainContent>
                                    <RightSidebar>
                                        <div className="rightPartForm">
                                            <div className="form-postJob__card-header">
                                                Location Settings
                                            </div>
                                            <Row className="form-postJob__row">
                                                <Col>

                                                    <div className="field-wrapper">
                                                        <Field
                                                            required
                                                            className="field field_select"
                                                            component="select"
                                                            name="countries"
                                                        >
                                                            {countries.map((item, index) => <option value={item} key={`${index}__postJob-counries`} >{item}</option>)}
                                                        </Field>
                                                        <span>Country</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className="form-postJob__row">
                                                <Col>
                                                    <div className="field-wrapper">
                                                        <Field
                                                            required
                                                            className="field field_select"
                                                            component="select"
                                                            name="state"
                                                        >
                                                            {state.map((item, index) => <option value={item} key={`${index}__postJob-state`} >{item}</option>)}
                                                        </Field>
                                                        <span>State</span>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className="field-wrapper">
                                                        <Field
                                                            required
                                                            className="field field_select"
                                                            component="select"
                                                            name="city"
                                                        >
                                                            {city.map((item, index) => <option value={item} key={`${index}__postJob-city`} >{item}</option>)}
                                                        </Field>
                                                        <span>City</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className="form-postJob__row">
                                                <Col>

                                                    <div className="field-wrapper">
                                                        <Field
                                                            required
                                                            className="field"
                                                            component="input"
                                                            name="address"
                                                        />
                                                        <span>Address</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>

                                        <div className="rightPartForm">
                                            <div className="form-postJob__card-header">
                                                General Settings
                                            </div>
                                            <Row className="form-postJob__row">
                                                <Col>
                                                    <div className="field-wrapper">
                                                        <SelectField
                                                            name="profession"
                                                            required
                                                            options={professionsOpt}
                                                        />
                                                        <span>Profesional Qualification you are looking for</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className="form-postJob__row form-postJob__row_general salary">
                                                <Col>Salary in currency</Col>
                                                <Col>
                                                    <div className="field-wrapper">
                                                        <Field
                                                            required
                                                            className="field field_select"
                                                            component="select"
                                                            name="currency"
                                                        >
                                                            {currency.map((item, index) => <option value={item} key={`${index}__postJob-currency`} >{item}</option>)}
                                                        </Field>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className="form-postJob__row form-postJob__row_general salary">
                                                <Col>Hourly</Col>
                                                <Col>
                                                    <Row>
                                                        <Col>
                                                            <div className="field-wrapper">
                                                                <Field
                                                                    required
                                                                    className="field"
                                                                    type="number"
                                                                    min={0}
                                                                    name="hourlyMin"
                                                                />
                                                                <span>Min</span>
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            <div className="field-wrapper">
                                                                <Field
                                                                    required
                                                                    className="field"
                                                                    type="number"
                                                                    min={0}
                                                                    name="hourlyMax"
                                                                />
                                                                <span>Max</span>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Row className="form-postJob__row form-postJob__row_general salary">
                                                <Col>Annual</Col>
                                                <Col>
                                                    <Row>
                                                        <Col>
                                                            <div className="field-wrapper">
                                                                <Field
                                                                    required
                                                                    className="field"
                                                                    type="number"
                                                                    min={0}
                                                                    name="annualMin"
                                                                />
                                                                <span>Min</span>
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            <div className="field-wrapper">
                                                                <Field
                                                                    required
                                                                    className="field"
                                                                    type="number"
                                                                    min={0}
                                                                    name="annualMax"
                                                                />
                                                                <span>Max</span>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>

                                    </RightSidebar>
                                </Layout>
                                <div className="form-postJob__submit-wrapper"><button type='submit' className='form-postJob__submitBtn'>Post</button></div>
                            </Form>
                        )
                    }
                </Formik>

            </div>
        </>
    )
}
