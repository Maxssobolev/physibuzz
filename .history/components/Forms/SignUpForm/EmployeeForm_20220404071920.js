import React from "react"
import { FieldTitle } from "../SpecialFields/FieldTitle"
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

                        <FieldTitle name="gender" additionalLevel="value">Gender</FieldTitle>
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
                        <FieldTitle name="email">Email address</FieldTitle>
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
                        <FieldTitle name="emailConfirmation">Confirm Email Address</FieldTitle>
                    </div>
                </Col>
            </Row>
            <Row className={styles.commonRow}>
                <Col>
                    <div className="field-wrapper">

                        <SelectField
                            name="years"
                            options={years}
                        />
                        <FieldTitle name="years" additionalLevel="value">Year of Graduation</FieldTitle>
                    </div>
                </Col>
            </Row>
            <Row className={styles.commonRow}>
                <Col>
                    <div className="field-wrapper">
                        <Field
                            className="field field_select"
                            component="select"
                            name="country"
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
                        <FieldTitle name="availFrom">Available From (Add Date)</FieldTitle>
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
                        <FieldTitle name="professionMulti" additionalLevel="value">Profession:</FieldTitle>
                    </div>
                </Col>
            </Row>

        </>
    )
}

export default React.memo(EmployeeForm)