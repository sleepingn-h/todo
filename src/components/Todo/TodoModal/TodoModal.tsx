import styles from '@components/Todo/Todo.module.css';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function TodoModal({ children, onClose }: Props) {
  return (
    <div
      className={styles.portal}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={styles.content}>{children}</div>
    </div>
  );
}
