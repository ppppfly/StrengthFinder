import {jStat} from 'jStat';

import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Col, Drawer, Row } from 'antd';

import talent_desc from '@/lib/talents';


import TopHeader from '@/components/TopHeader';
import TopicTable from './components/TopicTable';
import TalentTable from './components/TalentTable';
import TopicBar from './components/TopicBar';


class Result extends Component {

  constructor(props) {
    super(props);
    this.state = {
      scope_list_visible: false,
      topic_scopes_data: this.categoryAndSort(),
      talent_scopes_list: this.scopeListData(),
    };
    this.state.topic_aggregation_data = this.topicBarData();
  }

  categoryAndSort() {

    const { scopes, belong, talents, first_10_scope, first_500_scope } = this.props;

    const reducer = (categories, scope, idx) => {

      categories[belong[idx]].push({
        talent: talents[idx],
        scope: scope,
        color: scope < 1000 ? 'lime' : null,
        is_first_10th: scope >= first_10_scope,  // 找出前 10 项优势
        is_first_500: scope >= first_500_scope,  // 找出前 500 分优势
        desc: talent_desc[idx],  // 获得天赋的说明内容
      });

      return categories
    };

    return scopes.reduce(reducer, [[], [], [], []]);

  }

  scopeListData() {
    const { scopes, topic, belong, talents, first_10_scope, first_500_scope } = this.props;

    const mapper = (value, idx) => ({
      talent: talents[idx],
      scope: value,
      color: value < 1000 ? 'lime' : null,
      is_first_10th: value >= first_10_scope,
      is_first_500: value >= first_500_scope,
      belong: belong[idx],
      topic: topic[belong[idx]][0],
    });

    return scopes.map(mapper);
  }

  topicBarData() {

    const {topic} = this.props;
    const {topic_scopes_data} = this.state;

    const mapper = (talent_list, idx) => {
      const scopes = talent_list.map(value => value.scope);
      return {
        topic: topic[idx][0],
        stdev: Math.round(jStat.stdev(scopes)),
        avg: Math.round(jStat.mean(scopes)),
      }
    };

    return topic_scopes_data.map(mapper);
  }

  render() {

    const { topic } = this.props;
    const { topic_scopes_data, talent_scopes_list, topic_aggregation_data } = this.state;

    return (
      <TopHeader
        title="测评结果"
        subTitle="v.1.3.0"
        extra={
          <Button
            onClick={()=>this.setState({scope_list_visible: true})}
            shape="circle"
            icon="ordered-list"
            size="small"
          />
        }
      >

        <Drawer
          title="天赋分数 列表"
          placement="right"
          width={360}
          onClose={()=>this.setState({scope_list_visible: false})}
          visible={this.state.scope_list_visible}
        >
          <TalentTable data={talent_scopes_list}/>
        </Drawer>

        <Row>
          <TopicBar data={topic_aggregation_data} />
        </Row>

        <Row gutter={2} style={{ 'padding': '5px' }}>
          {
            topic_scopes_data.map((value, index) => (
              <Col key={index} xs={24} lg={6} style={{ marginTop: '50px' }}>
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
}

function mapStateToProps(state) {
  const { scopes, belong, topic, talents, first_10_scope, first_500_scope } = state.scopes;
  return {
    scopes, belong, topic, talents, first_10_scope, first_500_scope
  };
}

export default connect(mapStateToProps)(Result);
