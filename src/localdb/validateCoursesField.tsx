import { Course } from "../hooks/courseFormReducer"

export const validateCourses = () => {

}

export const validateCourse = () => {
  
}

export const checkUsedColor = (courses: Course[], color: string) => {
  const colorsUsed: string[] = courses.map(course => {
    const color: string = course.color;
    if (color.length === (3 + 1)) {
      const r = color[1];
      const g = color[2];
      const b = color[3];
      return "#" + r + r + g + g + b + b;
    } else {
      return course.color;
    }
  });
  return colorsUsed.includes(color);
}