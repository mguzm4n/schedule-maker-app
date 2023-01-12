import { FC, useEffect, useState } from "react";
import { blockTimes, days } from "../data";
import { Course, Section } from "../hooks/courseFormReducer";

interface Props {
  courses: Course[]
}

type CourseSection = {
  courseCode: string,
  courseName: string,
  sectionDay: string
}

const Schedule: FC<Props> = ({ courses }) => {
  const headerTags = ['Bloque', ...days];
  const [finalSchedule, setFinalSchedule] = useState<Array<[number, CourseSection[]]>>([]);

  useEffect(() => {
    const scheduleByBlockId = new Map<number, CourseSection[]>();
    blockTimes.forEach(block => scheduleByBlockId.set(block.blockId, []));
    for(let course of courses) {
      course.sections.forEach((section) => {
        scheduleByBlockId.get(section.blockId)?.push({
          courseName: course.name,
          courseCode: course.code,
          sectionDay: section.day
        })
      });
    }
    const scheduleArr = Array.from(scheduleByBlockId);
    setFinalSchedule(scheduleArr);
  }, [courses]);
  

  return(
    <div>
      {courses.map(course => <div>{ course.name }</div>)}
      <table>
        <thead>
          <tr>
            {headerTags.map(day => {
              return <th key={day}>{ day }</th>
            })}  
          </tr>
        </thead>
        <tbody>
          {
            finalSchedule.map(([ blockId, sections ]) => {
              return( 
              <tr>
                  <td>{ blockId }</td>
                  {days.map((day) => <td>{sections.find((section) => section.sectionDay === day)?.courseName}</td>)}
              </tr>)
            })
          }
        </tbody>
      </table>
    </div>
  )
};

export default Schedule;