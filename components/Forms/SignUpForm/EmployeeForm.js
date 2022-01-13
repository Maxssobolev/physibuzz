import React from 'react'

import { Field } from "formik"
import { Row, Col } from "react-bootstrap"
import { years, counries, counriesOfRegAd, counriesOfReg } from "../../CommonUtils/CommonUtils"
//форма соискателей
function EmployeeForm({ styles, profession }) {
    const gender = ['Male', 'Female']
    return (
        <>
            <Row className={styles.commonRow}>
                <Col>
                    <div className="field-wrapper">
                        <Field
                            className="field field_select"
                            component="select"
                            name="profession"
                        >
                            {gender.map((item, index) => <option value={item} key={`${index}__signUp-gender`} >{item}</option>)}
                        </Field>
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
                            name="years"
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
                            name="counries"
                        >
                            {counries.map((item, index) => <option value={item} key={`${index}__signUp-counries`} >{item}</option>)}
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
                            name="counries"
                        >
                            {counriesOfReg.map((item, index) => <option value={item} key={`${index}__signUp-counriesOfReg`} >{item}</option>)}
                        </Field>
                        <span>Country of Registration</span>
                    </div>
                </Col>
                <Col>
                    <div className="field-wrapper">
                        <Field
                            className="field field_select"
                            component="select"
                            name="counries"
                        >
                            {counriesOfRegAd.map((item, index) => <option value={item} key={`${index}__signUp-counriesOfRegAd`} >{item}</option>)}
                        </Field>
                        <span>Additional Country of Registration</span>
                    </div>
                </Col>
            </Row>
            <Row className={styles.commonRow}>
                <Col>
                    <div className="field-wrapper">
                        <Field
                            className="field"
                            component="input"
                            name="availFrom"
                        />
                        <span>Available From (Add Date)</span>
                    </div>
                </Col>
            </Row>
            <Row className={styles.commonRow}>
                <Col>
                    <div className="field-wrapper">
                        <Field
                            className="field field_select"
                            component="select"
                            name="counries"
                        >
                            {profession.map((item, index) => <option value={item} key={`${index}__signUp-profession2`} >{item}</option>)}
                        </Field>
                        <span>Profession:</span>
                    </div>
                </Col>
            </Row>

        </>
    )
}

export default React.memo(EmployeeForm)