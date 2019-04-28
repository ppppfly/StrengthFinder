import { connect } from 'dva';

import TopHeader from '../../components/TopHeader';
import TopicTable from '../../components/TopicTable';
import { Col, Row } from 'antd';

function Result({ dispatch, scopes, belong, topic, talents, first_10_scope, first_500_scope }) {


  function categoryAndSort() {
    // 找出前 10 项优势

    let categories = [[], [], [], []];

    for (let i in scopes) {

      let topic_idx = belong[i];

      categories[topic_idx].push({
        talent: talents[i],
        scope: scopes[i],
        color: scopes[i] < 1000 ? 'lime' : null,
        is_first_10th: scopes[i] >= first_10_scope,
        is_first_500: scopes[i] >= first_500_scope,
      })

    }

    return categories

  }

  return (
    <TopHeader title="测评结果" subTitle="v.1.3.0">
      <Row gutter={2}>
        {
          categoryAndSort().map((value, index)=>(
            <Col key={index} xs={24} lg={6} style={{marginTop: '50px'}}>
              <TopicTable
                data={value}
                title={topic[index][0]}
                desc={topic[index][1]}
              />
            </Col>
          ))
        }
      </Row>
    </TopHeader>
  );
}

function mapStateToProps(state) {
  const { scopes, belong, topic, talents, first_10_scope, first_500_scope } = state.scopes;
  return {
    scopes, belong, topic, talents, first_10_scope, first_500_scope
  };
}

export default connect(mapStateToProps)(Result);
