import TopHeader from '../../components/TopHeader';
import {Card, Button} from 'antd';


const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

const de = () => {
  const delay = (timeout) => {
    return new Promise(resolve => {
      console.log('---> promise');
      setTimeout(resolve, timeout)
    })
  };

  delay(2000).then(_ => {
    console.log('executed');
  });
};

export default function() {
  return (
    <TopHeader title="测评结果" subTitle="v.1.3.0">
      <Card title="测评结果">
        <Card.Grid style={gridStyle}>Content</Card.Grid>
        <Card.Grid style={gridStyle}>Content</Card.Grid>
        <Card.Grid style={gridStyle}>Content</Card.Grid>
        <Card.Grid style={gridStyle}>Content</Card.Grid>
      </Card>
      <Button onClick={de}>延迟处理</Button>
    </TopHeader>
  );
}
