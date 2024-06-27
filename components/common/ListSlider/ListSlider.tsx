import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from "react-native";
import { View, XStack, YStack, useDebounce } from "tamagui";

const { width } = Dimensions.get("screen");

export type ListSliderProps = {
  defaultIndex?: number;
  items?: { key?: string | number; content: React.ReactNode }[];
  onChange?: (index: number) => void;
};

export const ListSlider: React.FC<ListSliderProps> = ({
  onChange,
  items = [],
  defaultIndex = 1,
}) => {
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { x } = e.nativeEvent.contentOffset;
    onChangeDebounced(Math.floor(Math.floor(x) / Math.floor(width)));
  };

  const onChangeDebounced = useDebounce((index: number) => {
    setIndex(index);
    onChange && onChange(index);
  }, 0);

  useEffect(() => {
    if (defaultIndex) {
      scrollRef.current?.scrollTo({ x: width * defaultIndex });
    }
  }, [defaultIndex]);

  return (
    <YStack w="$full" rowGap="$2" jc="center" ai="center">
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={handleScroll}
        showsHorizontalScrollIndicator={false}
      >
        {items.map((item, i) => {
          return (
            <View key={item.key || i} w={width}>
              {item.content}
            </View>
          );
        })}
      </ScrollView>
      <XStack columnGap="$1.5">
        {items.map((item, i) => {
          const isCurrentIndex = i === index;
          return (
            <View
              key={item.key || i}
              h={3}
              w={18}
              bg={isCurrentIndex ? "$primary" : "$natural0"}
              br="$12"
            />
          );
        })}
      </XStack>
    </YStack>
  );
};
