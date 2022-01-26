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
    courseTitle: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required(),
});

export default function EmployerPostCourse() {
    return (
        <>
            <Header variant={LOGGEDIN_EMPLOYER} />
            <div className="page page-employer page-employer_postJob">
                <Formik
                    initialValues={{
                        courseTitle: '',
                        courseDesc: '',
                        countries: '',
                        city: '',
                        state: '',
                        address: '',
                        profession: profession[0],
                        cost1: 0,
                        cost2: 0,

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
                                    Create Course
                                </div>
                                <Layout>

                                    <MainContent>
                                        <div className="leftPartForm">
                                            <div className="form-postJob__card-header">
                                                Course Information
                                            </div>
                                            <Row className="form-postJob__row">
                                                <Col>

                                                    <div className="field-wrapper">
                                                        <Field
                                                            required
                                                            className="field"
                                                            component="input"
                                                            name="courseTitle"
                                                        />
                                                        <span>Course Title</span>
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
                                                            name="courseDesc"
                                                            placeholder="..."
                                                        />
                                                        <span>Course Description</span>
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
                                                        <span>Suitable for</span>
                                                    </div>
                                                </Col>
                                            </Row>

                                            <Row className="form-postJob__row">
                                                <Col>

                                                    <div className="field-wrapper">
                                                        <Field
                                                            required
                                                            className="field"
                                                            type="number"
                                                            min={0}
                                                            name="cost1"
                                                        />
                                                        <span>Cost 1</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className="form-postJob__row">
                                                <Col>

                                                    <div className="field-wrapper">
                                                        <Field
                                                            required
                                                            className="field"
                                                            type="number"
                                                            min={0}
                                                            name="cost2"
                                                        />
                                                        <span>Cost 2</span>
                                                    </div>
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
