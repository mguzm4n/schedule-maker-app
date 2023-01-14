import { useContext } from "react";
import { CoursesContext } from "../App";

const CourseList = () => {
  const { courses } = useContext(CoursesContext);
  return (
    <div>
      { courses.map(course => (
        <div>
          <p>
            <span>{ course.code }</span>
            { course.name }
          </p>
          <p></p>
          <p></p>
        </div>
      ))}
    </div>
  )
};

export default CourseList;
