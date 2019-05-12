import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Modal, Typography, BackTop } from 'antd';
import router from 'umi/router';
import { version } from '@/../package.json';
import style from './index.css';

import Form from './components/Form';
import TopHeader from '@/components/TopHeader';
import {random_arr} from '@/lib/utils';

const { Title, Paragraph  } = Typography;

class Accessment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      scope_list: [],
      random_questions: random_arr([...props.questions]),
    };
  }

  onChange(idx) {
    const { dispatch } = this.props;

    function set(e) {
      dispatch({
        type: 'questions/select',
        payload: {
          idx: idx,
          value: e.target.value,
        },
      });
    }

    return set;
  }

  gen_question_data() {
    const { selects } = this.props;
    const { random_questions } = this.state;

    return random_questions.map((value, idx) => {
      return {
        index: idx + 1,
        q1: value.q[0],
        id: value.id,
        select: selects[value.id - 1],
        q2: value.q[1],
      };
    });
  }

  goToResultPage() {

    const { dispatch, selects, questions } = this.props;
    const { random_questions } = this.state;


    // 漏题检查开始：是否有漏做的题目
    let lack_question_idx = [];
    for (let idx in random_questions) {

      let question = random_questions[idx];

      if (selects[question.id - 1] == null) {
        lack_question_idx.push(parseInt(idx) + 1);
      }
    }

    // 若发现还有没有做完的题目，则报错
    if (lack_question_idx.length) {
      Modal.error({
        title: '请完成所有的问题',
        content: (
          <div>
            <h4 style={{ color: 'red' }}>以下问题，尚未填选：</h4>
            {
              lack_question_idx.map((value, idx) => (
                <span key={idx} style={{
                  backgroundColor: '#212121',
                  color: '#fff',
                  marginRight: '10px',
                }}>{value}</span>),
              )
            }
          </div>
        ),
      });
      return;
    }
    // 漏题检查结束

    dispatch({
      type: 'scopes/calculate',
      payload: { selects, questions },
    });

    router.push('/result');

  }

  render = () => (
    <TopHeader title={`公益人优势测评 ${version}`} subTitle="寻找你的优势领域">

      <BackTop />

      <Typography>
        <Title level={2}>匠人天赋的鉴别测试</Title>
        <Paragraph>
          五环优势测试
        </Paragraph>
      </Typography>

      <div className={style.App}>
        <Form questions={this.gen_question_data()} onChange={this.onChange.bind(this)}/>
        <Button type="primary" onClick={this.goToResultPage.bind(this)} style={{ margin: '50px' }}>
          提交报告 生成测试结果
        </Button>
      </div>
    </TopHeader>
  );
}

function mapStateToProps(state) {
  const { topic, talents, belong, questions, selects } = state.questions;
  return { topic, talents, belong, questions, selects };
}

export default connect(mapStateToProps)(Accessment);
