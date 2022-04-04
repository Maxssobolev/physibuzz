import { Formik, Form, Field } from "formik"
import { Row, Col } from "react-bootstrap"
import * as Yup from 'yup';
import Loader from "../../../Loader/Loader";
import Swal from 'sweetalert2'
import api from '../../../../apiConfig'
import useProfessions from '../../../Hooks/useProfessions'
import moment from 'moment'
const SignupSchema = Yup.object().shape({

});

export default function ProfessionCoverLetterForm({ user }) {
    const professions = useProfessions()

    if (user.loading) {

        return <div className='form-settings-general'> <Loader /> </div>
    }
    return (
        <Formik
            initialValues={{
                professions: user.professions.map(({ id }) => id.toString()),
                coverLetter: user.cover_letter ?? ''

            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
                let sentData = {
                    "type": user.type,
                    "id": user.id,
                    "name": user.name,
                    "last_name": user.last_name,
                    "email": user.email,
                    'birthday': moment(new Date()).format('YYYY-MM-DD HH:MM:S'),
                    "gender": user.gender,
                    "available_from": user.available_from,
                    "profession_id": values.professions.map(itm => Number(itm)),
                    "cover_letter": values.coverLetter
                }


                api.put('/api/v1/user/update/current', sentData).then(r => {

                    Swal.fire(
                        'Data was updated!',
                        'Success!',
                        'success'
                    )

                })
                    .catch(err => {
                        console.log(err)
                        Swal.fire(
                            'Oops..',
                            `Sorry, something went wrong, please, try again`,
                            'error'
                        )
                    })

            }}
        >
            {
                ({ dirty }) => (
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
                                                value={itm.id.toString()}
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
                                <button type='submit' disabled={!dirty} className='form-settings-professionCoverLetter__submitBtn'>Save Changes</button>
                            </Col>
                        </Row>
                    </Form>
                )
            }

        </Formik >
    )
}