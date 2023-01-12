import { FC } from "react";
import { dayTimes, days } from "../data";
import { Course } from "../hooks/courseFormReducer";

interface Props {
  courses: Course[]
}

const Schedule: FC<Props> = ({ courses }) => {
  return(
    <div>
      {courses.map(course => <div>{ course.name }</div>)}
      {days.map(day => {
        return <div key={day}>{ day }</div>
      })}
    </div>
  )
};

export default Schedule;