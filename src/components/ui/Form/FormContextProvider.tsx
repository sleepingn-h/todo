import { createContext, ReactNode, useContext, useMemo } from 'react';
type FormContextProps = {
  isInvalid: boolean;
  isRequired: boolean;
  isDisabled: boolean;
};

type FormProviderProps = FormContextProps & {
  children: ReactNode;
};

const FormContext = createContext<FormContextProps | null>({});

const FormContextProvider = ({
  children,
  isInvalid = false,
  isRequired = false,
  isDisabled = false,
}: FormProviderProps) => {
  const providerProps: FormContextProps = useMemo(
    () => ({
      isInvalid,
      isRequired,
      isDisabled,
    }),
    [isInvalid, isRequired, isDisabled]
  );

  return <FormContext.Provider value={providerProps}>{children}</FormContext.Provider>;
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext는 FormControl 안에서 사용 되어야 합니다.');
  }
  return context;
};

export default FormContextProvider;
