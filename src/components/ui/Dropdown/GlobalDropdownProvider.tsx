import { createContext, useContext, useState } from 'react';

// 전역 컨텍스트 추가
const GlobalDropdownContext = createContext<{
  openDropdownId: string | null;
  setOpenDropdownId: (id: string | null) => void;
} | null>(null);

export function GlobalDropdownProvider({ children }: { children: React.ReactNode }) {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  return (
    <GlobalDropdownContext.Provider value={{ openDropdownId, setOpenDropdownId }}>
      {children}
    </GlobalDropdownContext.Provider>
  );
}

export function useGlobalDropdownContext() {
  const context = useContext(GlobalDropdownContext);
  if (!context)
    throw new Error('useGlobalDropdownContext must be used within a GlobalDropdownProvider');
  return context;
}
