import { render, screen } from "@testing-library/react-native";
import Providers from "@/components/providers";
import { Example } from "./Example";
import { Text } from "react-native";

describe("Example", () => {
  it("Should work correctly", async () => {
    render(
      <Providers>
        <Example>
          <Text>Example</Text>
        </Example>
      </Providers>
    );

    expect(await screen.findByText("Example")).toBeDefined();
  });
});
