import FontLoader from "@/components/common/FontLoader/FontLoader";
import tamaguiConfig from "@/tamagui.config";
import { TamaguiProvider } from "@tamagui/core";
import { PropsWithChildren } from "react";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <FontLoader>
      <TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>
    </FontLoader>
  );
};

export default Providers;
