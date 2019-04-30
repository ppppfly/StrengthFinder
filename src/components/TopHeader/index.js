import { PageHeader } from 'antd';
import router from 'umi/router';
import styles from './index.css';


function BasicLayout({title, subTitle, extra, children}) {
  return (
    <div className={styles.normal}>
      <PageHeader
        title={title}
        subTitle={subTitle}
        onBack={router.goBack}
        extra={extra}
      />
      {children}
    </div>
  );
}

export default BasicLayout;
