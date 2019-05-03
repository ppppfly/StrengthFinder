import { connect } from 'dva';
import router from 'umi/router';
import TopHeader from '../../components/TopHeader';
import OneQuestion from './components/OneQuestion';
import { version } from '../../../package';
import { List } from 'antd';


export default connect(
  state => {
    const {questions, occupations, selects} = state.FCQuestions;
    return {questions, occupations, selects}
  }
)(
  ({dispatch, questions, occupations, selects}) => {

    // J检查是否有 occupation 的选择
    if (!occupations.length) {
      router.back()
    }

    console.log(selects);


    function onChange(questionId, selectedOccupations) {
      dispatch({
        type: 'FCQuestions/setChoices',
        payload: { questionId, selectedOccupations }
      })
    }

    return (
      <TopHeader title={`五环测评 ${version}`} subTitle="比对最合适的发展领域">
        <List
          itemLayout="horizontal"
          dataSource={questions}
          renderItem={question => (
            <List.Item>
              <OneQuestion
                question={question}
                occupations={occupations}
                onChange={onChange}
              />
            </List.Item>
          )}
          style={{padding: '10px', textAlign: 'left'}}
        />

      </TopHeader>
    );
  }
);
