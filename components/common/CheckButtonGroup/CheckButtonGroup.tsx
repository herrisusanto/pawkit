import {
  View as TamaguiView,
  Text,
  TextProps,
  XStack,
  XStackProps,
  YStack,
  styled,
} from "tamagui";
import React, { PropsWithChildren, createContext } from "react";
import { Control, UseControllerProps, useController } from "react-hook-form";
import { CloseIcon } from "../Icons";
import { TouchableOpacity } from "react-native";

type CheckButtonGroupProps = {
  items: CheckButtonProps[];
  handleDeleteBehavior?: (value: string) => void;
  multiple?: boolean;
  control: Control<any>;
  rules?: UseControllerProps["rules"];
  name: string;
  containerProps?: XStackProps;
  itemProps?: CheckButtonProps;
  itemTextProps?: TextProps;
  renderItem?: (itemProps: CheckButtonProps) => React.ReactNode;
  errorProps?: TextProps;
};

export const checkButtonGroupContext = createContext({
  multiple: false,
});

interface CheckButtonGroupProviderProps extends PropsWithChildren {
  value: { multiple: boolean };
}

const CheckButtonGroupProvider: React.FC<CheckButtonGroupProviderProps> = ({
  children,
  value,
}) => {
  return (
    <checkButtonGroupContext.Provider value={value}>
      {children}
    </checkButtonGroupContext.Provider>
  );
};

const StyledView = styled(YStack, {
  fw: "wrap",
  rowGap: "$2",
});

export const CheckButtonGroup = StyledView.styleable<CheckButtonGroupProps>(
  (
    {
      items = [],
      handleDeleteBehavior,
      multiple = true,
      control,
      name,
      rules,
      containerProps,
      itemProps,
      itemTextProps,
      errorProps,
      renderItem,
      ...props
    },
    ref
  ) => {
    const {
      field,
      fieldState: { error },
    } = useController({
      control,
      name,
      rules,
      defaultValue: multiple ? [] : null,
    });

    const handleOnChange = (value: any) => {
      const isChecked = field.value?.includes(value);

      if (multiple) {
        const valueIndex = (field.value as [])?.findIndex(
          (val) => val === value
        );
        if (isChecked) {
          field.onChange([
            ...field.value.slice(0, valueIndex),
            ...field.value.slice(valueIndex + 1),
          ]);
        } else {
          field.onChange([...field.value, value]);
        }
      } else {
        field.onChange(value);
      }
    };

    const handleOnDeleteBehavior = (value: string) => {
      const isChecked = field.value?.includes(value);

      if (multiple) {
        const valueIndex = (field.value as [])?.findIndex(
          (val) => val === value
        );
        if (isChecked) {
          field.onChange([
            ...field.value.slice(0, valueIndex),
            ...field.value.slice(valueIndex + 1),
          ]);
        }
      }

      handleDeleteBehavior && handleDeleteBehavior(value);
    };

    return (
      <StyledView ref={ref} {...props}>
        <CheckButtonGroupProvider value={{ multiple }}>
          <XStack fw="wrap" columnGap="$3" rowGap="$5" {...containerProps}>
            {items?.map((item) => {
              const checked = field.value?.includes(item.value);
              return renderItem ? (
                renderItem({ ...item, checked, onChange: handleOnChange })
              ) : (
                <CheckButton
                  key={item.key || item.value}
                  value={item.value}
                  isCustom={item.isCustom}
                  handleDeleteBehavior={handleOnDeleteBehavior}
                  checked={checked}
                  onChange={handleOnChange}
                  textProps={itemTextProps}
                  {...itemProps}
                >
                  {item.children}
                </CheckButton>
              );
            })}
          </XStack>
        </CheckButtonGroupProvider>
        {error && (
          <Text fontSize="$c2" fontWeight="$4" color="$error">
            {error.message}
          </Text>
        )}
      </StyledView>
    );
  }
);

export interface CheckButtonProps extends PropsWithChildren {
  key?: string | number;
  value: string;
  isCustom?: boolean;
  onChange?: <T>(value: T) => void;
  handleDeleteBehavior?: (value: string) => void;
  checked?: boolean;
  textProps?: TextProps;
  petIcon?: (val: string) => React.ReactNode;
  available?: boolean;
}

const StyledCheckButton = styled(TamaguiView, {
  px: "$2.5",
  h: 26,
  borderWidth: "$0.5",
  borderRadius: "$12",
  bc: "$natural0",
  ai: "center",
  jc: "center",
  flexDirection: "row",
  variants: {
    checked: {
      true: {
        bg: "$primary",
        bc: "$primary",
      },
    },
  },
});

export const CheckButton = StyledCheckButton.styleable<CheckButtonProps>(
  (
    {
      children,
      checked,
      onChange,
      key,
      value,
      textProps,
      isCustom,
      handleDeleteBehavior,
      ...props
    },
    ref
  ) => {
    const handleOnChange = () => {
      onChange && onChange(value);
    };

    return (
      <StyledCheckButton
        ref={ref}
        onPress={handleOnChange}
        checked={checked}
        {...props}
      >
        <Text
          fontSize="$c2"
          fontWeight="$4"
          color={checked ? "#fff" : "$natural1"}
          {...textProps}
        >
          {children}
        </Text>

        {isCustom && (
          <TouchableOpacity
            onPress={() => handleDeleteBehavior && handleDeleteBehavior(value)}
          >
            <CloseIcon strokeColor="#fff" />
          </TouchableOpacity>
        )}
      </StyledCheckButton>
    );
  }
);
