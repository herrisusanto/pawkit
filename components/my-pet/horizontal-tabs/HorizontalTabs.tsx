import { useState } from "react";
import { LogBox } from "react-native";
import { StackProps, TabLayout, Tabs, Text, YStack } from "tamagui";

const HorizontalTabs = ({ tabContents }: { tabContents: any[] }) => {
  LogBox.ignoreLogs([
    "Warning: Cannot update a component (`ForwardRef`) while rendering a different component (`TabsTrigger`). To locate the bad setState() call inside `TabsTrigger`, follow the stack trace as described in https://react.dev/link/setstate-in-render",
  ]);

  const [activeAt, setActiveAt] = useState<TabLayout | null>(null);

  const [currentTab, setCurrentTab] = useState<string>("tab1");

  return (
    <Tabs
      value={currentTab}
      onValueChange={setCurrentTab}
      orientation="horizontal"
      size="$4"
      flex={1}
      flexDirection="column"
      activationMode="manual"
      backgroundColor="$bgGrey"
      position="relative"
    >
      <YStack>
        {activeAt && (
          <TabsRovingIndicator
            active
            width={activeAt.width}
            height="$0.25"
            zIndex={90}
            x={activeAt.x}
            bottom={0}
          />
        )}
        <Tabs.List
          disablePassBorderRadius
          loop={false}
          aria-label="Manage Booking"
          gap="$2"
          paddingHorizontal="$4"
          backgroundColor="$background"
          justifyContent="space-between"
        >
          {tabContents.length > 0
            ? tabContents.map((tabItem) => (
                <Tabs.Tab
                  key={tabItem.id}
                  unstyled
                  value={tabItem.value}
                  padding="$3"
                  flex={1}
                  onInteraction={(type, layout) => {
                    if (type === "select") {
                      setActiveAt(layout);
                    }
                  }}
                >
                  <Text
                    fontSize="$c1"
                    color={
                      currentTab === tabItem.value
                        ? "$textPrimary"
                        : "$textThirdy"
                    }
                  >
                    {tabItem.name}
                  </Text>
                </Tabs.Tab>
              ))
            : null}
        </Tabs.List>
      </YStack>

      {tabContents.length > 0
        ? tabContents.map((tabItem) => (
            <Tabs.Content key={tabItem.id} value={tabItem.value} flex={1}>
              <tabItem.component />
            </Tabs.Content>
          ))
        : null}
    </Tabs>
  );
};

const TabsRovingIndicator = ({
  active,
  ...props
}: { active?: boolean } & StackProps) => {
  return (
    <YStack
      position="absolute"
      backgroundColor="$color5"
      opacity={0.7}
      animation="100ms"
      enterStyle={{
        opacity: 0,
      }}
      exitStyle={{
        opacity: 0,
      }}
      {...(active && {
        backgroundColor: "$primary",
        opacity: 0.6,
      })}
      {...props}
    />
  );
};

export default HorizontalTabs;
