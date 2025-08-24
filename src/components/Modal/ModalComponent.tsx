import {
  ModalBackdrop,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from '@/components/ui/modal';
import { ModalComponentProps } from './Modal.types';
import { Heading } from '@/components/ui/heading';
import { CloseIcon, Icon } from '@/components/ui/icon';
import { Button, ButtonText } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { FormInput } from '../FormInput/FormInput';
import { Box } from '@/components/ui/box';
import { styles } from './ModalComponent.styles';

export const ModalComponent = ({
  title,
  isOpen,
  toggleModal,
  control,
  onSubmit,
  ctaTitle,
}: ModalComponentProps): React.ReactNode => {
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
        <Divider className="bg-primary-300" style={styles.smallMargin} />
        <Box style={styles.mediumMargin} />
        <FormInput
          label="Item Name"
          placeholder="Item Name"
          name={'itemName'}
          control={control}
        />
        <Box style={styles.smallMargin} />
        <FormInput
          label="Price"
          placeholder="Price"
          name={'price'}
          control={control}
        />
        <Box style={styles.mediumMargin} />
        <Button
          onPress={onSubmit}
          size="lg"
          className="bg-secondary-0"
          style={styles.mediumMargin}
        >
          <ButtonText className="text-primary-900">{ctaTitle}</ButtonText>
        </Button>
      </ModalContent>
    </Modal>
  );
};
