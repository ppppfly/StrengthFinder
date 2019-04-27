import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Modal, Table } from 'antd';
import router from 'umi/router';
// import writeJsonFile from 'write-json-file';

import './index.css';

import Form from '../../components/Form';
import TopHeader from '../../components/TopHeader';


function random_arr(arr) {
  for (let i = 1; i < arr.length; i++) {
    const random = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[random]] = [arr[random], arr[i]];
  }
  return arr;
}

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

  count_down(idx, scope_list, scope, mode) {

    const { mapping } = this.props;

    for (let _idx in mapping[idx]) {
      let point = mapping[idx][_idx];

      if (point[1] !== mode) continue;

      scope_list[point[0]] += scope * point[1] + 1;
    }
  }

  get_result() {
    const { selects, talents, mapping } = this.props;

    let check_mode = false;
    let lack_question_idx = [];
    let scope_list = Array(talents.length).fill(0);

    for (let idx in selects) {
      let scope = selects[idx];

      if (scope == null) {

        if (!check_mode) check_mode = true;

        lack_question_idx.push(parseInt(idx) + 1);

      } else if (check_mode) {
        continue;
      }

      if (scope === 0) {

        for (let _idx in mapping[idx]) {
          let point = mapping[idx][_idx];
          scope_list[point[0]]++;
        }

      } else if (scope < 0) {

        this.count_down(idx, scope_list, scope, -1);

      } else if (scope > 0) {

        this.count_down(idx, scope_list, scope, 1);

      } else {
        check_mode = true;
      }

    }

    if (lack_question_idx.length) {

      // 若发现还有没有做完的题目，则报错
      Modal.error({
        title: '请完成所有的题目',
        content: (
          lack_question_idx.map((value, idx) =>
            (<span key={idx} style={{
              backgroundColor: '#212121',
              color: '#fff',
              marginRight: '10px',
            }}>{value}</span>))
        ),
      });

    } else {

      // 仅在全部题目都完成的情况下，才显示 Modal
      this.setState({
        scope_list,
        visible: true,
      });

    }

  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  showResult() {

    const { talents, topic, belong, talent_count } = this.props;

    const data = this.state.scope_list.map(
      (val, idx) => ({
        name: talents[idx],
        scope: parseInt(val * 1000 / talent_count[idx]),
        index: parseInt(idx) + 1,
        topic: topic[belong[idx]],
        belong: belong[idx],
      }));

    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        sorter: (a, b) => a.index - b.index,
      },
      {
        title: '主题',
        dataIndex: 'topic',
        sorter: (a, b) => a.belong - b.belong,
        filters: topic.map((value, idx) => ({ text: value, value: idx })),
        onFilter: (value, record) => record.belong === value,
      },
      {
        title: '优势',
        dataIndex: 'name',
      },
      {
        title: '分数',
        dataIndex: 'scope',
        sorter: (a, b) => a.scope - b.scope,
      },
    ];

    return (
      <Table rowKey='index'
             columns={columns} dataSource={data}
             size="small" pagination={false}/>
    );

  }

  goToResultPage() {

    const { dispatch, selects, questions } = this.props;
    const { random_questions } = this.state;


    // 漏题检查开始：是否有漏做的题目
    let lack_question_idx = [];
    for (let idx in random_questions) {

      let question = random_questions[idx];

      if (selects[question.id-1] == null) {
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

    router.push('/accessment/result');

  }

  render = () => (
    <TopHeader title="公益人优势测评 v.1.3.0" subTitle="寻找你的优势领域">
      <div className="App">
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
