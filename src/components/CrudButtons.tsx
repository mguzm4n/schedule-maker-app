import { OptionBtnState } from "../App";
import { FC, Dispatch } from 'react';

interface Props {
  setBtns: Dispatch<OptionBtnState[]>
  btns: OptionBtnState[]
}

const CrudButtons: FC<Props> = ({ btns, setBtns }) => {
  const handleBtnSectionClick = (option: OptionBtnState) => {
    const newBtns = [...btns];
    btns.forEach(btn => {
      if (btn.name === option.name) {
        btn.selected = !option.selected;
      } else if (btn.selected) {
        btn.selected = false;
      }
    });
    setBtns(newBtns);
  }

  return (
    <div className="flex flex-col gap-2">
      {btns.map((option) => (<div key={option.id} >
        <button  onClick={() => handleBtnSectionClick(option)}
          className={`
            btn-section
            ${option.selected ? 'underline underline-offset-4 bg-blue-600 border-b-blue-500 hover:border-b-blue-600' : ''}
          `}>
          {option.icon} { option.name }
        </button>
        { option.selected && option.crudComponent() }
      </div>))
      }
    </div>
  )
};

export default CrudButtons;
