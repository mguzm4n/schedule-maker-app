import { FC, useEffect, useState } from "react";
import { Section } from "../hooks/courseFormReducer";
import { CourseSection } from "./Schedule";

interface Props {
  blockId: number,
  day: string,
  sections: CourseSection[]
}

const initialState= {
  courseCode: '', color: '', courseName: '', sectionDay: ''
}

const ScheduleCourseCell: FC<Props> = ({ blockId, day, sections }) => {

  const section = calculateSectionsCollision(day);

  function calculateSectionsCollision(day: string): CourseSection {
    const sectionsOnSameBlock = sections.filter(section => section.sectionDay == day);
    const totalSections = sectionsOnSameBlock.length;
    if (totalSections == 1) {
      const newSection = sectionsOnSameBlock[0];
      return newSection;
    }
    if (totalSections > 1) {
      return {
        courseCode: '* TOPE *',
        courseName: '* TOPE *',
        sectionDay: '-',
        color: 'white'
      }
    }
    return initialState;
  }

  if (sections.length == 0) {
    return <td className="bg-white"></td>
  }

  return (
    <td style={{ backgroundColor: section.color }} className="text-center bg-white py-2 w-32 px-2">
      <p className="font-[MonserratSB] text-slate-700 tracking-tighter text-center">
        { section.courseCode }
      </p>
    </td>
  )
};

export default ScheduleCourseCell;
