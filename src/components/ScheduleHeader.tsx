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
            return <th key={day} ref={headerHeightRef} className="w-5 px-4 bg-transparent">
            </th>
          }
          return <th key={day} style={ heights } className="line w-32 px-2 pt-6 pb-1 bg-white">
            <p className="uppercase tracking-tighter text-slate-700 text-center font-[MonserratSB] truncate">
              { day }
            </p>
          </th>
        })}  
      </tr>
    </thead>
  )
};

export default ScheduleHeader;
