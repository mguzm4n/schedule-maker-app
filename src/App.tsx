import './index.css';

import { useReducer } from 'react';
import courseFormReducer, { initialState } from './hooks/courseFormReducer';

import Schedule from './components/Schedule';
import AddCoursesForm from './components/AddCoursesForm';

function App() {
  const [state, dispatch] = useReducer(courseFormReducer, initialState);

  return (
    <div className="App">
      <AddCoursesForm state={state} dispatch={dispatch} />
      <Schedule loadingNewCourse={state.formState.isLoading} />
    </div>
  )
}

export default App
