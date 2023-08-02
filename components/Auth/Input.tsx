import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../constants/style';
import {useState} from 'react';

interface InputProps {
  isLogin: string;
  keyboardType: string;
  secure: any;
  onUpdateValue: any;
  value: any;
  isInvalid: any;
}

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
}: InputProps): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={(styles.inputContainer, isInvalid && styles.inputInvalid)}>
      <Text style={[styles.label, isInvalid && styles.inputInvalid]}>
        {label}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={[styles.input]}
          autoCapitalize={false}
          autoCapitalize="none"
          keyboardType={keyboardType}
          secureTextEntry={secure}
          onChangeText={onUpdateValue}
          value={value}
          secureTextEntry={!showPassword}
        />
        {(label == 'Password' || label == 'Confirm Password') && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.label}>{showPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    color: 'white',
    marginBottom: 4,
  },
  labelInvalid: {
    color: Colors.error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    fontSize: 16,
    marginBottom: 12,
    flexGrow:1
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});
