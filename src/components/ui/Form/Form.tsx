import { forwardRef } from 'react';
import FormContextProvider, { useForm } from './FormContextProvider';

import styles from './Form.module.css';
import classNames from 'classnames';

const FormControl = forwardRef<HTMLFormElement>(
  ({ children, isInvalid, isRequired, isDisabled, className, ...props }, ref) => {
    return (
      <FormContextProvider isInvalid={isInvalid} isRequired={isRequired} isDisabled={isDisabled}>
        <form ref={ref} className={className} {...props}>
          {children}
        </form>
      </FormContextProvider>
    );
  }
);

const FormLabel = forwardRef<
  HTMLLabelElement,
  React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>
>(({ className, children, htmlFor, ...props }, ref) => {
  const { isDisabled, isRequired } = useForm();
  const cns = classNames(styles.label, isRequired && styles.required, isDisabled && styles.hidden);

  return (
    <label {...props} ref={ref} className={cns} htmlFor={htmlFor}>
      {children}
    </label>
  );
});

export const Form = {
  Label: FormLabel,
};

export default FormControl;
