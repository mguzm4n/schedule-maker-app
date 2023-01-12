import { FC, useEffect, useState } from "react";
import { dayTimes, days } from "../data";
import { Course } from "../hooks/courseFormReducer";
import { getCollection } from "../localdb/localManagement";


interface Props {
  loadingNewCourse: boolean
}

const Schedule: FC<Props> = ({ loadingNewCourse }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loadingNewCourse === true) {
      return;
    }

    const coursesResponse = getCollection<Course>('courses');
    setCourses(coursesResponse.data);
    setIsLoading(false);
  }, [loadingNewCourse]);

  if (isLoading) {
    return <div>Loading data...</div>
  }
  
  return(
    <div>
      {days.map(day => {
        return <div key={day}>{ day }</div>
      })}
    </div>
  )
};

export default Schedule;