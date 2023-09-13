import { type IconColor } from '#libs/enums/enums.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import {
  type ButtonStyle,
  type IconName,
  type ValueOf,
} from '#libs/types/types.js';

import { Icon } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  label?: string;
  type?: 'button' | 'submit';
  iconName?: IconName;
  iconColor?: ValueOf<typeof IconColor>;
  style?: ButtonStyle[];
  isLoading?: boolean;
  isDisabled?: boolean;
  isLabelVisuallyHidden?: boolean;
  onClick?: () => void;
};

const Button: React.FC<Properties> = ({
  type = 'button',
  label,
  iconName,
  iconColor,
  style = ['primary'],
  isLoading = false,
  isDisabled = false,
  isLabelVisuallyHidden = false,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={getValidClassNames(
        ...style.map((s) => {
          return styles[s];
        }),
      )}
      onClick={onClick}
      disabled={isDisabled || isLoading}
    >
      {isLoading && <span className={styles['loader']} />}
      {iconName && <Icon name={iconName} color={iconColor} />}
      <span
        className={getValidClassNames(
          isLabelVisuallyHidden && 'visually-hidden',
        )}
      >
        {label}
      </span>
    </button>
  );
};

export { Button };
