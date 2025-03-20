import type { ChangeEvent, FormEvent } from 'react';
import type { Todo } from 'src/types/todo';
import { useState } from 'react';
import Button from '@components/ui/Button/Button';
import { LuCheckCircle2, LuXCircle } from 'react-icons/lu';
import styles from '@components/Todo/Todo.module.css';

type Props = {
  todo: Todo;
  onUpdate: (updated: Todo) => void;
  onClose: () => void;
};

const EditTodoForm = ({ todo, onUpdate, onClose }: Props) => {
  const [form, setForm] = useState<Todo>(todo);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    onUpdate(form);
    onClose();
  };

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label htmlFor={'title'}>제목</label>
      <input
        type='text'
        id={'title'}
        name={'title'}
        placeholder='Edit your todo'
        value={form.title}
        required
        autoFocus
        onChange={onChange}
      />
      <label htmlFor={'text'}>상세내용</label>
      <textarea
        id={'text'}
        name={'text'}
        value={form.text}
        rows={10}
        cols={30}
        onChange={onChange}
        required
      />
      <div className={styles.buttons}>
        <Button type='submit'>
          <LuCheckCircle2 size={18} /> 수정
        </Button>
        <Button color='dark' onClick={onClose}>
          <LuXCircle size={18} />
          취소
        </Button>
      </div>
    </form>
  );
};

export default EditTodoForm;
