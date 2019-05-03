import { connect } from 'dva';
import { Component } from 'react';
import router from 'umi/router';
import TopHeader from '../../components/TopHeader';
import OneQuestion from './components/OneQuestion';
import { version } from '@/../package';
import { List, Button } from 'antd';
import { random_arr } from '@/lib/utils';

class Accessment extends Component {

  constructor(props) {
    super(props);
    // J检查是否有 occupation 的选择
    if (!props.occupations.length) {
      router.goBack();
    }
    // 这里保存 乱序的问题，防止每次 render 都打乱一次顺序
    this.state = {
      random_questions: random_arr([...props.questions]),
    };
  }

  onChange(questionId, selectedOccupations) {
    this.props.dispatch({
      type: 'FCQuestions/setChoices',
      payload: { questionId, selectedOccupations },
    });
  }

  onSubmit(e) {

  }

  render() {

    const { occupations } = this.props;

    return (
      <TopHeader title={`五环测评 ${version}`} subTitle="比对最合适的发展领域">
        <List
          itemLayout="horizontal"
          dataSource={this.state.random_questions}
          renderItem={(question, idx) => (
            <List.Item>
              <OneQuestion
                question={question}
                occupations={occupations}
                onChange={this.onChange.bind(this)}
                index={idx}
              />
            </List.Item>
          )}
          style={{ padding: '10px', textAlign: 'left' }}
        />

        <Button type="primary" onClick={this.onSubmit.bind(this)} style={{ margin: '40px' }}>
          提交报告 生成测试结果
        </Button>

      </TopHeader>
    );
  }

}

export default connect(
  state => {
    const { questions, occupations, selects } = state.FCQuestions;
    return { questions, occupations, selects };
  },
)(Accessment);
