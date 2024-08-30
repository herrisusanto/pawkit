import { AvatarImageProps, styled, Avatar as TamaguiAvatar } from "tamagui";

type AvatarProps = {
  loading?: boolean;
  src?: AvatarImageProps["src"];
  defaultSource?: AvatarImageProps["src"];
  accessibilityLabel?: AvatarImageProps["accessibilityLabel"];
};

const StyledAvatar = styled(TamaguiAvatar, {});

export const Avatar = StyledAvatar.styleable<AvatarProps>(
  (
    { children, loading, src, defaultSource, accessibilityLabel, ...props },
    ref
  ) => {
    return (
      <StyledAvatar {...props}>
        {loading ? (
          <TamaguiAvatar.Image
            accessibilityLabel={accessibilityLabel}
            src={defaultSource}
          />
        ) : (
          <TamaguiAvatar.Image
            accessibilityLabel={accessibilityLabel}
            src={src ?? defaultSource}
          />
        )}
      </StyledAvatar>
    );
  }
);
