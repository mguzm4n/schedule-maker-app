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
  const onTimeChange = () => {
    dispatch({ type: 'setNewSection', payload: {
      ...sectionState,

    } })
  };

  const onDayChange = (evt: FormEvent<HTMLSelectElement>) => {
    const newSectionState = { ...sectionState, day: evt.currentTarget.value };
    dispatch({ type: 'setNewSection', payload: newSectionState }); 
    setSectionState(newSectionState);
  };

  return (
    <div>
      <label  htmlFor={`section-${index}`}>Día</label>
      <select name={`section-${index}`} id={`section-${index}`} onChange={onDayChange}>
        {days.map(day => 
          <option value={day} defaultValue={sectionState.day}>
            { day }
          </option>)
        }
      </select>

      <label  htmlFor="startTime" >Inicio</label>
      <input id="startTime" name="from" defaultValue={sectionState.time.from} />

      <label htmlFor="endTime">Término</label>
      <input id="endTime" name="to" defaultValue={sectionState.time.to} />
    </div>
  )
};

export default AddSectionForm;
