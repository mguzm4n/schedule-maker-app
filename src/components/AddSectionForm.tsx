import { Dispatch, FC, useState, FormEvent, useEffect } from "react";
import { CourseFormAction, Section } from "../hooks/courseFormReducer";
import { blockTimes, days } from '../data';

interface AddSectionFormProps {
  section: Section,
  index: number,
  dispatch: Dispatch<CourseFormAction>,
  totalSections: number
}

const AddSectionForm: FC<AddSectionFormProps> = ({ section, index, dispatch, totalSections }) => {
  const [sectionState, setSectionState] = useState(section);

  const getNewSection = () => {
    dispatch({ type: 'getNewSection' })
  };

  const deleteNewSection = (id: string) => {
    dispatch({ type: 'deleteNewSection', payload: { sectionId: id } })
  };

  const onInputChange = (
      evt: FormEvent<HTMLSelectElement | HTMLInputElement>, 
      field: string
    ) => {
    const inputValue = evt.currentTarget.value;
    const value = field === "blockId" ? parseInt(inputValue) : inputValue
    const newSectionState = { ...sectionState, [field]: value };
    dispatch({ type: 'setNewSection', payload: newSectionState }); 
    setSectionState(newSectionState);
  };

  const displayGetNewSection = (index === totalSections - 1) && (index < blockTimes.length);
  const displayDeleteNewSection = totalSections > 1;

  return (
    <div className="flex items-center justify-between h-12 border-b px-2.5 py-1">
      <div className="flex">
        <label  htmlFor={`section-${index}`}>Día:</label>
        <select 
          className="ml-2 border-b-2 border-blue-500"
          name={`section-${index}`} id={`section-${index}`} onChange={evt => onInputChange(evt, 'day')}>
          {days.map((day, idx) =>
            <option key={idx} className="" value={day} defaultValue={sectionState.day}>
              { day }
            </option>)
          }
        </select>
        <label className="ml-4" htmlFor={`blockId-${index}`} >Bloque horario:</label>
        <input className="w-16 px-3 ml-2 border-b-2 border-blue-500" onChange={evt => onInputChange(evt, 'blockId')}
          type="number" id={`blockId-${index}`}
          name="blockId" defaultValue={sectionState.blockId} />
      </div>
      
      <div className="flex gap-4">
        <button className="
          border-2 border-red-500 rounded-full px-4 py-1 
          hover:bg-red-500 hover:text-white
          disabled:opacity-50 disabled:hover:text-black disabled:hover:bg-transparent"
          disabled={!displayDeleteNewSection}
          onClick={() => deleteNewSection(section.id)} type="button">
          Eliminar
        </button>
        <button className="border-2 border-blue-500 rounded-full px-4 py-1 
          hover:bg-blue-500 hover:text-white
          disabled:opacity-50 disabled:hover:text-black disabled:hover:bg-transparent"
          disabled={!displayGetNewSection}
          onClick={getNewSection} type="button">
          Agregar sección
        </button>
      </div>
    </div>
  )
};

export default AddSectionForm;
