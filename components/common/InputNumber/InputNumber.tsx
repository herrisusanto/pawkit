import React from "react";
import { Control, UseControllerProps, useController } from "react-hook-form";
import {
  styled,
  Input as TamaguiInput,
  Text,
  TextProps,
  InputProps as TamaguiInputProps,
  View,
  XStack,
  XStackProps,
} from "tamagui";
import { IconProps } from "../Icons";

type InputProps = {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  prefix?: React.ReactElement;
  prefixProps?: IconProps;
  rules?: UseControllerProps["rules"];
  labelProps?: TextProps;
  inputContainerProps?: XStackProps;
  inputProps?: TamaguiInputProps;
  errorProps?: TextProps;
};

const StyledView = styled(View, {
  rowGap: "$2",
});

const StyledInput = styled(TamaguiInput, {
  h: 42,
  w: "$full",
  borderRadius: "$2",
  fontSize: "$c1",
  fontWeight: "$5",
  placeholderTextColor: "$textFourty",
  px: "$0",
  bg: "$colorTransparent",
  bw: "$0",
  keyboardType: "number-pad",
});

export const InputNumber = StyledView.styleable<InputProps>(
  (
    {
      control,
      name,
      label,
      placeholder,
      labelProps,
      inputContainerProps,
      inputProps,
      errorProps,
      rules,
      prefix,
      prefixProps,
      ...props
    },
    ref
  ) => {
    const {
      field: { onChange, ...field },
      fieldState: { error, invalid },
    } = useController({ control, name, rules });

    const isReadOnly = inputProps?.readOnly;

    return (
      <StyledView ref={ref} {...props}>
        {label && (
          <Text
            fontSize="$c1"
            fontWeight="$5"
            color="$textPrimary"
            {...labelProps}
          >
            {label}
          </Text>
        )}
        <XStack columnGap="$2">
          {prefix && (
            <XStack
              h={42}
              bw="$0.5"
              bc={invalid ? "$error" : "$natural0"}
              br="$2"
              px="$2.5"
              ai="center"
              gap="$2.5"
              bg={invalid ? "$bgError" : "$formColor"}
              {...prefixProps}
            >
              {prefix}
            </XStack>
          )}
          <XStack
            flex={1}
            h={42}
            bw="$0.5"
            bc={invalid ? "$error" : "$natural0"}
            br="$2"
            px="$2.5"
            ai="center"
            gap="$2.5"
            bg={invalid ? "$bgError" : "$formColor"}
            {...inputContainerProps}
          >
            <StyledInput
              {...field}
              onChangeText={onChange}
              aria-label={label}
              placeholder={placeholder}
              color={isReadOnly ? "$natural0" : "$natural3"}
              {...inputProps}
            />
          </XStack>
        </XStack>
        {error && (
          <Text fontSize="$c2" fontWeight="$4" color="$error" {...errorProps}>
            {error.message}
          </Text>
        )}
      </StyledView>
    );
  }
);
