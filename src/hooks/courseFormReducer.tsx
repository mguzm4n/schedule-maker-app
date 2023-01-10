import { Time } from "../data";

export type CourseFormState = {
  error: { fieldError: string, msg: string } | undefined,
  name: string,
  code: string,
  color: string,
  time: { from: Time, to: Time},
};

type CourseFormAction = 
  | { type: 'setTxt', payload: { field: string, value: string } }
  | { type: 'setColor', payload: { color: string }} ;

export const initialState: CourseFormState = {
  error: undefined,
  name: '',
  code: '',
  color: '',
  time: { from: '0:0', to: '0:0' },
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
    default:
      return state;
  }
};

export default courseFormReducer;
