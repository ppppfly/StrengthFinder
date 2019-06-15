import styles from './index.css';
import { List, Popover, Typography } from 'antd';

const { Title, Paragraph } = Typography;

export default function({talent, description}) {

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

  return (
    <Popover trigger='click' content={talent_desc(description)}>
      <span className={styles.talent_name}>{talent}</span>
    </Popover>
  );
}
