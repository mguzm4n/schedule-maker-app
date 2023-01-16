import { FC, useEffect, useState } from "react";
import { Section } from "../hooks/courseFormReducer";
import { CourseSection } from "./Schedule";

interface Props {
  day: string,
  sections: CourseSection[]
}

const initialState= {
  courseCode: '', color: '', courseName: '', sectionDay: ''
}

const ScheduleCourseCell: FC<Props> = ({ day, sections }) => {
  const [section, setSection] = useState<CourseSection>(initialState);

  const calculateSectionsCollision = (day: string): void => {
    const sectionsOnSameBlock = sections.filter(section => section.sectionDay == day);
    const totalSections = sectionsOnSameBlock.length;
    if (totalSections == 1) {
        const section = sectionsOnSameBlock[0];
        setSection(section);
    }
    if (totalSections > 1) {
      setSection({
        courseCode: '* TOPE *',
        courseName: '* TOPE *',
        sectionDay: '-',
        color: 'white'
      })
    }
  }

  useEffect(() => {
    calculateSectionsCollision(day);
  }, []);

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
