import {View, Text, StyleSheet, Button} from 'react-native';
import {Colors} from '../constants/style';
const Task = ({taskName, taskDesc, elapsedTime, deleteTask}) => {
  //console.log('sddddddddddddddddddddddd');

  function handleDelete() {
    deleteTask();
  }

  function convertTime(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours() - 2;
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  return (
    <View style={styles.tasksView}>
      <View style={styles.taskItemView}>
        <Text style={styles.taskItemHead}>Task Name: </Text>
        <Text style={styles.taskItem}>{taskName}</Text>
      </View>
      <View style={styles.taskItemView}>
        <Text style={styles.taskItemHead}>Task Description: </Text>
        <Text style={styles.taskItem}>{taskDesc}</Text>
      </View>
      <View style={styles.taskItemView}>
        <Text style={styles.taskItemHead}>Duration: </Text>
        <Text style={styles.taskItem}>{convertTime(elapsedTime)}</Text>
      </View>
      <Button onPress={handleDelete} color="#DC3545" title="Delete" />
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  tasksView: {
    backgroundColor: Colors.primary800,
    margin: 10,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  taskItem: {
    color: '#ffffff',
    padding: 5,
  },
  taskItemView: {
    flexDirection: 'row',
  },
  taskItemHead: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4,
  },
});
