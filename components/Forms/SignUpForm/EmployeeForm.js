import React from 'react'

import { Field } from "formik"
import { Row, Col } from "react-bootstrap"
import { years, countries, countriesOfRegAd, countriesOfReg, gender } from "../../CommonUtils/CommonUtils"
import { DatePickerField } from '../../CommonUtils/CustomDatepicker'
import { SelectField } from '../SpecialFields/SelectField'
//форма соискателей
function EmployeeForm({ styles, professionOpt }) {

    return (
        <>
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
            <Row className={styles.commonRow}>
                <Col>
                    <div className="field-wrapper">
                        <Field
                            className="field"
                            type="email"
                            name="emailConfirmation"
                        />
                        <span>Confirm Email Address</span>
                    </div>
                </Col>
            </Row>
            <Row className={styles.commonRow}>
                <Col>
                    <div className="field-wrapper">

                        <Field
                            className="field field_select"
                            component="select"

                        >
                            {years.map((item, index) => <option value={item} key={`${index}__signUp-years`} >{item}</option>)}
                        </Field>
                        <span>Year of Graduation</span>
                    </div>
                </Col>
            </Row>
            <Row className={styles.commonRow}>
                <Col>
                    <div className="field-wrapper">
                        <Field
                            className="field field_select"
                            component="select"
                            name="countries"
                        >
                            {countries.map((item, index) => <option value={item} key={`${index}__signUp-counries`} >{item}</option>)}
                        </Field>
                        <span>Country where you Qualified</span>
                    </div>
                </Col>
            </Row>
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
            </Row>
            <Row className={styles.commonRow}>
                <Col>
                    <div className="field-wrapper">
                        <DatePickerField
                            name="availFrom"
                        />
                        <span>Available From (Add Date)</span>
                    </div>
                </Col>
            </Row>
            <Row className={styles.commonRow}>
                <Col>
                    <div className="field-wrapper">
                        <SelectField
                            name="professionMulti"
                            options={professionOpt}
                            isMulti

                        />
                        <span>Profession:</span>
                    </div>
                </Col>
            </Row>

        </>
    )
}

export default React.memo(EmployeeForm)