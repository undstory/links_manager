import { act } from "react";
import { createRoot } from "react-dom/client";
import Card from "./Card";

describe("Card component", () => {
  it("renders header and children content", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(
        <Card header="Test Header">
          <p>Child content</p>
        </Card>,
      );
    });

    expect(container.querySelector("h2")?.textContent).toBe("Test Header");
    expect(container.textContent).toContain("Child content");

    act(() => {
      root.unmount();
    });
  });
});
