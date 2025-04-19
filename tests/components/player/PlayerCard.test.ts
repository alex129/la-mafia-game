import { describe, test, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import PlayerCard from "@/components/player/PlayerCard.vue";

describe("PlayerCard", () => {
  const mockPlayer = {
    id: "123",
    name: "Test Player",
    role: "citizen",
    isAlive: true,
  };

  const defaultProps = {
    player: mockPlayer,
    origin: "http://localhost:3000",
  };

  beforeEach(() => {
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
    // Mock alert
    window.alert = vi.fn();
  });

  test("renders player information correctly", () => {
    const wrapper = mount(PlayerCard, {
      props: defaultProps,
    });
    expect(wrapper.text()).toContain("Test Player");
  });

  test("copies player link to clipboard when button is clicked", async () => {
    const wrapper = mount(PlayerCard, {
      props: defaultProps,
    });
    await wrapper.find("button").trigger("click");

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "http://localhost:3000/player/123"
    );
    expect(window.alert).toHaveBeenCalledWith(
      "¡Enlace copiado al portapapeles!"
    );
  });

  test("renders correct player link", () => {
    const wrapper = mount(PlayerCard, {
      props: defaultProps,
    });
    const link = wrapper.find("a");

    expect(link.attributes("href")).toBe("/player/123");
    expect(link.attributes("target")).toBe("_blank");
  });

  test("applies correct styling classes", () => {
    const wrapper = mount(PlayerCard, {
      props: defaultProps,
    });

    // Check main container
    expect(wrapper.find(".bg-white.rounded-lg.shadow-md.p-6").exists()).toBe(
      true
    );

    // Check button styling
    const button = wrapper.find("button");
    expect(button.classes()).toContain("bg-blue-600");
    expect(button.classes()).toContain("text-white");
    expect(button.classes()).toContain("rounded");

    // Check link styling
    const link = wrapper.find("a");
    expect(link.classes()).toContain("text-blue-600");
    expect(link.classes()).toContain("hover:text-blue-800");
  });

  test("handles different player data", () => {
    const differentPlayer = {
      id: "456",
      name: "Different Player",
      role: "mafia",
      isAlive: false,
    };

    const wrapper = mount(PlayerCard, {
      props: {
        player: differentPlayer,
        origin: "http://localhost:3000",
      },
    });

    expect(wrapper.text()).toContain("Different Player");
    expect(wrapper.find("a").attributes("href")).toBe("/player/456");
  });
});
