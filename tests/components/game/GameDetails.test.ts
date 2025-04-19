import PasswordVerificationForm from "@/components/forms/PasswordVerificationForm.vue";
import GameDetails from "@/components/game/GameDetails.vue";
import BackButton from "@/components/ui/BackButton.vue";
import { flushPromises, mount } from "@vue/test-utils";
import { beforeEach, describe, expect, test, vi } from "vitest";
import * as api from "@/services/api";
import { nextTick } from "vue";
import PlayerCard from "@/components/player/PlayerCard.vue";

const mockFetch = vi.fn();
global.fetch = mockFetch;
describe("GameDetails", () => {
  const mockGame = {
    id: "123",
    players: [{ id: "1", name: "Player 1" }],
    password: "12345",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(api, "verifyGamePassword").mockResolvedValueOnce(true);
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve({ game: mockGame }),
    });
  });

  test("renders password verification form initially", () => {
    const wrapper = mount(GameDetails, {
      props: {
        gameId: "123",
      },
    });
    expect(wrapper.findComponent(PasswordVerificationForm).exists()).toBe(true);
  });

  test("shows loading state while fetching game data", async () => {
    const wrapper = mount(GameDetails, {
      props: {
        gameId: "123",
      },
    });
    await flushPromises();
    const validPassword = "12345";

    await wrapper
      .findComponent(PasswordVerificationForm)
      .vm.$emit("verify", validPassword);

    await nextTick();

    expect(wrapper.find("#loading-icon").exists()).toBe(true);
  });

  test("fetches and displays game details after password verification", async () => {
    const wrapper = mount(GameDetails, {
      props: {
        gameId: "123",
      },
    });
    await flushPromises();
    const validPassword = "12345";

    await wrapper
      .findComponent(PasswordVerificationForm)
      .vm.$emit("verify", validPassword);

    await nextTick();
    await flushPromises();

    expect(wrapper.findComponent(PlayerCard).exists()).toBe(true);
  });

  test("handles password verification failure", async () => {
    const wrapper = mount(GameDetails, {
      props: {
        gameId: "123",
      },
    });
    await flushPromises();
    const invalidPassword = "1234";

    await wrapper
      .findComponent(PasswordVerificationForm)
      .vm.$emit("verify", invalidPassword);

    expect(wrapper.findComponent(PasswordVerificationForm).exists()).toBe(true);
  });

  test("passes correct props to PlayerCard components", async () => {
    const mockGame = {
      id: "123",
      players: [
        {
          id: "1",
          name: "Player 1",
          role: "citizen",
          target: "Player 2",
          action: "vote",
          regenerate_action_times: 1,
        },
        {
          id: "2",
          name: "Player 2",
          role: "mafia",
          target: "Player 1",
          action: "kill",
          regenerate_action_times: 1,
        },
      ],
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ game: mockGame }),
    });

    const wrapper = mount(GameDetails, {
      props: {
        gameId: "123",
      },
    });

    await wrapper
      .findComponent(PasswordVerificationForm)
      .vm.$emit("verify", "valid-password");

    await flushPromises();

    const playerCards = wrapper.findAllComponents(PlayerCard);
    expect(playerCards).toHaveLength(2);

    playerCards.forEach((card, index) => {
      expect(card.props("player")).toEqual(mockGame.players[index]);
      expect(card.props("origin")).toBe(window.location.origin);
    });
  });

  test("renders back button", () => {
    const wrapper = mount(GameDetails, {
      props: {
        gameId: "123",
      },
    });
    expect(wrapper.findComponent(BackButton).exists()).toBe(true);
  });
});
