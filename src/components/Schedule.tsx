import { FC, useEffect, useRef, useState } from "react";
import { blockTimes, days } from "../data";
import { Course, Section } from "../hooks/courseFormReducer";
import ScheduleHeader from "./ScheduleHeader";

interface Props {
  courses: Course[]
}

type CourseSection = {
  courseCode: string,
  courseName: string,
  sectionDay: string
}

const Schedule: FC<Props> = ({ courses }) => {
  const [finalSchedule, setFinalSchedule] = useState<Array<[number, CourseSection[]]>>([]);
  const tableBodyRef = useRef<HTMLTableSectionElement>(null);

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
      <table className="w-full table-fixed border-separate border-spacing-x-2 border-spacing-y-2">
        <ScheduleHeader tableBodyRef={tableBodyRef} />
        <tbody ref={tableBodyRef}>
          {
            finalSchedule.map(([ blockId, sections ]) => {
              return( 
              <tr>
                  <td className="text-center bg-white py-2">{ blockId }</td>
                  {days.map((day) => (
                    <td className="text-center bg-white py-2">
                      {sections.find((section) => section.sectionDay === day)?.courseCode}
                    </td>
                  ))}
              </tr>)
            })
          }
        </tbody>
      </table>
    </div>
  )
};

export default Schedule;