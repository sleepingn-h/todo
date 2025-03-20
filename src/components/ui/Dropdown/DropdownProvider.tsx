import { DropdownContextProps, DropdownProviderProps } from '@/types/dropdown';
import { createContext, useContext, useEffect } from 'react';
import useDropdown from '@/hooks/useDropdown';

const DropdownContext = createContext<DropdownContextProps | null>(null);

export default function DropdownProvider({
  children,
  value,
  onChange,
  type,
  aria,
}: DropdownProviderProps) {
  const { id } = aria;
  const { onEscape, onClose, isOpen, toggle, dropdownRef, triggerRef } = useDropdown(id);

  // 키보드 이벤트
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', onEscape);
      document.addEventListener('mousedown', onClose);
      return () => {
        document.removeEventListener('keydown', onEscape);
        document.removeEventListener('mousedown', onClose);
      };
    }
  }, [isOpen, onEscape, onClose]);

  return (
    <DropdownContext.Provider
      value={{ isOpen, toggle, value, onChange, type, aria, dropdownRef, triggerRef }}
    >
      {children}
    </DropdownContext.Provider>
  );
}

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);

  if (!context) throw new Error('Cannot find DropdownProvider');
  return context;
};
