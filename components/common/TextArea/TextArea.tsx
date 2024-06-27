import { Control, UseControllerProps, useController } from "react-hook-form";
import {
  TextArea as TamaguiTextArea,
  Text,
  TextProps,
  YStack,
  YStackProps,
  styled,
} from "tamagui";

type TextAreaProps = {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  containerProps?: YStackProps;
  labelProps?: TextProps;
  errorProps?: TextProps;
  rules?: UseControllerProps["rules"];
};

const StyledTextArea = styled(TamaguiTextArea, {
  w: "$full",
  minHeight: "$6",
  borderRadius: "$2",
  fontSize: "$c1",
  fontWeight: "$5",
  placeholderTextColor: "$textFourty",
  px: "$2.5",
});

export const TextArea = StyledTextArea.styleable<TextAreaProps>(
  (
    {
      control,
      name,
      label,
      placeholder,
      rules,
      containerProps,
      labelProps,
      errorProps,
      ...props
    },
    _
  ) => {
    const {
      field: { onChange, ...field },
      fieldState: { error, invalid },
    } = useController({
      control,
      name,
      rules,
    });

    return (
      <YStack rowGap="$2" {...containerProps}>
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
        <StyledTextArea
          {...field}
          textAlignVertical="top"
          onChangeText={onChange}
          bg={invalid ? "$bgError" : "$formColor"}
          bc={invalid ? "$error" : "$natural0"}
          focusStyle={{ bc: invalid ? "$error" : "$natural0" }}
          {...props}
        />
        {error && (
          <Text fontSize="$c2" fontWeight="$4" color="$error" {...errorProps}>
            {error.message}
          </Text>
        )}
      </YStack>
    );
  }
);
