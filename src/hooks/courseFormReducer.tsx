import { Time } from "../data";
import { v4 as uuidv4 } from 'uuid';
import { postToCollection, postItem, getCollection } from '../localdb/localManagement';

export type Section = {
  id: string,
  day: string,
  blockId: number
}

type FormState = {
  error: { fieldError?: string, msg?: string } | undefined, 
  isLoading: boolean
}

export type CourseFormState = {
  formState: FormState,
  name: string,
  code: string,
  color: string,
  sections: Section[]
};

export type CourseFormAction = 
  | { type: 'setTxt', payload: { field: string, value: string } }
  | { type: 'setColor', payload: { color: string } } 
  | { type: 'getNewSection'}
  | { type: 'deleteNewSection', payload: { sectionId: string }}
  | { type: 'setNewSection', payload: Section };

const defaultSection: Section = { id: uuidv4(), day: 'Lunes', blockId: 1 };

export const initialState: CourseFormState = {
  formState: { error: undefined, isLoading: false },
  name: '',
  code: '',
  color: '',
  sections: [defaultSection],
};

export type Course = Omit<CourseFormState, 'formState'> & {
  id: string
}

const courseFormReducer = (state: CourseFormState, action: CourseFormAction): CourseFormState => {
  switch (action.type) {
    case "setTxt":
      const { field, value } = action.payload;
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
      const validColor = color.startsWith('#') && (color.length <= 7 && color.length > 3);

      response.formState.error = validColor ? undefined : {
        fieldError: 'color',
        msg: 'Formato del color ingresado inválido'
      }

      return response;
    case "getNewSection":
      return {
        ...state,
        sections: [...state.sections, { ...defaultSection, id: uuidv4() }]
      };
    case "deleteNewSection":
      const id = action.payload.sectionId;
      return {
        ...state,
        sections: state.sections.filter(section => section.id !== id)
      }
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
