import Header from "../../components/Header/Header";
import { LOGGEDIN_EMPLOYER } from "../../components/Header/HeadersVariants";
import Layout from "../../components/Layout/Layout";
import LeftSidebar from "../../components/Layout/LeftSidebar/LeftSidebar";
import MainContent from "../../components/Layout/MainContent/MainContent";
import RightSidebar from "../../components/Layout/RightSidebar/RightSidebar";
import * as Yup from 'yup';
import { Formik, Form, Field } from "formik"
import { Row, Col } from "react-bootstrap"
import { city, countries, currency, profession, state } from "../../components/CommonUtils/CommonUtils";

const SignupSchema = Yup.object().shape({
    jobTitle: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required(),

});

export default function EmployerPostJob() {
    return (
        <>
            <Header variant={LOGGEDIN_EMPLOYER} />
            <div className="page page-employer page-employer_postJob">
                <Formik
                    initialValues={{
                        jobTitle: '',
                        jobDesc: '',
                        countries: '',
                        city: '',
                        state: '',
                        address: '',
                        profession: profession[0],
                        currency: 'USD',
                        hourlyMin: 10,
                        hourlyMax: 20,
                        annualMin: 10,
                        annualMax: 20,
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values) => {
                        console.log(values)
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
                                                        <Field
                                                            required
                                                            className="field field_select"
                                                            component="select"
                                                            name="profession"
                                                        >
                                                            {profession.map((item, index) => <option value={item} key={`${index}__postJob-professions`} >{item}</option>)}
                                                        </Field>
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
