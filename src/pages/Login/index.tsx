import SignInForm from "../../components/SignInForm";
import { FormWrapper, SignPageWrapper } from "../../styles/global";

const Login = () => {
    return (
        <SignPageWrapper>
            <FormWrapper>
                <SignInForm />
            </FormWrapper>
        </SignPageWrapper>
    );
}

export default Login;