import {Colors} from '../../constants/style';

import {View, StyleSheet, Alert, ToastAndroid} from 'react-native';
import AuthForm from './AuthForm';
import FlatButton from '../ui/FlatButton';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from '../../store/app-context';
import {useContext} from 'react';

function AuthContent({isLogin}: {isLogin: string}): JSX.Element {
  const navigation = useNavigation();
  const authCtx = useContext(AppContext);

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const showToast = msg => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  function submitHandler(credentials): void {
    let {email, password, confirmPassword} = credentials;

    email = email.trim();
    password = password.trim();

    //Todo validation
    const emailIsValid = validateEmail(email);
    const passwordIsValid = password.length > 8;
    const passwordsAreEqual = password === confirmPassword;

    if (!emailIsValid || !passwordIsValid || (!isLogin && !passwordsAreEqual)) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    if (isLogin) {
      showToast('Login Successfully');
    } else {
      showToast('registered successfully');
      navigation.replace('Login');
    }
    authCtx.authenticate();
    //onAuthenticate({email, password});
  }

  function switchAuthModeHandler(): void {
    if (isLogin) {
      navigation.replace('Signup'); // replace link navigate but there is no back button
    } else {
      navigation.replace('Login');
    }
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? 'Create a new user' : 'Log in instead'}
        </FlatButton>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
