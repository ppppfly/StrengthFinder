import { connect } from 'dva';

import CircleTable from './components/CircleTable';
import styles from './result.css';
import TopHeader from '@/components/TopHeader';
import { version } from '../../../package';


export default connect(
  state => {

    const { scopes, occupations } = state.FCScopes;

    return { scopes, occupations };
  },
)(
  ({ dispatch, scopes, occupations }) => {

    return (
      <TopHeader title={`五环测评结果 ${version}`}>

        <div className={styles.normal}>
          <CircleTable scopes={scopes} occupations={occupations}/>
        </div>

      </TopHeader>
    );
  },
);
