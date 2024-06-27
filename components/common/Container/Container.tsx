import { View } from "tamagui";

type ContainerProps = {
  children?: React.ReactNode;
};

export const Container = View.styleable<ContainerProps>(
  ({ children, ...props }, ref) => {
    return (
      <View ref={ref} px="$4" py="$4" {...props}>
        {children}
      </View>
    );
  }
);
