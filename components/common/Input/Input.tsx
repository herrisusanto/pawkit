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
} from "tamagui";
import { IconProps } from "../Icons";

export type InputProps = {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  prefixIcon?: React.ReactElement;
  prefixIconProps?: IconProps;
  rules?: UseControllerProps["rules"];
  labelProps?: TextProps;
  inputProps?: TamaguiInputProps;
  errorProps?: TextProps;
  disabled?: boolean;
};

const StyledView = styled(View, {
  rowGap: "$2",
});

export const StyledInput = styled(TamaguiInput, {
  h: 42,
  w: "$full",
  borderRadius: "$2",
  fontSize: "$c1",
  fontWeight: "$5",
  placeholderTextColor: "$textFourty",
  px: "$0",
  bg: "$colorTransparent",
  bw: "$0",
});

export const Input = StyledView.styleable<InputProps>(
  (
    {
      control,
      name,
      label,
      placeholder,
      labelProps,
      inputProps,
      errorProps,
      rules,
      prefixIcon,
      prefixIconProps,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const {
      field: { onChange, ...field },
      fieldState: { error, invalid },
    } = useController({ control, name, rules });

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
        <XStack
          h={42}
          bw="$0.5"
          bc={invalid ? "$error" : "$natural0"}
          br="$2"
          px="$2.5"
          ai="center"
          gap="$2.5"
          bg={invalid ? "$bgError" : "$formColor"}
        >
          {prefixIcon &&
            React.cloneElement<IconProps>(prefixIcon, { ...prefixIconProps })}
          <StyledInput
            {...field}
            disabled={disabled}
            onChangeText={onChange}
            aria-label={label}
            placeholder={placeholder}
            {...inputProps}
          />
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
