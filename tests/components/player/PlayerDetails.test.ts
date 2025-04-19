import { describe, test, expect, vi, beforeEach } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import PlayerDetails from "@/components/player/PlayerDetails.vue";
import { GameService } from "@/services/game";
import { config } from "@/config";

const mockFetch = vi.fn();
global.fetch = mockFetch;

vi.mock("@/services/game", () => ({
  GameService: {
    generateAction: vi.fn(),
  },
}));

describe("PlayerDetails", () => {
  const mockPlayer = {
    id: "123",
    name: "Test Player",
    role: "citizen",
    target: "Player 2",
    action: "Test Action",
    regenerate_action_times: 1,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockReset();
  });

  test("renders player details when data is loaded", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ player: mockPlayer }),
    });

    const wrapper = mount(PlayerDetails, {
      props: {
        playerId: "123",
      },
    });

    await flushPromises();
    expect(wrapper.text()).toContain("Test Player's Role");
    expect(wrapper.text()).toContain("Player 2");
    expect(wrapper.text()).toContain("Test Action");
  });

  test("shows remaining regenerate attempts", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ player: mockPlayer }),
    });

    const wrapper = mount(PlayerDetails, {
      props: {
        playerId: "123",
      },
    });

    await flushPromises();
    const remainingAttempts =
      config.MAX_REGENERATE_ACTION_TIMES - mockPlayer.regenerate_action_times;
    expect(wrapper.text()).toContain(`${remainingAttempts} attempts remaining`);
  });

  test("disables regenerate button when max attempts reached", async () => {
    const maxAttemptsPlayer = {
      ...mockPlayer,
      regenerate_action_times: config.MAX_REGENERATE_ACTION_TIMES,
    };

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ player: maxAttemptsPlayer }),
    });

    const wrapper = mount(PlayerDetails, {
      props: {
        playerId: "123",
      },
    });

    await flushPromises();
    const button = wrapper.find("button");
    expect(button.attributes("disabled")).toBeDefined();
  });

  test("shows error message when regeneration fails", async () => {
    mockFetch
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ player: mockPlayer }),
      })
      .mockRejectedValueOnce(new Error("API Error"));

    const wrapper = mount(PlayerDetails, {
      props: {
        playerId: "123",
      },
    });

    await wrapper.vm.$nextTick();
    await wrapper.find("button").trigger("click");

    expect(wrapper.text()).toContain("Error regenerating action");
  });

  test("shows loading state while regenerating", async () => {
    mockFetch
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ player: mockPlayer }),
      })
      .mockImplementationOnce(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );

    const wrapper = mount(PlayerDetails, {
      props: {
        playerId: "123",
      },
    });

    await wrapper.vm.$nextTick();
    await wrapper.find("button").trigger("click");

    expect(wrapper.find(".animate-spin").exists()).toBe(true);
  });

  test("handles fetch error gracefully", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Fetch error"));

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const wrapper = mount(PlayerDetails, {
      props: {
        playerId: "123",
      },
    });

    await wrapper.vm.$nextTick();
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
