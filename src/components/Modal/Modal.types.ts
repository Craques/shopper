import { Control } from 'react-hook-form';

export interface ModalComponentProps {
  title: string;
  isOpen: boolean;
  toggleModal: () => void;
  control: Control<any>;
  onSubmit: () => void;
  ctaTitle: string;
}
