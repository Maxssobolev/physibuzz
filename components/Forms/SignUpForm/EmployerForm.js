import React from 'react'
import { Field } from "formik"
import { Row, Col } from "react-bootstrap"
import { SelectField } from '../SpecialFields/SelectField'
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
                            className="field"
                            component="input"
                            name="company"
                        />
                        <span>Company/Clinic Name</span>
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
                        <span>Profession / Main Clinical Service</span>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default React.memo(EmployerForm)