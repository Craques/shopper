import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { Heading } from '@/components/ui/heading';
import { CloseIcon, Icon } from '@/components/ui/icon';
import {
  Modal,
  ModalBackdrop,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from '@/components/ui/modal';
import { ConfirmationModalProps } from './ConfirmationModal.types';

export const ConfirmationModal = ({
  isOpen,
  title,
  toggleModal,
  onPress,
  ctaTitle,
  type,
}: ConfirmationModalProps) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalBackdrop />
      <ModalContent className="bg-primary-800">
        <ModalHeader>
          <Heading bold size="lg" className="text-secondary-400">
            {title}
          </Heading>
          <ModalCloseButton onPress={toggleModal}>
            <Icon as={CloseIcon} className="text-secondary-400" />
          </ModalCloseButton>
        </ModalHeader>
        <ModalCloseButton className="text-secondary-400" />
        <Divider className="bg-primary-300" style={{ marginTop: 8 }} />
        <Box style={{ marginTop: 16 }} />

        <Button
          onPress={onPress}
          size="lg"
          className={`bg-${type}-300`}
          style={{ marginTop: 16 }}
        >
          <ButtonText style={{ color: 'white' }}>{ctaTitle}</ButtonText>
        </Button>
        <Button
          onPress={toggleModal}
          size="lg"
          className="bg-secondary-0"
          style={{ marginTop: 8 }}
        >
          <ButtonText className="text-primary-900">Cancel</ButtonText>
        </Button>
      </ModalContent>
    </Modal>
  );
};
