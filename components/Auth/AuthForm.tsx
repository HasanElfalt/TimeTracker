import {useState} from 'react';
import {
  Button,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Input from './Input';

interface AuthFormProps {
  isLogin: string;
  onSubmit: any;
  credentialsInvalid: any;
}

function AuthForm({
  isLogin,
  onSubmit,
  credentialsInvalid,
}: AuthFormProps): JSX.Element {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

  const {
    email: emailIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  const handlePress = () => {
    Linking.openURL('https://toggl.com/track/forgot-password/');
  };

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }
  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
    //console.log(enteredEmail);
  }
  return (
    <View>
      <Input
        label={'Email Address'}
        onUpdateValue={updateInputValueHandler.bind(this, 'email')}
        value={enteredEmail}
        keyboardType="email-address"
        isInvalid={emailIsInvalid}
      />
      <Input
        label={'Password'}
        onUpdateValue={updateInputValueHandler.bind(this, 'password')}
        secure
        value={enteredPassword}
        isInvalid={passwordIsInvalid}
      />
      {!isLogin && (
        <Input
          label={'Confirm Password'}
          onUpdateValue={updateInputValueHandler.bind(this, 'confirmPassword')}
          secure
          value={enteredConfirmPassword}
          isInvalid={passwordsDontMatch}
        />
      )}
      <View style={styles.buttons}>
        <Button
          onPress={submitHandler}
          title={isLogin ? 'Log in' : 'Sign up'}></Button>
      </View>
      {isLogin && (
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.label}>Forgot Password?</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
  label: {
    color: 'white',
    marginBottom: 4,
  },
});
