import { useLocalSearchParams } from "expo-router";
import { Text } from "tamagui";

export default function () {
  const { serviceName } = useLocalSearchParams();
  return (
    <>
      <Text>{serviceName}</Text>
    </>
  );
}
