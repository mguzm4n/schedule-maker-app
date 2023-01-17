import { Course } from "./courseFormReducer";
import { useState, createContext, FC, ReactNode } from 'react';

type CoursesState = {
  courses: Course[],
  setCourses: (courses: Course[]) => void
}

export const CoursesContext = createContext<CoursesState>({
  courses: [],
  setCourses: () => {}
});

interface Props {
  children: ReactNode
}

const CoursesProvider: FC<Props> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  return(
    <CoursesContext.Provider value={{ courses, setCourses }}>
      { children }
    </CoursesContext.Provider>
  );
}

export default CoursesProvider;