import { blockTimes, Time } from "../data";
import { v4 as uuidv4 } from 'uuid';
import { checkUsedColor } from "../localdb/validateCoursesField";
import { beforeAll } from "@jest/globals";

export type Section = {
  id: string,
  day: string,
  blockId: number
}

export type CourseFormState = {
  errors: Set<string>,
  name: string,
  code: string,
  color: string,
  sections: Section[]
};

export type CourseFormAction = 
  | { type: 'setTxt', payload: { field: string, value: string } }
  | { type: 'setColor', payload: { color: string, courses: Course[] } } 
  | { type: 'getNewSection'}
  | { type: 'deleteNewSection', payload: { sectionId: string }}
  | { type: 'setNewSection', payload: Section };

const defaultSection: Section = { id: uuidv4(), day: 'Lunes', blockId: 1 };

export const initialState: CourseFormState = {
  errors: new Set(),
  name: '',
  code: '',
  color: '',
  sections: [defaultSection],
};

export type Course = Omit<CourseFormState, 'errors'> & {
  id: string
}

const isSectionRepeated = (sections: Section[], newSection: Section): boolean => {
  for (let section of sections) {
    if (
        section.id !== newSection.id &&
        (section.day == newSection.day && section.blockId == newSection.blockId)
      ) {
      return true;
    }
  }
  return false;
}

const checkError = (condition: boolean, set: Set<string>, msg: string) => {
  if (condition) {
    set.add(msg);
  } else {
    set.delete(msg);
  }
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
      const { color, courses }  = action.payload;
      const response = {
        ...state,
        color: color
      };
      const validColor = color.startsWith('#') && (color.length <= 7 && color.length > 3);
      checkError(!validColor, response.errors, 'Formato del color ingresado inválido');
      
      const usedColor = checkUsedColor(courses, color);
      checkError(usedColor, response.errors, 'Color ya utilizado por otro curso');

      return response;
    case "getNewSection":
      return {
        ...state,
        errors: (new Set(state.errors)).add('Un mismo curso no puede tener tope en sus bloques'),
        sections: [...state.sections, { 
          ...defaultSection, 
          id: uuidv4() 
        }]
      };
    case "deleteNewSection":
      const id = action.payload.sectionId;
      const errors = new Set(state.errors);
      const filteredSections = state.sections.filter(section => section.id !== id);
      filteredSections.forEach(section => {
        checkError(
          isSectionRepeated(filteredSections, section), 
          errors, 
          'Un mismo curso no puede tener tope en sus bloques'
        );
      });

      return {
        ...state,
        errors: errors,
        sections: filteredSections
      }
    case "setNewSection":
      const newSection = action.payload;
      
      const newSectionsList = state.sections.map(section => {
        if (section.id === newSection.id) {
          return newSection;
        }
        return section;
      });

      const newState = { ...state, sections: newSectionsList };
      checkError(
        isSectionRepeated(state.sections, newSection), 
        newState.errors, 
        'Un mismo curso no puede tener tope en sus bloques'
      );

      return newState;

    default:
      return state;

  }
};

export default courseFormReducer;
