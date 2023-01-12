import { FC } from "react";

interface Props {
  idx: number,
}

const ScheduleRow: FC<Props> = ({ idx }) => {
  if (idx == 0) {
    return (
      <tr>
        <thead>
          <th></th>
        </thead>
      </tr>
    )
  }
  return (
    <tr>
      
    </tr>
  )
};

export default ScheduleRow;
