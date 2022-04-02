import React from 'react'
import { Field } from "formik"
import { Row, Col } from "react-bootstrap"
import { SelectField } from '../SpecialFields/SelectField'
import { FieldTitle } from '../SpecialFields/FieldTitle'
//Форма работодателей 
function EmployerForm({ styles, professionOpt }) {

    return (
        <>
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
                        <Field
                            className="field"
                            component="input"
                            name="company"
                        />
                        <FieldTitle name="company">Company/Clinic Name</FieldTitle>
                    </div>
                </Col>
            </Row>
            <Row className={styles.commonRow}>
                <Col>
                    <div className="field-wrapper">
                        <SelectField
                            name="profession"
                            options={professionOpt}

                        />
                        <FieldTitle name="profession" additionalLevel="value">Profession / Main Clinical Service</FieldTitle>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default React.memo(EmployerForm)