import { Heading } from '@/components/ui/heading';
import { Box } from '@/components/ui/box';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Divider } from '@/components/ui/divider';
import { AddIcon, Icon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { styles } from './styles';

export const NavigationBar = ({
  onPressAdd,
}: {
  onPressAdd: () => void;
}): React.ReactNode => {
  const insets = useSafeAreaInsets();

  return (
    <Box
      className="bg-primary-500"
      style={{
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Box className="bg-primary-500" style={styles.container}>
        <Heading bold size="lg" className="text-secondary-400">
          Shopper
        </Heading>

        <Pressable onPress={onPressAdd}>
          <Icon as={AddIcon} size="xl" className="text-secondary-400" />
        </Pressable>
      </Box>
      <Divider className="bg-primary-300" />
    </Box>
  );
};
