import { Icon, Table, Tag, Tooltip } from 'antd';


export default function({data}) {

  function sorter(a, b) {
    let nameA = a.toUpperCase(); // ignore upper and lowercase
    let nameB = b.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  }

  const columns = [
    {
      title: '天赋',
      dataIndex: 'talent',
      key: 'talent',
    },
    {
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
              <Icon type="star" theme="twoTone" style={{ marginRight: '5px' }}/>
            </Tooltip>
          }
          {
            record.is_first_500 &&
            <Tooltip placement="topLeft" title="前 500 分的优势" arrowPointAtCenter>
              <Icon type="smile" theme="twoTone" twoToneColor="#eb2f96"/>
            </Tooltip>
          }
      </span>
      ),
    },
    {
      title: '主题',
      dataIndex: 'topic',
      key: 'topic',
      sorter: (a, b) => sorter(a.topic, b.topic)
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      // size="small"
    />
  );
}
