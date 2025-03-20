import type { InputHelper } from '@/types/form';
import classNames from 'classnames';
import styles from './form.module.css';

type HelperProps = {
  helper: InputHelper;
};

const Helper = ({ helper }: HelperProps) => {
  const helperClassName = classNames(styles[helper.type], styles.common);

  return <p className={helperClassName}>{helper.variant}</p>;
};

export default Helper;
