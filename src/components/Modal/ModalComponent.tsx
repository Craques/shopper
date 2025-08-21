import {
  ModalBackdrop,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from '@/components/ui/modal';
import { ModalComponentProps } from './Modal.types';
import { Heading } from '@/components/ui/heading';
import { AlertCircleIcon, CloseIcon, Icon } from '@/components/ui/icon';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';

export const ModalComponent = ({
  title,
  isOpen,
  toggleModal,
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
        <Divider className="bg-primary-300" style={{ marginTop: 8 }} />
        <FormControl size="md" isInvalid style={{ marginTop: 16 }}>
          <FormControlLabel>
            <FormControlLabelText className="text-secondary-500">
              Item Name
            </FormControlLabelText>
          </FormControlLabel>
          <Input size="lg">
            <InputField
              className="text-secondary-500"
              placeholder="Item Name"
            />
          </Input>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText> Failed </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <FormControl size="md" style={{ marginTop: 8 }}>
          <FormControlLabel>
            <FormControlLabelText className="text-secondary-500">
              Item Name
            </FormControlLabelText>
          </FormControlLabel>
          <Input size="lg">
            <InputField
              className="text-secondary-500"
              placeholder="Item Name"
            />
          </Input>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText> Failed </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <Button size="lg" className="bg-secondary-0" style={{ marginTop: 16 }}>
          <ButtonText className="text-primary-900">Add item</ButtonText>
        </Button>
      </ModalContent>
    </Modal>
  );
};
