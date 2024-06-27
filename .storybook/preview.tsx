import React from "react";
import type { Preview } from "@storybook/react";
import { Provider as JotaiProvider } from "jotai";
import Providers from "../components/providers";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <Providers>
        <JotaiProvider>
          <Story />
        </JotaiProvider>
      </Providers>
    ),
  ],
};

export default preview;
