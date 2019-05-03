import { Button, Checkbox, Form } from 'antd';
import style from './index.css';

const CheckboxGroup = Checkbox.Group;

export default ({question, occupations, onChange}) => {

  let options = occupations.map((value, idx) => ({label: value, value: idx}));

  return (
    <div>
      <div>
        {question.id}. {question.q}
      </div>
      <CheckboxGroup
        options={options}
        onChange={
          checkedValues => onChange(question.id, checkedValues)
        }
        className={style.checkboxGroup}
      />
      <div className="App">
        <Form questions={this.gen_question_data()} onChange={this.onChange.bind(this)}/>
        <Button type="primary" onClick={this.goToResultPage.bind(this)} style={{ margin: '50px' }}>
          提交报告 生成测试结果
        </Button>
      </div>
    </div>
  );
};
