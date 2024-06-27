import { render, screen } from "@testing-library/react-native";
import Providers from "@/components/providers";
import { AvatarPicker } from "./AvatarPicker";

describe("AvatarPicker", () => {
  it("Should work correctly", async () => {
    render(
      <Providers>
        <AvatarPicker />
      </Providers>
    );
    expect(await screen.findByLabelText("Avatar")).toBeOnTheScreen();
  });
});
