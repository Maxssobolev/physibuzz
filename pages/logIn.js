import LogInForm from "../components/Forms/LogInForm/LogInForm";
import Header from "../components/Header/Header";

//sign Up page
export default function LogIn() {
  return (
    <>
      <Header variant="default" />

      <div className="page page-logIn">

        <div className="form-wrapper">

          <div className="form form-logIn">

            <div className="form__title">Log In</div>

            <LogInForm />

          </div>

        </div>

      </div>
    </>
  )
}
