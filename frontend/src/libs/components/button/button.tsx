import { getValidClassNames } from '#libs/helpers/helpers.js';
import { type IconName } from '#libs/types/icon-name.type.js';

import { Icon } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  label: string;
  type?: 'button' | 'submit';
  iconName?: IconName;
  style?: 'primary' | 'secondary' | 'rounded' | 'rounded-transparent';
  isLoading?: boolean;
  isDisabled?: boolean;
  isLabelVisuallyHidden?: boolean;
  onClick?: () => void;
};

const Button: React.FC<Properties> = ({
  type = 'button',
  label,
  iconName,
  style = 'primary',
  isLoading = false,
  isDisabled = false,
  isLabelVisuallyHidden = false,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={styles[style]}
      onClick={onClick}
      disabled={isDisabled || isLoading}
    >
      {isLoading && <span className={styles['loader']} />}
      {iconName && <Icon name={iconName} />}
      <span
        className={getValidClassNames(
          '',
          isLabelVisuallyHidden && 'visually-hidden',
        )}
      >
        {label}
      </span>
    </button>
  );
};

export { Button };
