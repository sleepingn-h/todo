import { useCallback, useRef, useState } from 'react';

const useDropdown = (id: string) => {
  const [isOpen, setIsOpen] = useState(false);
  const [_, setOpenDropdownId] = useState<string | null>(null);

  const toggle = () => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
    setIsOpen(!isOpen);
  };

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === 'Escape' && isOpen) setIsOpen(!isOpen);
    },
    [isOpen, setIsOpen]
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      triggerRef.current &&
      !triggerRef.current.contains(event.target as Node)
    ) {
      setOpenDropdownId(null);
      setIsOpen(!isOpen);
    }
  };

  return {
    onEscape: handleEscape,
    onClose: handleClickOutside,
    isOpen,
    toggle,
    dropdownRef,
    triggerRef,
  };
};

export default useDropdown;
