import React from "react";
import { Stack } from "expo-router";
import { Header } from "@/components/common/Header/Header";
import { View } from "tamagui";
import ServiceList from "@/components/services/service-list/ServiceList";
import { WellnessIcon } from "@/components/common/Icons";

const WellnessScreen = () => {
  return (
    <View flex={1}>
      <Stack.Screen
        options={{
          header() {
            return <Header title="Wellness" />;
          },
        }}
      />
      <ServiceList
        itemSize="small"
        data={[
          {
            id: 1,
            name: "Microchipping",
            IconComponent: () => <WellnessIcon />,
            routePath: "/services/vaccination",
          },
        ]}
      />
    </View>
  );
};

export default WellnessScreen;
