import { Table, Tag, Tooltip } from 'antd';
const colors = ['gold', 'orange', 'volcano'];
const render = scope => scope > 2 ?
  (
    <Tooltip placement="topLeft" title="高于 2 分，才算做一环" arrowPointAtCenter>
      <Tag color={colors[scope - 3]}>{scope}</Tag>
    </Tooltip>
  )
  : scope;
const columns = [{
  title: '领域',
  dataIndex: 'occupation',
  key: 'occupation',
}, {
  title: '环数',
  dataIndex: 'circleLength',
  key: 'circleLength',
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.circleLength - b.circleLength,
  render: count => <Tooltip title="低于 3 分的主题，不计算环数">{count}</Tooltip>,
}, {
  title: '天赋',
  dataIndex: 'talent',
  key: 'talent',
  sorter: (a, b) => a.talent - b.talent,
  render: render
}, {
  title: '自信',
  dataIndex: 'confidence',
  key: 'confidence',
  sorter: (a, b) => a.confidence - b.confidence,
  render: render
}, {
  title: '兴趣',
  dataIndex: 'interest',
  key: 'interest',
  sorter: (a, b) => a.interest - b.interest,
  render: render
}, {
  title: '专注',
  dataIndex: 'focus',
  key: 'focus',
  sorter: (a, b) => a.focus - b.focus,
  render: render
}, {
  title: '满足',
  dataIndex: 'satisfaction',
  key: 'satisfaction',
  sorter: (a, b) => a.satisfaction - b.satisfaction,
  render: render
}];



export default ({scopes, occupations}) => {

  // 生成数据
  const mapper = (value, index) => {

    return {
      occupation: occupations[index],
      circleLength: [...value].reduce((count, scope) => scope > 2 ? count + 1 : count, 0),
      talent: value[0],
      confidence: value[1],
      interest: value[2],
      focus: value[3],
      satisfaction: value[4],
    }
  };
  const data = scopes.map(mapper);

  return <Table columns={columns} dataSource={data} pagination={false} size="small" />;
};
