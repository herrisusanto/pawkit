import React from "react";
import { Stack } from "expo-router";
import { Header } from "@/components/common/Header/Header";
import { View } from "tamagui";
import ServiceList from "@/components/services/service-list/ServiceList";
import { HospiceCareIcon } from "@/components/common/Icons";

const HospiceCareScreen = () => {
  return (
    <View flex={1}>
      <Stack.Screen
        options={{
          header() {
            return <Header title="Hospice Care" />;
          },
        }}
      />
      <ServiceList
        itemSize="small"
        data={[
          {
            id: 1,
            name: "Palliative Care",
            IconComponent: () => <HospiceCareIcon />,
            routePath: "/services/vaccination",
          },
          {
            id: 2,
            name: "Quality of Life Assessment",
            IconComponent: () => <HospiceCareIcon />,
            routePath: "/services/vaccination",
          },
        ]}
      />
    </View>
  );
};

export default HospiceCareScreen;
