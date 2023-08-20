import logo from '#assets/img/logo.svg';
import { Link } from '#libs/components/components.js';
import { AppRoute } from '#libs/enums/enums.js';

import styles from './styles.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to={AppRoute.ROOT}>
          <img src={logo} width={56} height={56} alt="logo" />
        </Link>
      </nav>
      <nav className={styles.nav}>
        <Link to={AppRoute.SIGN_IN}>Sign In</Link>
      </nav>
    </header>
  );
};

export { Header };
