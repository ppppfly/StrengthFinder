import OccupationSelectors from './components/OccupationSelectors';
import { version } from '../../../package.json';
import { connect } from 'dva';
import { Row } from 'antd';
import TopHeader from '../../components/TopHeader';
import ReactMarkdown from 'react-markdown';
import style from './index.css';
import router from 'umi/router';


export default connect(
  state => {

    const { occupations } = state.FCQuestions;

    return { occupations };
  },
)(
  ({ dispatch, occupations }) => {


    const onOccupationSelect = occupations => {
      dispatch({
        type: 'FCQuestions/saveOccupations',
        payload: { occupations },
      });

      router.push('/fiveCircle/accessment');
    };

    const introduce = '' +
      '## 漫五环优势领域定位工具\n' +
      '各位亲爱的同学们，大家好！我是神之业老师。\n\n' +
      '我想大家能够进入这一堂课，一定已经完成了匠人天赋的鉴别测试，清楚了自己与生俱来的天赋。' +
      '接下来这一步就是要根据自己的天赋来确定自己的优势领域，' +
      '这决定了你将要让你的天赋在哪一个领域得到深度的发展，从而使自己的天赋价值最大化。\n\n';

    return (
      <TopHeader title={`五环测评 ${version}`} subTitle="比对最合适的发展领域">

        <div className={style.introduce}>

          <ReactMarkdown source={introduce}/>
        </div>

        <Row style={{marginTop: '25px'}}>
          <OccupationSelectors onSubmit={onOccupationSelect} initialOccupations={occupations}/>
        </Row>
      </TopHeader>
    );
  },
);
