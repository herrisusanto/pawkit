import FontLoader from "@/components/common/FontLoader/FontLoader";
import tamaguiConfig from "@/tamagui.config";
import { TamaguiProvider } from "@tamagui/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { PortalProvider } from "tamagui";
import * as Updates from "expo-updates";
import ForceUpdateModal from "@/components/common/ForceUpdateModal/ForceUpdateModal";
import moment from "moment-timezone";
import GlobalPopupError from "@/components/common/GlobalPopupError/GlobalPopupError";

moment.tz.setDefault("Asia/Singapore");

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { isUpdateAvailable } = Updates.useUpdates();

  const onFetchUpdateAsync = async () => {
    await Updates.fetchUpdateAsync();
    await Updates.reloadAsync();
  };

  return (
    <QueryClientProvider
      client={
        new QueryClient({
          // data will be considered stale after 5 min
          defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
        })
      }
    >
      <PortalProvider>
        <FontLoader>
          <TamaguiProvider config={tamaguiConfig}>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
            <ForceUpdateModal
              open={isUpdateAvailable}
              onUpdateNow={() => onFetchUpdateAsync()}
            />
            <GlobalPopupError />
          </TamaguiProvider>
        </FontLoader>
      </PortalProvider>
    </QueryClientProvider>
  );
}
