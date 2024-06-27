import { createCheckbox, Stack, styled } from "tamagui";

const Frame = styled(Stack, {
  borderColor: "$natural0",
  borderRadius: "$3",
  alignItems: "center",
  justifyContent: "center",
  variants: {
    checked: {
      indeterminate: {},
      true: {
        borderWidth: 0,
        backgroundColor: "$primary",
      },
      false: {
        borderWidth: "$0.5",
        backgroundColor: "$colorTransparent",
      },
    },
  } as const,

  defaultVariants: {
    checked: false,
  },
});

const Indicator = styled(Stack, {});

export const Checkbox = createCheckbox({
  Frame,
  Indicator,
});
