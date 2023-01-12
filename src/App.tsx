import './index.css';
import { getCollection } from './localdb/localManagement';

import { useEffect, useState } from 'react';
import { Course } from './hooks/courseFormReducer';

import Schedule from './components/Schedule';
import AddCoursesForm from './components/AddCoursesForm';

function App() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const coursesResponse = getCollection<Course>('courses');
    setCourses(coursesResponse.data);
  }, []);
  
  return (
    <div className="App">
      <AddCoursesForm courses={courses} setCourses={setCourses} />
      <Schedule courses={courses} />
    </div>
  )
}

export default App
