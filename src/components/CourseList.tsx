import { useContext } from "react";
import { CoursesContext } from "../App";
import { Section } from "../hooks/courseFormReducer";
import { blockTimes } from "../data";

const CourseList = () => {
  const { courses } = useContext(CoursesContext);
  const formatSection = (sections: Section[]) => {
    const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
    const codedSection = sections
      .map(section => `${section.day[0]}${section.blockId}`)
      .join("-");
    
    const fullSection = formatter.format(sections.map(section => {
      const block = blockTimes.find(block => block.blockId == section.blockId)!
      return `${section.day} (${block.startTime}-${block.endTime})`
    }));

    return(
      <p title={fullSection}>
        { codedSection }
      </p>
    )
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {courses.map(course => (
        <div className="bg-gray-200 rounded-md px-2 py-3">
          <p className="border-b-4 border-b-slate-300 rounded-sm pb-4 mb-3">
            <span className="inline-flex items-center mr-2 w-min 
            bg-slate-400 rounded-lg text-slate-900 font-bold text-sm px-2">
              { course.code }
            </span>
            { course.name }
          </p>
          { formatSection(course.sections) }
        </div>
      ))}
    </div>
  )
};

export default CourseList;
