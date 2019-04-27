import styles from './index.css';
import { Table, Typography } from 'antd';
const { Title, Paragraph, Text } = Typography;

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
  }];

  return (
    <div className={styles.container}>
      <Title level={2}>{title}</Title>
      <Paragraph>{desc}</Paragraph>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </div>
  );
}
