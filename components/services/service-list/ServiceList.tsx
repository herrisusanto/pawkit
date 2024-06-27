import { TouchableOpacity } from "react-native";
import React, { PropsWithChildren } from "react";
import { styled, XStack, View, Text } from "tamagui";
import { router } from "expo-router";

interface ServiceItemProps extends PropsWithChildren {
  id: number;
  name: string;
  IconComponent: React.FC;
  routePath: string;
}

interface ServiceListProps extends PropsWithChildren {
  data: ServiceItemProps[];
  itemSize?: "default" | "small";
}

const ServiceList: React.FC<ServiceListProps> = ({
  data,
  itemSize = "default",
}) => {
  const ServicesContainer = styled(XStack, {
    px: "$3",
    py: "$4",
    flexWrap: "wrap",
    rowGap: "$3",
    gap: "$2.5",
    jc:
      itemSize === "small" && data.length < 3 ? "flex-start" : "space-between",
  });

  const ServiceItem = styled(View, {
    w: itemSize === "small" ? 112 : 174,
    h: itemSize === "small" ? 112 : 174,
    borderColor: "$textFourty",
    borderRadius: "$4",
    borderWidth: "$0.5",
    px: "$2",
    bg: "$background",
    jc: "center",
    ai: "center",
    gap: "$1",
  });

  return (
    <ServicesContainer>
      {data.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => router.push(item.routePath)}
        >
          <ServiceItem>
            <View
              width={itemSize === "small" ? 50 : 80}
              height={itemSize === "small" ? 50 : 80}
            >
              <item.IconComponent />
            </View>
            <Text
              fontSize={itemSize === "small" ? "$c1" : "$b3"}
              fontWeight={itemSize === "small" ? "$4" : "$6"}
              textAlign="center"
              lineHeight={16.8}
            >
              {item.name}
            </Text>
          </ServiceItem>
        </TouchableOpacity>
      ))}
    </ServicesContainer>
  );
};

export default ServiceList;
