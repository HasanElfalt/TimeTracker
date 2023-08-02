import AuthContent from '../components/Auth/AuthContent';
import {useNavigation} from '@react-navigation/native';

function SignupScreen(): JSX.Element {
  const navigation = useNavigation();

  function signupHandler({email, password}) {
    //navigation.replace("Home");
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
