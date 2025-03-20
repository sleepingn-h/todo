import { CheckboxContextProps, CheckboxProviderProps } from '@/types/checkbox';
import { createContext, useCallback, useContext, useState } from 'react';

const CheckboxContext = createContext<CheckboxContextProps | null>();

export function CheckboxProvider({
  children,
  id,
  name,
}: { children: React.ReactNode } & CheckboxProviderProps) {
  const [isChecked, setIsChecked] = useState(false);
  const toggleCheckbox = useCallback(() => {
    setIsChecked((prev) => !prev);
  }, []);

  return (
    <CheckboxContext.Provider value={{ isChecked, toggleCheckbox, id, name }}>
      {children}
    </CheckboxContext.Provider>
  );
}

export const useCheckboxContext = () => {
  const context = useContext(CheckboxContext);

  if (!context) throw new Error('useCheckboxContext must be used within  CheckboxProvider');
  return context;
};
