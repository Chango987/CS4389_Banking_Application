import Form from "../components/signupForm";

function SignUp() {
    return (
      <Form route = "api/user/register/" method = "register" />
    );
  }
  
  export default SignUp;