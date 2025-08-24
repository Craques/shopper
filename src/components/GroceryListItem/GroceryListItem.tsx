import { Box } from '@/components/ui/box';

import { GroceryListItemProps } from './GroceryListItem.types';
import { Text } from '@/components/ui/text';
//@ts-ignore
import TrashIcon from '@/src/assets/icons/trash.svg';
//@ts-ignore
import EditIcon from '@/src/assets/icons/edit.svg';
import { HStack } from '@/components/ui/hstack';
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
} from '@/components/ui/checkbox';
import { CheckIcon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { TouchableOpacity, View } from 'react-native';

export const GroceryListItem = ({
  item,
  onPressDelete,
  onPressEdit,
}: GroceryListItemProps) => {
  return (
    <>
      <Box
        className="flex-1 flex-row justify-between bg-primary-400 items-center"
        style={{ paddingVertical: 16, paddingHorizontal: 16 }}
      >
        <Text className="text-secondary-100 capitalize">{item.itemName}</Text>
        <HStack className="items-center" space="lg" reversed>
          <TouchableOpacity
            onPress={onPressDelete}
            hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
          >
            <TrashIcon
              pointerEvents={'none'}
              width={28}
              height={28}
              color={'#e63535'}
            />
          </TouchableOpacity>
          <Pressable onPress={onPressEdit}>
            <EditIcon
              width={24}
              height={24}
              color={'#e77828'}
              pointerEvents={'none'}
            />
          </Pressable>
          <Pressable onPress={onPressEdit}>
            <View pointerEvents="none" onTouchEnd={e => e.stopPropagation()}>
              <Checkbox
                isChecked={item.bought}
                value="bought"
                className="text-success-500 checked:text-success-500"
              >
                <Text
                  size="lg"
                  className="text-success-500 checked:text-success-500 active:text-success-500"
                >
                  Bought
                </Text>
                <CheckboxIndicator className="checked:bg-success-500">
                  <CheckboxIcon
                    className="bg-success-500"
                    as={CheckIcon}
                    size="lg"
                  />
                </CheckboxIndicator>
              </Checkbox>
            </View>
          </Pressable>
        </HStack>
      </Box>
    </>
  );
};
