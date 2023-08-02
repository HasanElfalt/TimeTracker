import {Text, ScrollView} from 'react-native';
import {useContext} from 'react';
import {AppContext} from '../store/app-context';
import Task from '../components/Task';

function TasksList() {
  const appCtx = useContext(AppContext);

  return (
    <ScrollView style={{padding: 8}}>
      <Text style={styles.tasksHeader}>Tasks List</Text>
      {appCtx.tasks.map(item => (
        <Task
          key={item.id}
          taskName={item.taskName}
          taskDesc={item.taskDesc}
          elapsedTime={item.elapsedTime}
          deleteTask={() => appCtx.deleteTask(item.id)}
        />
      ))}
    </ScrollView>
  );
}

export default TasksList;

const styles = {
  tasksHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 16,
  },
  view: {
    marginStart: 5,
    alignItems: 'center',
  },
};
