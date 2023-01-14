import './index.css';
import { getCollection } from './localdb/localManagement';

import { FC, ReactElement, useEffect, useState } from 'react';
import { Course } from './hooks/courseFormReducer';

import Schedule from './components/Schedule';
import AddCoursesForm from './components/AddCoursesForm';

import { AiOutlineEdit } from "react-icons/ai";
import { RiAddFill } from 'react-icons/ri';
import { VscListSelection } from 'react-icons/vsc';
import { IconType } from 'react-icons';
import CrudButtons from './components/CrudButtons';

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
  const [courses, setCourses] = useState<Course[]>([]);

  const crudComponents: Record<CrudOptions, () => JSX.Element> = {
    "create": () => <AddCoursesForm display={true} courses={courses} setCourses={setCourses} />,
    "read": () => <>Hi!</>,
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
        {/* <AddCoursesForm display={btns.find(s => s.id === "create")!.selected} courses={courses} setCourses={setCourses} /> */}
        <Schedule courses={courses} />
      </div>
    </div>
  )
}

export default App
