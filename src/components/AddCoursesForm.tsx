import React, { useReducer } from 'react';
import courseFormReducer, { initialState } from '../hooks/courseFormReducer';

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

  const onColorFieldChange = (evt: React.FormEvent<HTMLInputElement>, fromPicker: boolean = false) => {
    dispatch({
      type: 'setColor',
      payload: {
        color: evt.currentTarget.value,
        fromPicker: fromPicker
      }
    })
  };

  return (
  <div>
    <form>
      <label htmlFor="courseName">Nombre del curso</label>
      <input id="courseName" name="name" type="text" onChange={onTxtFieldChange} />
      <label htmlFor="courseCode">Código o abreviación</label>
      <input id="courseCode" name="code" type="text" onChange={onTxtFieldChange} />

      <label  htmlFor="startTime" >Inicio</label>
      <input id="startTime" name="startTime" />
      <label htmlFor="endTime">Término</label>
      <input id="endTime" name="endTime" />

      <label htmlFor="selectedColor">Elegir un color</label>
      <input type="color" id="courseColor" name="courseColor" onChange={(evt) => onColorFieldChange(evt, true)} />
      <input type="text" id="selectedColor" name="selectedColor" value={state.color} onChange={onColorFieldChange} />
    </form>
    {state.error
       && <p>
        Error en campo { state.error.fieldError }
        { state.error.msg }
      </p>
    }
  </div>
  )
};

export default AddCoursesForm;
