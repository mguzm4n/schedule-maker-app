import './index.css';
import { getCollection } from './localdb/localManagement';

import { createContext, Dispatch, ReactElement, useEffect, useState } from 'react';
import { Course } from './hooks/courseFormReducer';

import Schedule from './components/Schedule';
import AddCoursesForm from './components/AddCoursesForm';

import { AiOutlineEdit } from "react-icons/ai";
import { RiAddFill } from 'react-icons/ri';
import { VscListSelection } from 'react-icons/vsc';
import { IconType } from 'react-icons';
import CrudButtons from './components/CrudButtons';
import CourseList from './components/CourseList';
import useCourses from './hooks/useCourses';
import CoursesProvider from './hooks/coursesContext';

export type CrudOptions = 'create' | 'read' | 'update';

type OptionBtn = {
  id: CrudOptions,
  name: string,
  icon: ReactElement<IconType>
}

export type OptionBtnState = OptionBtn & {
  selected: boolean,
  crudComponent: () => JSX.Element
}

const crudOptions: OptionBtn[] = [
  { id: "create", name: 'Añadir cursos', icon: <RiAddFill className="mb-0.5" /> },
  { id: "update", name: 'Editar cursos', icon: <AiOutlineEdit className="mb-0.5" /> },
  { id: "read", name: 'Mostrar cursos actuales', icon: <VscListSelection className="" /> },
];


function App() {
  const { setCourses } = useCourses();

  const crudComponents: Record<CrudOptions, () => JSX.Element> = {
    "create": () => <AddCoursesForm />,
    "read": () => <CourseList />,
    "update": () => <>Update!</>
  }

  const [btns, setBtns] = useState(
    [...crudOptions].map(option => {
      return { ...option, selected: false, crudComponent: crudComponents[option.id] } as OptionBtnState
    })
  );

  useEffect(() => {
    const coursesResponse = getCollection<Course>('courses');
    setCourses(coursesResponse.data);
  }, []);
  
  return (
    <div className="w-full flex justify-center">
      <div className="pt-5 w-[75%]">
        <CrudButtons setBtns={setBtns} btns={btns} />
        <Schedule />
      </div>
    </div>
  )
}

export default App
