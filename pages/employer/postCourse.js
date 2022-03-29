import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";
import MainContent from "../../components/Layout/MainContent/MainContent";
import RightSidebar from "../../components/Layout/RightSidebar/RightSidebar";
import * as Yup from 'yup';
import { Formik, Form, Field } from "formik"
import { Row, Col } from "react-bootstrap"
import { state } from "../../components/CommonUtils/CommonUtils";
import api from '../../apiConfig'
import { SelectField } from "../../components/Forms/SpecialFields/SelectField";
import Swal from 'sweetalert2'
import useProfessions from "../../components/Hooks/useProfessions";
import { DataSuggestionField } from "../../components/Forms/SpecialFields/DataSuggestionField";
import { useRef, useEffect, useMemo } from 'react'
import debounce from 'lodash.debounce'
import isEmpty from 'lodash.isempty'
import { FieldTitle } from "../../components/Forms/SpecialFields/FieldTitle";

const SignupSchema = Yup.object().shape({
    courseTitle: Yup.string().min(3, 'Too Short!').max(200, 'Too Long!').required('Required'),
    courseDesc: Yup.string().min(3, 'Too Short!').required('Required'),
    address: Yup.string().min(3, 'Too Short!').max(200, 'Too Long!').required('Required'),
    cost1: Yup.number().min(1, 'Too Small!'),
    cost2: Yup.number().min(1, 'Too Small!'),
    country: Yup.object().shape({
        value: Yup.string().required('Required')
    }),
    city: Yup.object().shape({
        value: Yup.string().required('Required')
    }),
    profession: Yup.object().shape({
        id: Yup.number().required('Required'),
    })
});


export default function EmployerPostCourse() {
    const formik = useRef()
    const professionsOpt = useProfessions()

    const debouncedValidate = useMemo(
        () => debounce(() => formik.current?.validateForm, 500),
        [formik],
    );

    useEffect(() => {
        debouncedValidate(formik.current?.values);
    }, [formik.current?.values, debouncedValidate]);
    return (
        <>
            <Header />
            <div className="page page-employer page-employer_postJob">
                <Formik
                    innerRef={formik}
                    initialValues={{
                        courseTitle: '',
                        courseDesc: '',
                        country: {},
                        city: {},
                        state: '',
                        address: '',
                        profession: {},
                        cost1: 1,
                        cost2: 1,

                    }}
                    validationSchema={SignupSchema}
                    validateOnMount={true}
                    validateOnChange={false}
                    onSubmit={(values, { resetForm }) => {
                        let sentData = {
                            "title": values.courseTitle,
                            "description": values.courseDesc,
                            "address": values.address,
                            "country": values.country,
                            "city": values.city,
                            "state": values.state,
                            "profession_id": values.profession.id,
                            "min_pay": values.cost1,
                            "max_pay": values.cost2,
                            "currency_id": 1,
                            "active": 1, //0 - active, 1 - hide (??? , но сделано так)
                        }
                        api.post('/api/v1/courses', sentData).then(r => {
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
                        ({ values, errors, touched }) => (
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
                                                        <FieldTitle name='courseTitle'>Course Title</FieldTitle>
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
                                                        <FieldTitle name="courseDesc">Course Description</FieldTitle>
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
                                                        <DataSuggestionField
                                                            name="country"
                                                            filterFromBound="country"
                                                            firstAddressField
                                                        />

                                                        <FieldTitle name="country" additionalLevel="value">Country</FieldTitle>
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
                                                        <FieldTitle name="state">State</FieldTitle>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className="field-wrapper">
                                                        <DataSuggestionField
                                                            name="city"
                                                            filterFromBound="city"
                                                            //сделал так, чтобы поиск был только внутри страны, выбранной в предыдущем селекте
                                                            //поле неактивно до заполнения страны
                                                            findIn={values.country?.data?.country_iso_code}
                                                        />
                                                        <FieldTitle name="city" additionalLevel="value">City</FieldTitle>
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
                                                        <FieldTitle name="address">Address</FieldTitle>
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
                                                        <FieldTitle name="profession" additionalLevel="id">Suitable for</FieldTitle>
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
                                                            min={1}
                                                            name="cost1"
                                                        />
                                                        <FieldTitle name="cost1">Cost 1</FieldTitle>
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
                                                            min={1}
                                                            name="cost2"
                                                        />
                                                        <FieldTitle name="cost2">Cost 2</FieldTitle>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>

                                    </RightSidebar>
                                </Layout>
                                <div className="form-postJob__submit-wrapper">
                                    <button
                                        type='submit'
                                        className='form-postJob__submitBtn'
                                        {...(isEmpty(errors) ? {} : { disabled: true })}
                                    >
                                        Post
                                    </button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>

            </div>
        </>
    )
}
