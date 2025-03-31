import type { BaseModalProps } from '@/types/modal';
import { useModal } from '@/components/ui/Modal/useModal';

import ModalPortal from './ModalPortal';

import styles from './Modal.module.css';
import ModalOverlay from './ModalOverlay';
import ButtonIcon from '../Button/ButtonIcon';
import { AiOutlineClose } from 'react-icons/ai';

const BaseModal = ({ isOpen, onClose, children }: BaseModalProps) => {
  useModal({ isOpen, onClose });

  if (!isOpen) return null;
  return (
    <ModalPortal>
      <div className={styles.modal} role='dialog' aria-modal='true'>
        <div>
          <ButtonIcon
            icon={<AiOutlineClose />}
            label='모달 닫기'
            onClick={onClose}
            className={styles.close}
          />
          {children}
        </div>
        <ModalOverlay className={styles.overlay} onClose={onClose} />
      </div>
    </ModalPortal>
  );
};

export default BaseModal;
