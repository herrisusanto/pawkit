import { Spinner, Button as TamaguiButton, styled } from "tamagui";

const StyledButton = styled(TamaguiButton, {
  px: "$3.5",
  py: "$0",
  h: "$3.5",
  fontSize: "$c1",
  fontWeight: "$5",
  borderRadius: "$3",
  variants: {
    type: {
      default: {},
      primary: {
        bg: "$primary",
        color: "white",
        pressStyle: { bg: "$primary", bc: "$primary" },
      },
      secondary: {
        bc: "$primary",
        bg: "$colorTransparent",
        color: "$primary",
        pressStyle: { bg: "$colorTransparent", bc: "$primary" },
      },
      secondaryError: {
        bc: "$error",
        bg: "$colorTransparent",
        color: "$error",
        pressStyle: { bg: "$colorTransparent", bc: "$error" },
      },
      thirdy: {
        bc: "$primary",
        bg: "$thirdy",
        color: "$secondary",
        pressStyle: { bg: "$thirdy", bc: "$primary" },
      },
    },
    disabled: {
      true: {
        bc: "$natural0",
        bg: "$natural0",
        color: "$textSecondary",
        pressStyle: { bg: "$thirdy", bc: "$natural0" },
      },
    },
  } as const,
});

export const Button = StyledButton.styleable<{ loading?: boolean }>(
  ({ children, onPress, disabled, loading, ...props }, ref) => (
    <StyledButton
      {...props}
      pressStyle={{ bg: disabled ? "$natural0" : "unset" }}
      onPress={(e) => {
        onPress && !disabled && !loading && onPress(e);
      }}
      disabled={disabled || loading}
    >
      {loading ? <Spinner color="#fff" /> : children}
    </StyledButton>
  )
);
