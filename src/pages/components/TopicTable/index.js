import styles from './index.css';
import { Table, Typography, Tag, Icon, Tooltip, List } from 'antd';
import PopoverTalent from '../PopoverTalent';

const { Title, Paragraph } = Typography;

export default function({data, title, desc}) {

  const talent_desc = (desc) => (
    <Typography className={styles.desc_container}>
      <Title>{desc.name}</Title>
      <Paragraph>{desc.description}</Paragraph>
      <Title level={2}>典型案例</Title>
      <List
        itemLayout="horizontal"
        size="small"
        dataSource={desc.example}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={<h4>{item.name} <span className={styles.job_title}>( {item.job} )</span></h4>}
              description={item.speech}
            />
          </List.Item>
        )}
      />
      <Title level={2}>行动建议</Title>
      <Paragraph>
        <ol>{
          desc.recommendation.map(item => <li>{item}</li>)
        }</ol>
      </Paragraph>
      <Title level={2}>如何共事</Title>
      <Paragraph>
        <ol>{
          desc.cooperation.map(item => <li>{item}</li>)
        }</ol>
      </Paragraph>
    </Typography>
  );

  const columns = [{
    title: '天赋',
    dataIndex: 'talent',
    key: 'talent',
    render: (talent, record, idx) => <PopoverTalent talent={talent} description={record.desc}/>,
  }, {
    title: '分数',
    dataIndex: 'scope',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.scope - b.scope,
    render: (scope, record, index) => (
      <span>
        {

          record.color ? (
            <Tooltip placement="topLeft" title="少于 1000 分的优势" arrowPointAtCenter>
              <Tag color={record.color} key={scope}>{scope}</Tag>
            </Tooltip>
          ) : (
            <Tag key={scope}>{scope}</Tag>
          )

        }

        {
          record.is_first_10th &&
          <Tooltip placement="topLeft" title="前 10 的优势" arrowPointAtCenter>
            <Icon type="star" theme="twoTone" style={{marginRight: '5px'}}/>
          </Tooltip>
        }
        {
          record.is_first_500 &&
          <Tooltip placement="topLeft" title="前 500 分的优势" arrowPointAtCenter>
            <Icon type="smile" theme="twoTone" twoToneColor="#eb2f96" />
          </Tooltip>
        }
      </span>
    ),
  }];

  return (
    <div className={styles.container}>

      <Table
        title={() => (<div><Title level={2}>{title}</Title><Paragraph>{desc}</Paragraph></div>)}
        columns={columns}
        dataSource={data}
        pagination={false}
        size="small"
      />
    </div>
  );
}
