import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import PlayersList from "@/components/player/PlayersList.vue";

describe("PlayersList", () => {
  const mockPlayers = [
    { id: "1", name: "Player 1", role: "citizen", isAlive: true },
    { id: "2", name: "Player 2", role: "mafia", isAlive: true },
  ];

  test("renders list of players", () => {
    const wrapper = mount(PlayersList, {
      props: {
        players: mockPlayers,
      },
    });

    const playerElements = wrapper.findAll("p");
    expect(playerElements).toHaveLength(2);
    expect(playerElements[0].text()).toBe("Player 1");
    expect(playerElements[1].text()).toBe("Player 2");
  });

  test("renders empty list when no players", () => {
    const wrapper = mount(PlayersList, {
      props: {
        players: [],
      },
    });

    expect(wrapper.findAll("p")).toHaveLength(0);
  });

  test("emits remove event with correct index when delete button is clicked", async () => {
    const wrapper = mount(PlayersList, {
      props: {
        players: mockPlayers,
      },
    });

    const deleteButtons = wrapper.findAll("button");
    await deleteButtons[0].trigger("click");

    expect(wrapper.emitted("remove")?.[0]).toEqual([0]);
  });

  test("renders correct number of delete buttons", () => {
    const wrapper = mount(PlayersList, {
      props: {
        players: mockPlayers,
      },
    });

    const deleteButtons = wrapper.findAll("button");
    expect(deleteButtons).toHaveLength(2);
  });

  test("applies correct styling classes", () => {
    const wrapper = mount(PlayersList, {
      props: {
        players: mockPlayers,
      },
    });

    // Check container
    expect(wrapper.find(".space-y-2").exists()).toBe(true);

    // Check player item
    const playerItem = wrapper.find(".flex.items-center.justify-between");
    expect(playerItem.classes()).toContain("bg-[#333333]");
    expect(playerItem.classes()).toContain("rounded-md");
    expect(playerItem.classes()).toContain("border-2");
    expect(playerItem.classes()).toContain("border-[#404040]");

    // Check delete button
    const deleteButton = wrapper.find("button");
    expect(deleteButton.classes()).toContain("text-[#ff0000]");
    expect(deleteButton.classes()).toContain("hover:text-[#ff0000]/80");
    expect(deleteButton.classes()).toContain("cursor-pointer");
  });
});
