import styles from './index.css';
import { Table, Typography, Tag, Icon, Tooltip } from 'antd';

const { Title, Paragraph } = Typography;

export default function({data, title, desc}) {

  const columns = [{
    title: '天赋',
    dataIndex: 'talent',
    key: 'talent',
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
      <Title level={2}>{title}</Title>
      <Paragraph>{desc}</Paragraph>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        size="small"
      />
    </div>
  );
}
