import { ScrollView, Square } from "tamagui";
import React from "react";
import { Stack } from "expo-router";
import { Header } from "@/components/common/Header/Header";
import TopBannerHelpCenter from "@/components/help-center/top-banner/TopBannerHelpCenter";
import { Input } from "@/components/common/Input/Input";
import { useForm } from "react-hook-form";
import { Search } from "@tamagui/lucide-icons";
import { ContentHelpCenter } from "@/components/help-center/content/ContentHelpCenter";

const HelpCenterPage = () => {
  const { control } = useForm();
  return (
    <ScrollView flex={1}>
      <Stack.Screen
        options={{
          header() {
            return <Header title="Help Center" />;
          },
        }}
      />
      <Square>
        <TopBannerHelpCenter />
        <Input
          position="absolute"
          top="$20"
          marginHorizontal="$7"
          control={control}
          name="search"
          label="How can we help you?"
          placeholder="Search"
          prefixIcon={<Search color="$natural0" size={20} />}
        />
      </Square>
      <ContentHelpCenter />
    </ScrollView>
  );
};

export default HelpCenterPage;
