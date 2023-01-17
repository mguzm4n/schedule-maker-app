import { useContext } from 'react';
import { CoursesContext } from './coursesContext';

export default function useCourses() {
  const ctx = useContext(CoursesContext);
  return ctx;
}
