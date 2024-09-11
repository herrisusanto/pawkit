import React, { useState } from "react";
import { YStack, View, Text } from "tamagui";
import { Dimensions, FlatList } from "react-native";
import { Moment } from "moment";

import { Button } from "../Button/Button";

const { width } = Dimensions.get("screen");

type Item = {
  label: string;
  value: string;
};

type Props = {
  items: Item[];
  visibleMonth: Moment;
  onChange: (value: string) => void;
  open?: boolean;
};

const MonthOrYearPicker = YStack.styleable<Props>(
  (
    { items, visibleMonth, onChange, open = false, children, ...props },
    ref
  ) => {
    const [selectedItem, setSelectedItem] = useState<string | null>();

    const handleSelectMonth = () => {
      selectedItem && onChange(selectedItem);
    };

    return (
      <>
        {open && (
          <YStack rowGap="$3" ref={ref} {...props}>
            <FlatList
              keyExtractor={(item) => item.value}
              data={items}
              renderItem={({ item }) => {
                const itemWidth = width - 48;
                const size = itemWidth / 3;
                return (
                  <View
                    p="$2"
                    bw="$0.5"
                    bc={selectedItem === item.value ? "$primary" : "$accent0"}
                    bg={
                      selectedItem === item.value ? "$thirdy" : "$transparent"
                    }
                    w={size - 13}
                    jc="center"
                    ai="center"
                    onPress={() => setSelectedItem(item.value)}
                  >
                    <Text>{item.label}</Text>
                  </View>
                );
              }}
              contentContainerStyle={{
                justifyContent: "space-between",
                gap: 5,
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            />
            <Button
              disabled={!selectedItem}
              type="primary"
              h="$3"
              onPress={handleSelectMonth}
            >
              Select
            </Button>
          </YStack>
        )}
      </>
    );
  }
);

export default MonthOrYearPicker;
