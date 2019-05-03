import React from 'react';
import { Col, List, Radio, Row } from 'antd';

const Form = ({ onChange, questions }) => {

  return (
    <List
      dataSource={questions}
      renderItem={item => (<List.Item>
        <List.Item.Meta title={item.index}/>
        <Row style={{ width: '100%' }}>

          <Col span={7}>{item.q1}</Col>
          <Col span={9}>
            <Radio.Group onChange={onChange(item.id - 1)} value={item.select}>
              <Radio value={-2}/>
              <Radio value={-1}/>
              <Radio value={0}/>
              <Radio value={1}/>
              <Radio value={2}/>
            </Radio.Group>
          </Col>
          <Col span={7}>{item.q2}</Col>

        </Row>

      </List.Item>)
      }
      style={{padding: "0 15px"}}
    />
  );
};

export default Form;
