import React, { useReducer } from 'react';
import courseFormReducer, { initialState } from '../hooks/courseFormReducer';
import { days } from '../data';
import AddSectionForm from './AddSectionForm';

const AddCoursesForm = () => {
  const [state, dispatch] = useReducer(courseFormReducer, initialState);
  const onTxtFieldChange = (evt: React.FormEvent<HTMLInputElement>) => {
    dispatch({
      type: 'setTxt',
      payload: {
        field: evt.currentTarget.name,
        value: evt.currentTarget.value,
      }
    })
  };

  const onColorFieldChange = (evt: React.FormEvent<HTMLInputElement>) => {
    dispatch({
      type: 'setColor',
      payload: {
        color: evt.currentTarget.value
      }
    })
  };

  return (
  <div>
    <form>
      <p className="border-b-2 p-2">Información del curso</p>

      <div className="flex items-center gap-2 p-1">
        <label className="pt-1 px-2 w-[30%]" htmlFor="courseName">
          Nombre del curso
        </label>
        <input className="w-[60%] outline-none border-b-2 border-blue-500"
          id="courseName" name="name" type="text" onChange={onTxtFieldChange} />
      </div>

      <div className="flex items-center gap-2 p-1">
        <label className="pt-1 px-2 w-[30%]" htmlFor="courseCode">
          Código o abreviación
        </label>
        <input className="w-[60%] border-b-2 border-blue-500 outline-none"
          id="courseCode" name="code" type="text" onChange={onTxtFieldChange} />
      </div>

      <div className="flex items-center gap-2 p-1 mb-2">
        <label className="pt-1 px-2 w-[30%]" htmlFor="selectedColor">Elegir un color</label>
        <div className="flex w-[60%] justify-between">
          <input type="color" id="courseColor" name="courseColor" onChange={(evt) => onColorFieldChange(evt)} />
          <input className="border-b-2 border-blue-500 w-20 text-center"
            type="text" id="selectedColor" name="selectedColor" value={state.color} onChange={onColorFieldChange} />
        </div>
      </div>

      <p className="border-b-2 p-2">Horarios</p>

      {state.sections.map((section, idx: number) => (
        <AddSectionForm dispatch={dispatch} section={section} index={idx} displayBtn={idx === state.sections.length - 1} />
        )
      )}

    </form>

    {state.error &&
      <p>
        Error en campo { state.error.fieldError }
        { state.error.msg }
      </p>
    }
  </div>
  )
};

export default AddCoursesForm;
