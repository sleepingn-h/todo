import { useCallback, useEffect } from 'react';

type UseModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const useModal = ({ isOpen, onClose }: UseModalProps) => {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  // 스크롤 제어
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  // 키보드 이벤트
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, handleEscape]);
};
