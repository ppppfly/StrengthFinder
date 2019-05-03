import { connect } from 'dva';
import React, { Component } from 'react';
import TopHeader from '../../components/TopHeader';
import TopicTable from './components/TopicTable';
import TalentTable from './components/TalentTable';
import { Button, Col, Drawer, Row } from 'antd';


class Result extends Component {

  constructor(props) {
    super(props);
    this.state = {
      scope_list_visible: false,
    };
  }

  categoryAndSort() {
    // 找出前 10 项优势

    const { scopes, belong, talents, first_10_scope, first_500_scope } = this.props;

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

  scopeListData() {
    const { scopes, topic, belong, talents, first_10_scope, first_500_scope } = this.props;

    let scope_list = [];

    for (let i in scopes) {

      let topic_idx = belong[i];

      scope_list.push({
        talent: talents[i],
        scope: scopes[i],
        color: scopes[i] < 1000 ? 'lime' : null,
        is_first_10th: scopes[i] >= first_10_scope,
        is_first_500: scopes[i] >= first_500_scope,
        belong: topic_idx,
        topic: topic[topic_idx][0]
      })

    }

    return scope_list
  }

  scopeListDrawerClose() {
    this.setState({scope_list_visible: false})
  }

  scopeListDrawerShow() {
    this.setState({scope_list_visible: true})
  }

  render() {

    const { topic } = this.props;

    return (
      <TopHeader
        title="测评结果"
        subTitle="v.1.3.0"
        extra={
          <Button
            onClick={this.scopeListDrawerShow.bind(this)}
            shape="circle"
            icon="ordered-list"
            size="small"
          />
        }
      >
        <Row gutter={2} style={{ 'padding': '5px' }}>
          {
            this.categoryAndSort().map((value, index) => (
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
        <Drawer
          title="天赋分数 列表"
          placement="right"
          width={360}
          onClose={this.scopeListDrawerClose.bind(this)}
          visible={this.state.scope_list_visible}
        >

          <TalentTable data={this.scopeListData()}/>

        </Drawer>
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
