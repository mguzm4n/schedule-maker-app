import { FC } from "react";
import { Course } from "../hooks/courseFormReducer";

interface Props {
  courses: Course[]
}

const CourseList: FC<Props> = ({ courses }) => {
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
