import { FC, FormEvent, Dispatch } from 'react';
import AddSectionForm from './AddSectionForm';
import { postToCollection } from '../localdb/localManagement';
import { CourseFormAction, CourseFormState, Section } from "../hooks/courseFormReducer";

interface Props {
  state: CourseFormState,
  dispatch: Dispatch<CourseFormAction>,
}
const AddCoursesForm: FC<Props> = ({ state, dispatch }) => {
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

  const submitCourse = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch({ type: 'loadingEvent' });
    dispatch({ type: 'submitCourse' });
  };

  return (
  <div>
    <form onSubmit={submitCourse}>
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
        <div className="flex w-[60%] items-center justify-between">
          <div className="flex gap-2">
            <label htmlFor="courseColor">Rueda de colores:</label>
            <input type="color" id="courseColor" name="courseColor" onChange={(evt) => onColorFieldChange(evt)} />
          </div>
          <div className="flex gap-2">
            <p className="">Pegar:</p>
            <input className="border-b-2 border-blue-500 w-20 text-center"
            type="text" id="selectedColor" name="selectedColor" value={state.color} onChange={onColorFieldChange} />
          </div>
        </div>
      </div>

      <p className="border-b-2 p-2">Horarios</p>

      {state.sections.map((section, idx: number) => (
        <AddSectionForm 
          key={section.id} 
          dispatch={dispatch} 
          section={section} 
          index={idx} 
          totalSections={state.sections.length} 
          />
        )
      )}

      
      <div className="flex flex-col items-center my-3">
        <button
          className="disabled:opacity-50 w-[40%] px-2.5 py-1 rounded-full bg-blue-500 text-white hover:opacity-75"
          type="submit">
          Guardar
        <span className="text-red-700 text-xl">*</span> curso
        </button>
        <p className="px-5 py-2">
          <span className="text-red-700 text-xl">*</span> Esto guardará el curso en la memoria local de su dispositivo, si usted borra el almacenamiento local, perderá los datos guardados.
        </p>
      </div>

    </form>

    {state.formState.error &&
      <p>
        Error en campo { state.formState.error.fieldError }
        { state.formState.error.msg }
      </p>
    }

    {
      state.formState.isLoading &&
      <div className="p-4 border-2 border-emerald-500">Enviando datos...</div>
    }
  </div>
  )
};

export default AddCoursesForm;

