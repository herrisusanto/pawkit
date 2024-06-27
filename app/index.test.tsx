import { renderRouter } from "expo-router/testing-library";

describe("App", () => {
  it("Router should work correctly", async () => {
    const MockComponent = jest.fn(() => <></>);

    const rendererdRouter = renderRouter(
      {
        index: MockComponent,
        "directory/a": MockComponent,
        "(group)/b": MockComponent,
      },
      {
        initialUrl: "/directory/a",
      }
    );

    expect(rendererdRouter.getPathname()).toMatch("/directory/a");
  });
});
