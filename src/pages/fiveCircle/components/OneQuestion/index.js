import { Checkbox } from 'antd';
import style from './index.css';

const CheckboxGroup = Checkbox.Group;

export default ({question, occupations, onChange, index}) => {

  let options = occupations.map((value, idx) => ({label: value, value: idx}));

  return (
    <div>
      <div>
        {index + 1}. {question.q}
      </div>
      <CheckboxGroup
        options={options}
        onChange={
          checkedValues => onChange(question.id, checkedValues)
        }
        className={style.checkboxGroup}
      />
    </div>
  );
};
