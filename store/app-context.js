import {createContext, useState} from 'react';
import uuid from 'react-native-uuid';

export const AppContext = createContext({
  isAuthenticated: false,
  authenticate: () => {},
  tasks: [],
  addTask: () => {},
  deleteTask: id => {},
});

function AppContextProvider({children}) {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [tasks, setTasks] = useState([]);

  function addTask(taskName, taskDesc, startTaskTime, stopTaskTime) {
    let id = uuid.v4();
    let elapsedTime = stopTaskTime - startTaskTime;

    setTasks([...tasks, {id, taskName, taskDesc, elapsedTime}]);
  }

  function deleteTask(id) {
    const newTasks = tasks.filter(item => item.id !== id);
    setTasks(newTasks);
  }

  function authenticate() {
    setIsAuthenticated(true);
  }

  const value = {
    authenticate: authenticate,
    isAuthenticated: isAuthenticated,
    tasks: tasks,
    addTask: addTask,
    deleteTask: deleteTask,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContextProvider;
