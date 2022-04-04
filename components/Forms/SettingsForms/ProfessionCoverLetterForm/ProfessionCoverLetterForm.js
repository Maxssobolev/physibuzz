import { Formik, Form, Field } from "formik"
import { Row, Col } from "react-bootstrap"
import * as Yup from 'yup';
import Loader from "../../../Loader/Loader";
import useProfessions from '../../../Hooks/useProfessions'
const SignupSchema = Yup.object().shape({

});

export default function ProfessionCoverLetterForm({ user }) {
    const professions = useProfessions()

    if (!user) {

        return <div className='form-settings-general'> <Loader /> </div>
    }
    return (
        <Formik
            initialValues={{
                professions: [],
                coverLetter: ''

            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
                console.log(values)
            }}
        >
            {
                (props) => (
                    <Form className='form-settings-professionCoverLetter'>
                        <Row style={{ marginBottom: '20px' }}>
                            <Col>I am qualified at</Col>
                        </Row>
                        <div className="two-columns-wrapper">
                            {professions.map((itm) => {

                                return (

                                    <Col key={`professions-_${itm.id}`}>
                                        <label>
                                            <Field

                                                type="checkbox"
                                                name="professions"
                                                className="checkbox"
                                                value={itm.id}
                                            />
                                            <span>{itm.label}</span>
                                        </label>
                                    </Col>

                                )
                            })}
                        </div>

                        <Row style={{ marginTop: '20px' }}>
                            <Col>
                                <div className="field-wrapper_textarea">
                                    <span>Cover Letter</span>
                                    <Field
                                        className="field field_textarea"
                                        component="textarea"
                                        name="coverLetter"
                                        placeholder="..."
                                    />
                                </div>
                            </Col>
                        </Row>



                        <Row >
                            <Col>
                                <button type='submit' className='form-settings-professionCoverLetter__submitBtn'>Save Changes</button>
                            </Col>
                        </Row>
                    </Form>
                )
            }

        </Formik >
    )
}