import { FC, useContext, useEffect, useRef, useState } from "react";
import { blockTimes, days } from "../data";
import { Course } from "../hooks/courseFormReducer";
import useCourses from "../hooks/useCourses";
import ScheduleCourseCell from "./ScheduleCell";
import ScheduleHeader from "./ScheduleHeader";

interface Props {
  courses: Course[]
}

export type CourseSection = {
  courseCode: string,
  courseName: string,
  sectionDay: string,
  color: string,
}

const Schedule = () => {
  const { courses } = useCourses();
  const [finalSchedule, setFinalSchedule] = useState<Array<[number, CourseSection[]]>>([]);
  const tableBodyRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    const scheduleByBlockId = new Map<number, CourseSection[]>();
    blockTimes.forEach(block => scheduleByBlockId.set(block.blockId, []));
    for(let course of courses) {
      course.sections.forEach((section) => {
        scheduleByBlockId.get(section.blockId)?.push({
          color: course.color,
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
    <div className="overflow-x-scroll">
      <table className="w-full table-fixed border-separate border-spacing-x-2 border-spacing-y-2">
        <ScheduleHeader tableBodyRef={tableBodyRef} />
        <tbody ref={tableBodyRef}>
          {
            finalSchedule.map(([ blockId, sections ], idx) => {
              return( 
              <tr key={blockId}>
                  <td className="py-2 text-center bg-white ">{ blockId }</td>
                  {days.map((day) => (
                    <ScheduleCourseCell key={`${blockId}-${day}-${idx}`} 
                      blockId={blockId} day={day} sections={sections} 
                    />
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