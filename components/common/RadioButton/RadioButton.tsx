import { Text, View, ViewProps, getToken, styled } from "tamagui";
import React, { PropsWithChildren, useMemo } from "react";
import { IconProps } from "../Icons";
import { Control, useController } from "react-hook-form";

interface RadioButtonProps extends PropsWithChildren {
  control: Control<any, any>;
  name: string;
  icon?: React.ReactElement;
  value: string;
  iconProps?: IconProps;
}

const StyledView = styled(View, {
  height: 42,
  w: "$full",
  flexDirection: "row",
  borderWidth: "$0.5",
  borderColor: "$natural0",
  borderRadius: "$2",
  backgroundColor: "$formColor",
  // py: "$3",
  px: "$2.5",
  alignItems: "center",
  columnGap: "$2.5",
  variants: {
    checked: {
      true: {
        backgroundColor: "$primary",
        borderColor: "$primary",
        color: "white",
      },
    },
  },
});

export const RadioButton = StyledView.styleable<RadioButtonProps & ViewProps>(
  ({ control, icon, value, name, iconProps, children, ...props }, ref) => {
    const {
      field: { onChange, value: controlledValue },
    } = useController({ control, name });
    const checked = useMemo(() => {
      return (
        controlledValue === value ||
        (typeof controlledValue === "undefined" && value === "false")
      );
    }, [controlledValue, value]);

    const toggle = () => {
      onChange && onChange(value);
    };

    return (
      <StyledView ref={ref} checked={checked} onPress={toggle} {...props}>
        {icon &&
          React.cloneElement<IconProps>(icon, {
            strokeColor: checked ? "#fff" : getToken("$natural0", "color"),
            ...iconProps,
          })}
        <Text
          fontSize="$c1"
          fontWeight="$5"
          color={checked ? "white" : "$textFourty"}
        >
          {children}
        </Text>
      </StyledView>
    );
  }
);
