import './index.css';
import { getCollection } from './localdb/localManagement';

import { ReactElement, useEffect, useState } from 'react';
import { Course } from './hooks/courseFormReducer';

import Schedule from './components/Schedule';
import AddCoursesForm from './components/AddCoursesForm';

import { AiOutlineEdit } from "react-icons/ai";
import { RiAddFill } from 'react-icons/ri';
import { VscListSelection } from 'react-icons/vsc';
import { IconType } from 'react-icons';

type OptionBtn = {
  name: string,
  icon: ReactElement<IconType>
}

type OptionBtnState = OptionBtn & {
  selected: boolean,
}

const crudOptions: OptionBtn[] = [
  { name: 'Añadir cursos', icon: <RiAddFill className="mb-0.5" /> },
  { name: 'Editar cursos', icon: <AiOutlineEdit className="mb-0.5" /> },
  { name: 'Mostrar cursos actuales', icon: <VscListSelection className="" /> },
];

function App() {
  const [btns, setBtns] = useState(
    [...crudOptions].map(option => {
      return { ...option, selected:false }
    })
  );

  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const coursesResponse = getCollection<Course>('courses');
    setCourses(coursesResponse.data);
  }, []);

  const handleBtnSectionClick = (idx: number, option: OptionBtnState) => {
    const btn = { ...option, selected: !option.selected };
    const newBtns = [...btns];
    newBtns[idx] = btn;
    setBtns(newBtns);
  }
  
  return (
    <div className="w-full flex justify-center">
      <div className="pt-5 w-[75%]">
        <div className="flex flex-col gap-2">
          {btns.map((option, idx) => (
            <button onClick={() => handleBtnSectionClick(idx, option)}
              key={option.name} className={`
                btn-section
                ${option.selected ? 'underline underline-offset-4 bg-blue-600 border-b-blue-500 hover:border-b-blue-600' : ''}
              `}>
              {option.icon} { option.name }
            </button>
          ))
          }
        </div>
        <AddCoursesForm courses={courses} setCourses={setCourses} />
        <Schedule courses={courses} />
      </div>
    </div>
  )
}

export default App
