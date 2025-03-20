import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode;
};

export default function ModalPortal({ children }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted
    ? createPortal(children, document.getElementById('portal') || document.body)
    : null;
}
