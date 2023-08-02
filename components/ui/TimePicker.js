import React, {useState} from 'react';
import {View, Button} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TimePicker = ({label, OnSubmitStartTime, OnSubmitStopTime}) => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showTimePicker = () => {
    setTimePickerVisibility(true);
    console.log('show timePicker');
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = time => {
    console.log(time);
    hideTimePicker();

    if (label == 'Task start time') {
      OnSubmitStartTime(time);
    } else if (label == 'Task stop time') {
      OnSubmitStopTime(time);
    }
  };

  const setDate = (event: DateTimePickerEvent, dateTime: Date) => {
    const {
      type,
      nativeEvent: {timestamp},
    } = event;
    if (type == 'dismissed') {
      hideTimePicker();
    } else if (type == 'set') {
      handleConfirm(timestamp);
      /*console.log("event");
      console.log(event);*/
    }
  };
  return (
    <View style={{marginBottom:12}}>
      <Button title={label} onPress={showTimePicker} />
      {isTimePickerVisible && (
        <DateTimePicker
          mode="time"
          onChange={setDate}
          value={new Date()}
          display="spinner"
        />
      )}
    </View>
  );
};

export default TimePicker;
