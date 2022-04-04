import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";
import MainContent from "../../components/Layout/MainContent/MainContent";
import RightSidebar from "../../components/Layout/RightSidebar/RightSidebar";
import * as Yup from 'yup';
import { useRouter } from 'next/router'
import { Formik, Form, Field } from "formik"
import { Row, Col } from "react-bootstrap"
import { state } from "../../components/CommonUtils/CommonUtils";
import useProfessions from "../../components/Hooks/useProfessions";
import { SelectField } from "../../components/Forms/SpecialFields/SelectField";
import api from '../../apiConfig'
import Swal from 'sweetalert2'
import { DataSuggestionField } from "../../components/Forms/SpecialFields/DataSuggestionField";
import { useRef, useEffect, useMemo } from 'react'
import debounce from 'lodash.debounce'
import isEmpty from 'lodash.isempty'
import { FieldTitle } from "../../components/Forms/SpecialFields/FieldTitle";
import useCurrencies from "../../components/Hooks/useCurrencies";
import { useState } from 'react'

const SignupSchema = Yup.object().shape({
    jobTitle: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    jobDesc: Yup.string().min(3, 'Too Short!').required('Required'),
    country: Yup.object().shape({
        value: Yup.string().required('Required')
    }),
    city: Yup.object().shape({
        value: Yup.string().required('Required')
    }),
    address: Yup.string().min(3, 'Too Short!').max(200, 'Too Long!').required('Required'),
    profession: Yup.object().shape({
        id: Yup.number().required('!'),
    }),
    currency: Yup.object().shape({
        id: Yup.number().required('Required'),
    }),
    hourlyMin: Yup.number().min(1, '!'),
    hourlyMax: Yup.number().min(1, '!'),
    annualMin: Yup.number().min(1, ''),
    annualMax: Yup.number().min(1, '!'),
});



export default function EmployerPostJob() {
    //if this form uses for editing
    const router = useRouter()
    const { id } = router.query //here id - id of vacancy we want to edit

    const formik = useRef()
    const professionsOpt = useProfessions()
    const currencyOpt = useCurrencies()

    const debouncedValidate = useMemo(
        () => debounce(() => formik.current?.validateForm, 500),
        [formik],
    );


    const [initialValues, setInitialValues] = useState({
        jobTitle: '',
        jobDesc: '',
        country: {},
        city: {},
        state: 'test', //NEED TO CHANGE
        address: '',
        profession: {},
        currency: currencyOpt[0],
        hourlyMin: 1,
        hourlyMax: 2,
        annualMin: 1,
        annualMax: 2,
    })
    useEffect(() => {
        if (!router.isReady) { return }
        else {
            if (id) {
                //значит мы хотим отредактировать вакансию, загружаем ее
                api.get(`/api/v1/vacancies/${id}`).then((r) => {
                    const recievedData = r.data.data
                    setInitialValues({
                        jobTitle: recievedData.title,
                        jobDesc: recievedData.description,
                        country: { value: recievedData.country },
                        city: { value: recievedData.city },
                        state: 'test', //NEED TO CHANGE
                        address: recievedData.address,
                        profession: professionsOpt.find((profession) => recievedData.profession.id == profession.id),
                        currency: currencyOpt.find((currency) => recievedData.currency.id == currency.id),
                        hourlyMin: recievedData.hourly_min_pay,
                        hourlyMax: recievedData.hourly_max_pay,
                        annualMin: recievedData.annual_min_pay,
                        annualMax: recievedData.annual_max_pay,
                    })
                })
            }
            debouncedValidate(formik.current?.values);
        }

    }, [router.isReady, professionsOpt, currencyOpt, formik.current?.values, debouncedValidate]);


    return (
        <>
            <Header />
            <div className="page page-employer page-employer_postJob">
                <Formik
                    innerRef={formik}
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={SignupSchema}
                    validateOnMount={true}
                    validateOnChange={false}
                    onSubmit={(values, { resetForm }) => {

                        let sentData = {
                            "title": values.jobTitle,
                            "description": values.jobDesc,
                            "country": values.country.data.country,
                            "city": values.city.data.city,
                            "state": values.state,
                            "address": values.address,
                            "profession_id": values.profession.id,
                            "hourly_min_pay": values.hourlyMin,
                            "hourly_max_pay": values.hourlyMax,
                            "annual_min_pay": values.annualMin,
                            "annual_max_pay": values.annualMax,
                            "currency_id": values.currency.id,
                            "status": "opened",
                            "active": "1",
                        }
                        if (!id) {
                            //create new
                            api.post('/api/v1/vacancies', sentData).then(r => {
                                if (r.status == 200) {
                                    Swal.fire(
                                        'Job was created!',
                                        'Success!',
                                        'success'
                                    )
                                    resetForm();
                                }

                            }).catch(err => {
                                Swal.fire(
                                    'Oops..',
                                    `Sorry, something went wrong, please, try again`,
                                    'error'
                                )
                            })
                        }
                        else {
                            //update
                            api.put(`/api/v1/vacancies/${id}`, sentData).then(r => {
                                Swal.fire(
                                    'Job was updated!',
                                    'Success!',
                                    'success'
                                )

                            }).catch(err => {
                                Swal.fire(
                                    'Oops..',
                                    `Sorry, something went wrong, please, try again`,
                                    'error'
                                )
                            })
                        }

                    }}
                >
                    {
                        ({ values, errors, touched }) => (
                            <Form className='form-postJob'>
                                <div className="form-postJob__header">
                                    {id ? "Edit Job" : "Create Job"}
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
                                                        <FieldTitle name="jobTitle">Job Title</FieldTitle>
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
                                                        <FieldTitle name="jobDesc">Job Description</FieldTitle>
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
                                                            {...(!isEmpty(values.profession)) ? { defaultValue: values.profession } : {}}
                                                        />

                                                        <FieldTitle name="profession" additionalLevel="id">Profesional Qualification you are looking for</FieldTitle>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className="form-postJob__row form-postJob__row_general salary">
                                                <Col><FieldTitle name="currency" additionalLevel="id">Salary in currency</FieldTitle></Col>
                                                <Col>
                                                    <div className="field-wrapper">
                                                        <SelectField
                                                            name="currency"
                                                            required
                                                            options={currencyOpt}
                                                            {...(!isEmpty(values.currency)) ? { defaultValue: values.currency } : {}}

                                                        />

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
                                                                    min={1}
                                                                    name="hourlyMin"
                                                                />
                                                                <FieldTitle name="hourlyMin">Min</FieldTitle>
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            <div className="field-wrapper">
                                                                <Field
                                                                    required
                                                                    className="field"
                                                                    type="number"
                                                                    min={1}
                                                                    name="hourlyMax"
                                                                />
                                                                <FieldTitle name="hourlyMax">Max</FieldTitle>
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
                                                                    min={1}
                                                                    name="annualMin"
                                                                />
                                                                <FieldTitle name="annualMin">Min</FieldTitle>
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            <div className="field-wrapper">
                                                                <Field
                                                                    required
                                                                    className="field"
                                                                    type="number"
                                                                    min={1}
                                                                    name="annualMax"
                                                                />
                                                                <FieldTitle name="annualMax">Max</FieldTitle>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>

                                    </RightSidebar>
                                </Layout>
                                <div className="form-postJob__submit-wrapper"><button type='submit' className='form-postJob__submitBtn' {...(isEmpty(errors) ? {} : { disabled: true })}>Post</button></div>
                            </Form>
                        )
                    }
                </Formik>

            </div>
        </>
    )
}
