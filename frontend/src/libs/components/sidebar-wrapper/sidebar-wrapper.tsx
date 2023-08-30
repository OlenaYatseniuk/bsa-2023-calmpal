import { Sidebar } from '#libs/components/components.js';

import { SIDEBAR_ROUTES } from './libs/constants.js';
import styles from './styles.module.scss';

type Properties = {
  children: React.ReactNode;
};

const SidebarWrapper: React.FC<Properties> = ({ children }) => {
  return (
    <div className={styles['app']}>
      <Sidebar routes={SIDEBAR_ROUTES} />
      <div className={styles['body']}>{children}</div>
    </div>
  );
};

export { SidebarWrapper };
