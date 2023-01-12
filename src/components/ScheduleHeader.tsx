import { useState, useEffect, useRef, CSSProperties, FC, RefObject } from "react";
import { days } from "../data";

type CSSHeights = CSSProperties & {
  "--headerHeight": string,
  "--headerLineHeight": string,
};

const initialHeight: CSSHeights = { 
  "--headerHeight": "0px",
  "--headerLineHeight": "0px",
};

interface Props {
  tableBodyRef: RefObject<HTMLTableSectionElement>,
}

const ScheduleHeader: FC<Props> = ({ tableBodyRef }) => {
  const [heights, setHeights] = useState(initialHeight);

  const headerHeightRef = useRef<HTMLTableCellElement>(null);
  const headerTags = ['Bloque', ...days];

  useEffect(() => {
    if (headerHeightRef.current !== null && tableBodyRef.current !== null) {
      const headerHeight = headerHeightRef.current.offsetHeight;
      const headerLineHeight = tableBodyRef.current.offsetHeight;
      setHeights({ 
        "--headerHeight": `${headerHeight}px`, 
        "--headerLineHeight": `${headerLineHeight}px` 
      });
    }
  }, [headerHeightRef.current, tableBodyRef.current]);

  return (
    <thead>
      <tr className="">
        {headerTags.map((day, idx) => {
          if (idx == 0) {
            return <th key={day} ref={headerHeightRef} className="w-10 bg-transparent">
            </th>
          }
          return <th style={ heights } className="line pt-6 pb-1 px-2 bg-white" key={day}>
            <p className="uppercase text-center">{ day }</p>
          </th>
        })}  
      </tr>
    </thead>
  )
};

export default ScheduleHeader;
