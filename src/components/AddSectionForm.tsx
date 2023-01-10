import { Dispatch, FC, useState, FormEvent, useEffect } from "react";
import { CourseFormAction, Section } from "../hooks/courseFormReducer";
import { days } from '../data';

interface AddSectionFormProps {
  section: Section,
  index: number,
  dispatch: Dispatch<CourseFormAction>
}

const AddSectionForm: FC<AddSectionFormProps> = ({ section, index, dispatch }) => {
  const [sectionState, setSectionState] = useState(section);

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

  return (
    <div>
      <label  htmlFor={`section-${index}`}>Día</label>
      <select name={`section-${index}`} id={`section-${index}`} onChange={evt => onInputChange(evt, 'day')}>
        {days.map(day => 
          <option value={day} defaultValue={sectionState.day}>
            { day }
          </option>)
        }
      </select>

      <label  htmlFor={`blockId-${index}`} >Bloque horario</label>
      <input onChange={evt => onInputChange(evt, 'blockId')} 
        type="number" id={`blockId-${index}`}
        name="blockId" defaultValue={sectionState.blockId} />
    </div>
  )
};

export default AddSectionForm;
