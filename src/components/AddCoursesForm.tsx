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

  const getNewSection = () => {
    dispatch({ type: 'getNewSection' })
  };

  return (
  <div>
    <form>
      <p>Información del curso</p>
      <label htmlFor="courseName">Nombre del curso</label>
      <input id="courseName" name="name" type="text" onChange={onTxtFieldChange} />
      <label htmlFor="courseCode">Código o abreviación</label>
      <input id="courseCode" name="code" type="text" onChange={onTxtFieldChange} />


      <label htmlFor="selectedColor">Elegir un color</label>
      <input type="color" id="courseColor" name="courseColor" onChange={(evt) => onColorFieldChange(evt)} />
      <input type="text" id="selectedColor" name="selectedColor" value={state.color} onChange={onColorFieldChange} />

      <p>Horarios</p>

      {state.sections.map((section, idx) => 
        <AddSectionForm dispatch={dispatch} section={section} index={idx} />)
      }

      <button onClick={getNewSection} type="button" className="">
        Agregar horario
      </button>
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
