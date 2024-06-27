import { View, XStack, YStack, YStackProps, useSheet } from "tamagui";
import { DropdownMenu, DropdownMenuProps } from "../DropdownMenu/DropdownMenu";
import { useState } from "react";
import { GestureResponderEvent } from "react-native";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";

type DropdownProps = {
  items?: DropdownMenuProps["items"];
  onChange?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
  menuProps?: YStackProps;
};

export const Dropdown = View.styleable<DropdownProps>(
  ({ items, onChange, onOpenChange, menuProps, children, ...props }, ref) => {
    const { open: sheetOpen } = useSheet();
    const [open, setOpen] = useState(false);
    const [inputHeight, setInputHeight] = useState(0);
    const [inputWidth, setInputWidth] = useState(0);
    const [inputPageX, setIputPageX] = useState(0);

    const handleClose = () => {
      setOpen(false);
      onOpenChange && onOpenChange(false);
    };

    const openDropdownMenu = (event: GestureResponderEvent) => {
      if (event?.target) {
        event.target.measure((x, y, w, h, px, py) => {
          setInputHeight(py + h);
          setInputWidth(w);
          setIputPageX(px);
        });
      }
      setOpen(true);
      onOpenChange && onOpenChange(true);
    };

    const handleItemSelection = (selectedValue: string) => {
      onChange && onChange(selectedValue);
      handleClose();
    };

    return (
      <View ref={ref} zi={open ? 10000 : 0} ai="center" jc="center" {...props}>
        <YStack w="$full">
          <XStack rowGap="$2">
            <View onPress={openDropdownMenu}>{children}</View>
          </XStack>
          <SafeAreaInsetsContext.Consumer>
            {(insets) => {
              const topInset = sheetOpen ? insets?.top || 0 : 0;
              return (
                <DropdownMenu
                  open={open}
                  top={inputHeight + topInset}
                  w={inputWidth}
                  left={inputPageX}
                  onClose={handleClose}
                  items={items}
                  onSelect={handleItemSelection}
                  {...menuProps}
                />
              );
            }}
          </SafeAreaInsetsContext.Consumer>
        </YStack>
      </View>
    );
  }
);
