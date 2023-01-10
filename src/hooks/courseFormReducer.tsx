import { Time } from "../data";
import { v4 as uuidv4 } from 'uuid';

export type Section = {
  id: string,
  day: string,
  time: { from: Time, to: Time}
}

export type CourseFormState = {
  error: { fieldError: string, msg: string } | undefined,
  name: string,
  code: string,
  color: string,
  sections: Section[]
};

export type CourseFormAction = 
  | { type: 'setTxt', payload: { field: string, value: string } }
  | { type: 'setColor', payload: { color: string } } 
  | { type: 'getNewSection'}
  | { type: 'setNewSection', payload: Section };

const defaultSection: Section = { id: uuidv4(), day: 'Lunes', time: { from: '8:15', to: '9:30' } };

export const initialState: CourseFormState = {
  error: undefined,
  name: '',
  code: '',
  color: '',
  sections: [defaultSection],
};

const courseFormReducer = (state: CourseFormState, action: CourseFormAction): CourseFormState => {
  switch (action.type) {
    case "setTxt":
      const { field, value } = action.payload;
      console.log(field, value);
      return {
        ...state,
        [field]: value,
      }
    case "setColor":
      const { color }  = action.payload;
      const response = {
        ...state,
        color: color
      };
      const validColor = color.startsWith('#') && (color.length < 7 && color.length > 3);

      response['error'] = validColor ? undefined : {
        fieldError: 'color',
        msg: 'Formato del color ingresado inválido'
      }

      return response;
    case "getNewSection":
      return {
        ...state,
        sections: [...state.sections, { ...defaultSection, id: uuidv4() }]
      };
    case "setNewSection":
      const newSection = action.payload;
      const newSectionsList = state.sections.map(section => {
        if (section.id === newSection.id) {
          return newSection;
        }
        return section;
      })
      
      return {
        ...state,
        sections: newSectionsList
      }
      
    default:
      return state;

  }
};

export default courseFormReducer;
