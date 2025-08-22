export interface ConfirmationModalProps {
  title: string;
  type: string;
  onPress: () => void;
  isOpen: boolean;
  toggleModal: () => void;
  ctaTitle: string;
}
