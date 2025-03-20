import type { ChangeEvent, FormEvent } from 'react';
import type { FetchTodo } from 'src/types/todo';

import { useRef, useState } from 'react';

import BaseModal from '@/components/ui/Modal/BaseModal';
import Button from '@components/ui/Button/Button';
import TextInput from '@/components/ui/Form/TextInput';
import TextArea from '@/components/ui/Form/TextArea';
import ButtonGroup from '@/components/ui/Button/ButtonGroup';
import PriorityRadioForm from './PriorityRadioForm';
import { LuCircleCheckBig, LuCircleX } from 'react-icons/lu';

import styles from '@components/Todo/Todo.module.css';

type AddTodoFormProps = {
  todo?: FetchTodo;
  isOpen: boolean;
  onAdd: (added: FetchTodo) => void;
  onClose: () => void;
};

const AddTodoForm = ({ todo, isOpen, onAdd, onClose }: AddTodoFormProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [form, setForm] = useState<FetchTodo>(
    todo ?? { id: '', title: '', content: '', priority: 'normal' }
  );
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    onAdd(form);
    onClose();
  };

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <PriorityRadioForm form={form} onChange={onChange} />
        <TextInput
          label='제목'
          id='title'
          placeholder='Add your todo'
          value={form.title}
          required
          autoFocus
          onChange={onChange}
          ref={inputRef}
        />
        <TextArea
          label='상세내용'
          id='content'
          name='content'
          value={form.content}
          rows={10}
          cols={30}
          onChange={onChange}
          required
        />
        <ButtonGroup>
          <Button type='submit'>
            <LuCircleCheckBig size={18} /> 작성
          </Button>
          <Button color='dark' onClick={onClose}>
            <LuCircleX size={18} />
            취소
          </Button>
        </ButtonGroup>
      </form>
    </BaseModal>
  );
};

export default AddTodoForm;
