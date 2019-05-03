import { Form, Input, Icon, Button, message } from 'antd';
import style from './index.css';

let id = 0;

export default Form.create({ name: 'select_occupation' })(
  ({form, onSubmit, initialOccupations}) => {

    const remove = (k) => {
      // can use data-binding to get
      const keys = form.getFieldValue('keys');
      // We need at least one passenger
      if (keys.length === 1) {
        return;
      }

      // can use data-binding to set
      form.setFieldsValue({
        keys: keys.filter(key => key !== k),
      });
    };

    const add = () => {
      // can use data-binding to get
      const keys = form.getFieldValue('keys');
      const nextKeys = keys.concat(id++);
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: nextKeys,
      });
    };


    const handleSubmit = (e) => {
      e.preventDefault();
      form.validateFields((err, values) => {
        if (!err) {
          const { keys, names } = values;
          const occupations = keys.map(key => names[key]);
          if (occupations.length) {
            onSubmit(occupations);
          } else {
            message.error('请输入至少一个 "职业" 来进行后续的测评');
          }
        }
      });
    };


    const { getFieldDecorator, getFieldValue } = form;

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');

    return (
      <Form onSubmit={handleSubmit}>
        {
          keys.map((k, index) => (
            <Form.Item
              required={false}
              key={k}
            >
              {getFieldDecorator(`names[${k}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{
                  required: true,
                  whitespace: true,
                  message: '请输入职业名称，或者删除该职业',
                }],
              })(
                <Input placeholder="要评测的职业" style={{ width: '60%', marginRight: 8 }}/>,
              )}
              {keys.length > 1 ? (
                <Icon
                  className={style.dynamicDeleteButton}
                  type="minus-circle-o"
                  onClick={() => remove(k)}
                />
              ) : null}
            </Form.Item>
          ))
        }
        <Form.Item>
          <Button type="dashed" onClick={add} style={{ width: '60%' }}>
            <Icon type="plus"/> 添加更多职业
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">开始测评</Button>
        </Form.Item>
      </Form>
    );
  }
);
