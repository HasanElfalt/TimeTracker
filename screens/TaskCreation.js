import {useNavigation} from '@react-navigation/native';
import {useContext} from 'react';
import {AppContext} from '../store/app-context';

import {View, StyleSheet, Button, ToastAndroid} from 'react-native';
import {useState} from 'react';
import Input from '../components/Auth/Input';
import {Colors} from '../constants/style';
import TimePicker from '../components/ui/TimePicker';

function TaskCreation() {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedStopTime, setSelectedStoptTime] = useState(null);

  const navigation = useNavigation();
  const appCtx = useContext(AppContext);

  function updateTaskName(task) {
    setTaskName(task);
  }
  function updateDescription(desc) {
    setTaskDescription(desc);
  }
  function OnSubmitStartTime(startDateTime) {
    setSelectedStartTime(startDateTime);
  }
  function OnSubmitStoptTime(stopDateTime) {
    setSelectedStoptTime(stopDateTime);
  }

  function newTask() {
    if (
      taskName.length === 0 ||
      taskName.length > 100 ||
      taskDescription.length === 0 ||
      taskDescription.length > 300 ||
      selectedStartTime > selectedStopTime ||
      selectedStartTime == null ||
      selectedStopTime == null
    ) {
      //'you should make sure of these requirments\n - task name length  (100 maximum characters) \n Task description (300 maximum characters) \n start time should be less than stop time',
      ToastAndroid.show('Invalid Input', ToastAndroid.SHORT);
    } else {
      appCtx.addTask(
        taskName,
        taskDescription,
        selectedStartTime,
        selectedStopTime,
      );
      setTaskName('');
      setTaskDescription('');
      setSelectedStartTime(null);
      setSelectedStoptTime(null);

      navigation.navigate('List');
    }
  }

  return (
    <View style={styles.taskContent}>
      <Input
        label={'Task Name'}
        onUpdateValue={updateTaskName}
        keyboardType={'email-address'}
        value={taskName}
      />
      <Input
        label={'Description'}
        onUpdateValue={updateDescription}
        keyboardType={'email-address'}
        value={taskDescription}
      />
      <TimePicker
        label={'Task start time'}
        OnSubmitStartTime={OnSubmitStartTime}
        OnSubmitStopTime={OnSubmitStoptTime}
      />
      <TimePicker
        label={'Task stop time'}
        OnSubmitStartTime={OnSubmitStartTime}
        OnSubmitStopTime={OnSubmitStoptTime}
      />

      <Button onPress={newTask} title="Create Task" />
    </View>
  );
}

export default TaskCreation;

const styles = StyleSheet.create({
  taskContent: {
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
});
