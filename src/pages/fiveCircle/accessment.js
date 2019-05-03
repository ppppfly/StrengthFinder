import { connect } from 'dva';
import styles from './accessment.css';

export default connect(
  state => {
    const {questions, occupations, selects} = state.FCQuestions;
    return {questions, occupations, selects}
  }
)(
  ({questions, occupations, selects}) => {

    

    return (
      <div className={styles.normal}>
        <h1>Page accessment</h1>
      </div>
    );
  }
);
