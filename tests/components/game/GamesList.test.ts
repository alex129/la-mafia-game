import { describe, test, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import GamesList from "@/components/game/GamesList.vue";
import { GameService } from "@/services/game";
import { GameSchema } from "@/schemas/game";

vi.mock("@/services/game", () => ({
  GameService: {
    getGames: vi.fn(),
  },
}));

vi.mock("@/schemas/game", () => ({
  GameSchema: {
    safeParse: vi.fn(),
  },
}));

describe.skip("GamesList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders loading state initially", () => {
    const wrapper = mount(GamesList);
    expect(wrapper.find(".animate-spin").exists()).toBe(true);
    expect(wrapper.text()).toContain("Cargando...");
  });

  test("renders create game button", () => {
    const wrapper = mount(GamesList);
    const createButton = wrapper.find("a[href='/game/create']");
    expect(createButton.exists()).toBe(true);
    expect(createButton.text()).toContain("Crear Partida");
  });

  test("renders cleanup button when games exist", async () => {
    const mockGames = [
      { id: "1", name: "Game 1" },
      { id: "2", name: "Game 2" },
    ];

    (GameService.getGames as jest.Mock).mockResolvedValueOnce(mockGames);

    const wrapper = mount(GamesList);
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent({ name: "CleanupButton" }).exists()).toBe(
      true
    );
  });

  test("displays games list after loading", async () => {
    const mockGames = [
      { id: "1", name: "Game 1", createdAt: "2024-01-01T00:00:00Z" },
      { id: "2", name: "Game 2", createdAt: "2024-01-02T00:00:00Z" },
    ];

    (GameService.getGames as jest.Mock).mockResolvedValueOnce(mockGames);

    const wrapper = mount(GamesList);
    await wrapper.vm.$nextTick();

    const gameLinks = wrapper.findAll("a[href^='/game/']");
    expect(gameLinks).toHaveLength(2);
    expect(gameLinks[0].text()).toContain("Game 1");
    expect(gameLinks[1].text()).toContain("Game 2");
  });

  test("shows no games message when list is empty", async () => {
    (GameService.getGames as jest.Mock).mockResolvedValueOnce([]);

    const wrapper = mount(GamesList);
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("No hay partidas disponibles");
  });

  test("handles fetch error gracefully", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    (GameService.getGames as jest.Mock).mockRejectedValueOnce(
      new Error("Fetch failed")
    );

    const wrapper = mount(GamesList);
    await wrapper.vm.$nextTick();

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching games:",
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });

  test("formats dates correctly", async () => {
    const mockGames = [
      { id: "1", name: "Game 1", createdAt: "2024-01-01T00:00:00Z" },
    ];

    (GameService.getGames as jest.Mock).mockResolvedValueOnce(mockGames);

    const wrapper = mount(GamesList);
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("01/01/2024");
  });
});
