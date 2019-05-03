import OccupationSelectors from './components/OccupationSelectors';
import { version } from '../../../package.json';
import {Row, Col} from 'antd';
import style from './index.css'

import TopHeader from '../../components/TopHeader';


export default function() {
  return (
    <TopHeader title={`五环优势测评 ${version}`} subTitle="比对你目前最合适的发展领域">
      <Row>
        <Col xs={24} lg={12} className={style.normalCol}>
          <OccupationSelectors/>
        </Col>
      </Row>
    </TopHeader>
  );
}
