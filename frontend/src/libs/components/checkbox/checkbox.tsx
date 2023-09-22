import { getValidClassNames } from '#libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  label: string;
  isChecked?: boolean;
  onChange: () => void;
  isDefaultStylesDisabled?: boolean;
};

const Checkbox: React.FC<Properties> = ({
  label,
  isChecked,
  onChange,
  isDefaultStylesDisabled,
}) => {
  const checkboxClassName = getValidClassNames(
    isDefaultStylesDisabled ? null : styles['checkbox'],
  );
  const containerClassName = getValidClassNames(
    isDefaultStylesDisabled ? null : styles['container'],
  );
  const labelClassName = getValidClassNames(
    isDefaultStylesDisabled ? null : styles['label'],
  );
  const checkboxContainerClassName = getValidClassNames(
    isDefaultStylesDisabled ? styles['checkbox-container'] : null,
  );

  return (
    <label className={checkboxContainerClassName}>
      <input
        className={checkboxClassName}
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
      />
      <div className={containerClassName}>
        <span className={labelClassName}>{label}</span>
      </div>
    </label>
  );
};

export { Checkbox };
