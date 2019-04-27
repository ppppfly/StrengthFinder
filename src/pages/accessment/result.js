import { connect } from 'dva';

import TopHeader from '../../components/TopHeader';
import TopicTable from '../../components/TopicTable';
import { Col, Row } from 'antd';

function Result({ dispatch, scopes, belong, topic, talents }) {


  function categoryAndSort() {

    let categories = [[], [], [], []];

    for (let i in scopes) {

      let topic_idx = belong[i];

      categories[topic_idx].push({
        talent: talents[i],
        scope: scopes[i]
      })

    }

    return categories

  }

  return (
    <TopHeader title="测评结果" subTitle="v.1.3.0">
      <Row gutter={2}>
        {
          categoryAndSort().map((value, index)=>(
            <Col key={index} span={6} >
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
  const { scopes, belong, topic, talents } = state.scopes;
  return {
    scopes, belong, topic, talents
  };
}

export default connect(mapStateToProps)(Result);
