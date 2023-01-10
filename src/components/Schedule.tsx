import { FC } from "react";
import { dayTimes, days } from "../data";

const Schedule: FC = () => {
  return(
    <div>
      {days.map(day => {
        return <>{ day }</>
      })}
    </div>
  )
};

export default Schedule;