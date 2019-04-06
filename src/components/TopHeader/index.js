import { PageHeader } from 'antd';
import router from 'umi/router';
import styles from './index.css';


function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      <PageHeader
        title={props.title}
        subTitle={props.subTitle}
        onBack={router.goBack}
      />
      {props.children}
    </div>
  );
}

export default BasicLayout;
