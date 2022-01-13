import SignUpForm from "../components/Forms/SignUpForm/SignUpForm";
import Header from "../components/Header/Header";

//sign Up page
export default function SignUp() {
  return (
    <>
      <Header variant="default" />

      <div className="page page-signUp">

        <div className="form-wrapper">

          <div className="form form-signUp">

            <div className="form__title">Sign Up</div>

            <SignUpForm />

          </div>

        </div>

      </div>
    </>
  )
}
