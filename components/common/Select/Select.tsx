import { Text, TextProps, View, XStack, YStack, styled } from "tamagui";
import { Control, UseControllerProps, useController } from "react-hook-form";
import { useState } from "react";
import { ChevronDownIcon } from "../Icons/ChevronDownIcon";
import { DropdownMenu, DropdownMenuProps } from "../DropdownMenu/DropdownMenu";
import { GestureResponderEvent } from "react-native";

type SelectProps = {
  control: Control<any>;
  name: string;
  placeholder?: string;
  label?: string;
  labelProps?: TextProps;
  rules?: UseControllerProps["rules"];
  errorProps?: TextProps;
  options?: DropdownMenuProps["items"];
};

const StyledView = styled(View, {
  w: "$full",
  ai: "center",
  jc: "center",
});

export const Select = StyledView.styleable<SelectProps>(
  (
    {
      control,
      name,
      label,
      placeholder,
      labelProps,
      errorProps,
      rules,
      options = [],
      ...props
    },
    ref
  ) => {
    const {
      field: { onChange, value, onBlur },
      fieldState: { error, invalid },
    } = useController({ control, name, rules });
    const [open, setOpen] = useState(false);
    const [inputHeight, setInputHeight] = useState(0);
    const [inputWidth, setInputWidth] = useState(0);
    const [inputPageX, setInputPageX] = useState(0);

    const handleClose = () => {
      setOpen(false);
      open && onBlur();
    };

    const openDropdownMenu = (event: GestureResponderEvent) => {
      if (event?.currentTarget) {
        event.currentTarget.measure((x, y, w, h, px, py) => {
          setInputHeight(py + h);
          setInputWidth(w);
          setInputPageX(px);
        });
      }
      setOpen(true);
    };

    const handleItemSelection = (selectedValue: string) => {
      onChange(selectedValue);
      handleClose();
    };

    const StyledSelect = styled(XStack, {
      h: 42,
      borderRadius: "$2",
      px: "$2.5",
      bw: "$0.5",
      ai: "center",
      jc: "space-between",
    });

    return (
      <StyledView ref={ref} zi={open ? 10000 : 0} {...props}>
        <YStack w="$full">
          <YStack rowGap="$2">
            {label && (
              <Text
                fontSize="$c1"
                fontWeight="$5"
                aria-label={label}
                {...labelProps}
              >
                {label}
              </Text>
            )}
            <StyledSelect
              onPress={openDropdownMenu}
              bc={invalid ? "$error" : "$natural0"}
              bg={invalid ? "$bgError" : "$formColor"}
            >
              <Text fontSize="$c1" fontWeight="$5">
                {options.find((item) => item.value === value)?.label ||
                  placeholder}
              </Text>
              <View rotate={open ? "180deg" : "0deg"}>
                <ChevronDownIcon />
              </View>
            </StyledSelect>
            {error && (
              <Text
                fontSize="$c2"
                fontWeight="$4"
                color="$error"
                {...errorProps}
              >
                {error.message}
              </Text>
            )}
          </YStack>
          <DropdownMenu
            open={open}
            top={inputHeight}
            w={inputWidth}
            left={inputPageX}
            onClose={handleClose}
            items={options}
            onSelect={handleItemSelection}
          />
        </YStack>
      </StyledView>
    );
  }
);
