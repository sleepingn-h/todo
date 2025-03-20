type ModalOverlayProps = {
  onClose: () => void;
  className?: string;
};

const ModalOverlay = ({ onClose, className }: ModalOverlayProps) => {
  return <div className={className || ''} onClick={onClose} aria-hidden='true' />;
};

export default ModalOverlay;
