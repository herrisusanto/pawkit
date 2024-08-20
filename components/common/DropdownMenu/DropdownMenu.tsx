import { FlatList, Modal } from "react-native";
import { AnimatePresence, Text, View, YStack, styled } from "tamagui";

export type DropdownMenuProps = {
  open?: boolean;
  onSelect?: (item: string) => void;
  onClose?: () => void;
  items?: { label: string; value: string }[];
};

const StyledYStack = styled(YStack, {
  position: "absolute",
  backgroundColor: "$formColor",
  px: "$2.5",
  borderColor: "#000",
  borderRadius: "$2",
  elevation: 8,
  elevationAndroid: 8,
});

export const DropdownMenu = StyledYStack.styleable<DropdownMenuProps>(
  ({ open, onSelect, onClose, items = [], ...props }, ref) => {
    return (
      <AnimatePresence>
        <Modal transparent animationType="fade" visible={open}>
          <View h="$full" w="$full" onPress={onClose}>
            <StyledYStack ref={ref} maxHeight={250} {...props}>
              <FlatList
                data={items}
                renderItem={({ item, index: i }) => {
                  const isFirst = i === 0;
                  const isLast = i === items.length - 1;
                  return (
                    <View
                      key={i}
                      pb={isFirst ? "$2" : isLast ? "$4" : "$2"}
                      pt={isFirst ? "$4" : isLast ? "$2" : "$2"}
                      onPress={() => {
                        onSelect && onSelect(item.value as string);
                      }}
                    >
                      <Text fontSize="$c1" fontWeight="$5">
                        {item.label}
                      </Text>
                    </View>
                  );
                }}
              />
            </StyledYStack>
          </View>
        </Modal>
      </AnimatePresence>
    );
  }
);
