import Form from "../components/signinForm";

function SignIn() {
    return (
      <Form route = "api/token/" method = "login" />
    );
  }
  
  export default SignIn;