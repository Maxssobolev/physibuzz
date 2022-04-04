import React from "react"
import { FieldTitle } from "../SpecialFields/FieldTitle"
import { Field } from "formik"
import { Row, Col } from "react-bootstrap"
import { years, countries, countriesOfRegAd, countriesOfReg, gender } from "../../CommonUtils/CommonUtils"
import { DatePickerField } from '../../CommonUtils/CustomDatepicker'
import { SelectField } from '../SpecialFields/SelectField'
import { DataSuggestionField } from '../SpecialFields/DataSuggestionField'
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
                        <DataSuggestionField
                            name="country"
                            filterFromBound="country"
                            firstAddressField
                        />
                        <FieldTitle name="country" additionalLevel="value">Country where you Qualified</FieldTitle>
                    </div>
                </Col>
            </Row>
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

                        <FieldTitle name="countriesOfRegAd"
                            additionalLevel="value">Additional Country of Registration</FieldTitle>
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
                        <FieldTitle name="professionMulti" >Profession:</FieldTitle>
                    </div>
                </Col>
            </Row>

        </>
    )
}

export default React.memo(EmployeeForm)