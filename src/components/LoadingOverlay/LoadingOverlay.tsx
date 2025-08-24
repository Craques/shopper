import { Modal, ModalBackdrop, ModalContent } from '@/components/ui/modal';
import { Spinner } from '@/components/ui/spinner';
import { LoadingOverlayProps } from './LoadingOverlay.types';

export const LoadingOverlay = ({ loading }: LoadingOverlayProps) => {
  return (
    <Modal isOpen={loading}>
      <ModalBackdrop />
      <ModalContent className="bg-inherit border-0">
        <Spinner size={'large'} />
      </ModalContent>
    </Modal>
  );
};
