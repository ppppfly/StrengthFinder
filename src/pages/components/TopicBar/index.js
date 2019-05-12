import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Icon, Typography, Modal } from 'antd';

import style from './index.css';

const { Title } = Typography;


export default function({ data }) {

  const onClick = () => {

    Modal.info({
      title: '平均数 和 标准差 的分析',
      content: (
        <div>
          <h4>平均数</h4>
          <p>平均数，代表主题内天赋的平均分数。</p>
          <p>通过对比不同主题的平均数，可以知道，你在哪个主题上，更加有优势。</p>
          <p>一般来说，如果主题的平均数不是差别特别大，可以不用特别关注。</p>
          <h4>标准差</h4>
          <p>标准差，表示一个主题中，天赋分数与平均分数的平均差距。</p>
          <p>这个数值越大，表示同一主题里面的天赋分数差异越大。</p>
          <p>这通常表明，该主题中，你最高分的优势和最低分的优势，有很大的差距。</p>
          <p>此时，你应该看看，是否存在某个优势，成为了你的短板，拖垮了整个主题的优势，甚至抵消了你最强大的优势。</p>
        </div>
      ),
      onOk() {},
    });

  };

  return (
    <div className={style.container}>

      <Title level={1}>平均数值 和 标准差 <Icon type="question-circle" onClick={onClick}/></Title>

      <ResponsiveContainer aspect={1.98}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="topic"/>
          <YAxis yAxisId="stdev" orientation="left" stroke="#8884d8"/>
          <YAxis yAxisId="avg" orientation="right" stroke="#82ca9d"/>
          <Tooltip/>
          <Legend/>
          <Bar yAxisId="stdev" dataKey="stdev" fill="#8884d8" name={'标准差'}/>
          <Bar yAxisId="avg" dataKey="avg" fill="#82ca9d" name={'平均'}/>
        </BarChart>
      </ResponsiveContainer>
    </div>

  );
}
