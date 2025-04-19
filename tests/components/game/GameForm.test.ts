import { describe, test, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import GameForm from "@/components/game/GameForm.vue";
import { GameService } from "@/services/game";
import { GameSchema, PlayerSchema } from "@/schemas/game";
import type { ZodIssue } from "zod";
import RetroInput from "@/components/ui/RetroInput.vue";

// Mock GameService
vi.mock("@/services/game", () => ({
  GameService: {
    createGame: vi.fn(),
  },
}));

describe.skip("GameForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders correctly", () => {
    const wrapper = mount(GameForm);
    expect(wrapper.find("h2").text()).toContain("La Mafia Game");
    expect(wrapper.findComponent(RetroInput).exists()).toBe(true);
  });

  test("adds player when form is valid", async () => {
    const wrapper = mount(GameForm);
    const validPlayer = { name: "Test Player" };

    vi.mocked(PlayerSchema.safeParse).mockReturnValueOnce({
      success: true,
      data: validPlayer,
    });

    await wrapper
      .find('input[placeholder="Nombre del jugador"]')
      .setValue(validPlayer.name);
    await wrapper.find('button:contains("Añadir")').trigger("click");

    expect(wrapper.text()).toContain("Test Player");
  });

  test("shows error when adding invalid player", async () => {
    const wrapper = mount(GameForm);
    const invalidPlayer = { name: "" };

    const mockError: ZodIssue = {
      code: "invalid_type",
      expected: "string",
      received: "undefined",
      path: ["name"],
      message: "Name is required",
      fatal: false,
    };

    vi.mocked(PlayerSchema.safeParse).mockReturnValueOnce({
      success: false,
      error: {
        issues: [mockError],
        message: "Name is required",
        format: () => ({}),
        toJSON: () => ({}),
        toString: () => "Name is required",
        isEmpty: false,
        addIssue: () => {},
        addIssues: () => {},
        clear: () => {},
        flatten: () => ({}),
      },
    });

    await wrapper
      .find('input[placeholder="Nombre del jugador"]')
      .setValue(invalidPlayer.name);
    await wrapper.find('button:contains("Añadir")').trigger("click");

    expect(wrapper.text()).toContain("Name is required");
  });

  test("removes player when remove button is clicked", async () => {
    const wrapper = mount(GameForm);
    const validPlayer = { name: "Test Player" };

    vi.mocked(PlayerSchema.safeParse).mockReturnValueOnce({
      success: true,
      data: validPlayer,
    });

    await wrapper
      .find('input[placeholder="Nombre del jugador"]')
      .setValue(validPlayer.name);
    await wrapper.find('button:contains("Añadir")').trigger("click");
    await wrapper.find("button.text-[#ff0000]").trigger("click");

    expect(wrapper.text()).not.toContain("Test Player");
  });

  test("validates password before creating game", async () => {
    const wrapper = mount(GameForm);
    const shortPassword = "123";

    await wrapper.find('input[type="password"]').setValue(shortPassword);
    await wrapper.find('button:contains("Crear Partida")').trigger("click");

    expect(wrapper.text()).toContain(
      "La contraseña debe tener al menos 4 caracteres"
    );
  });

  test("creates game when form is valid", async () => {
    const wrapper = mount(GameForm);
    const validPlayer = { name: "Test Player" };
    const validPassword = "1234";
    const mockGame = {
      players: [validPlayer],
      password: validPassword,
    };

    vi.mocked(PlayerSchema.safeParse).mockReturnValueOnce({
      success: true,
      data: validPlayer,
    });
    vi.mocked(GameSchema.safeParse).mockReturnValueOnce({
      success: true,
      data: mockGame,
    });
    vi.mocked(GameService.createGame).mockResolvedValueOnce({
      player: { name: "Test Player" },
      target: { name: "Target Player" },
      action: "vote",
      mafia: [{ name: "Mafia Player" }],
    });

    await wrapper
      .find('input[placeholder="Nombre del jugador"]')
      .setValue(validPlayer.name);
    await wrapper.find('button:contains("Añadir")').trigger("click");
    await wrapper.find('input[type="password"]').setValue(validPassword);
    await wrapper.find('button:contains("Crear Partida")').trigger("click");

    expect(GameService.createGame).toHaveBeenCalledWith(
      [validPlayer],
      validPassword
    );
    expect(wrapper.text()).toContain("¡Partida Creada!");
  });

  test("shows error when game creation fails", async () => {
    const wrapper = mount(GameForm);
    const validPlayer = { name: "Test Player" };
    const validPassword = "1234";
    const mockGame = {
      players: [validPlayer],
      password: validPassword,
    };

    vi.mocked(PlayerSchema.safeParse).mockReturnValueOnce({
      success: true,
      data: validPlayer,
    });
    vi.mocked(GameSchema.safeParse).mockReturnValueOnce({
      success: true,
      data: mockGame,
    });
    vi.mocked(GameService.createGame).mockRejectedValueOnce(
      new Error("Creation failed")
    );

    await wrapper
      .find('input[placeholder="Nombre del jugador"]')
      .setValue(validPlayer.name);
    await wrapper.find('button:contains("Añadir")').trigger("click");
    await wrapper.find('input[type="password"]').setValue(validPassword);
    await wrapper.find('button:contains("Crear Partida")').trigger("click");

    expect(wrapper.text()).toContain("Creation failed");
  });

  test("disables create button when form is invalid", async () => {
    const wrapper = mount(GameForm);
    const createButton = wrapper.find('button:contains("Crear Partida")');

    expect(createButton.attributes("disabled")).toBeDefined();
  });

  test("shows loading state while creating game", async () => {
    const wrapper = mount(GameForm);
    const validPlayer = { name: "Test Player" };
    const validPassword = "1234";
    const mockGame = {
      players: [validPlayer],
      password: validPassword,
    };

    vi.mocked(PlayerSchema.safeParse).mockReturnValueOnce({
      success: true,
      data: validPlayer,
    });
    vi.mocked(GameSchema.safeParse).mockReturnValueOnce({
      success: true,
      data: mockGame,
    });
    vi.mocked(GameService.createGame).mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    await wrapper
      .find('input[placeholder="Nombre del jugador"]')
      .setValue(validPlayer.name);
    await wrapper.find('button:contains("Añadir")').trigger("click");
    await wrapper.find('input[type="password"]').setValue(validPassword);
    await wrapper.find('button:contains("Crear Partida")').trigger("click");

    expect(wrapper.find(".animate-spin").exists()).toBe(true);
    expect(wrapper.text()).toContain("Creando...");
  });

  test("redirects after game creation", async () => {
    vi.useFakeTimers();
    const wrapper = mount(GameForm);
    const validPlayer = { name: "Test Player" };
    const validPassword = "1234";
    const mockGame = {
      players: [validPlayer],
      password: validPassword,
    };

    vi.mocked(PlayerSchema.safeParse).mockReturnValueOnce({
      success: true,
      data: validPlayer,
    });
    vi.mocked(GameSchema.safeParse).mockReturnValueOnce({
      success: true,
      data: mockGame,
    });
    vi.mocked(GameService.createGame).mockResolvedValueOnce({
      player: { name: "Test Player" },
      target: { name: "Target Player" },
      action: "vote",
      mafia: [{ name: "Mafia Player" }],
    });

    await wrapper
      .find('input[placeholder="Nombre del jugador"]')
      .setValue(validPlayer.name);
    await wrapper.find('button:contains("Añadir")').trigger("click");
    await wrapper.find('input[type="password"]').setValue(validPassword);
    await wrapper.find('button:contains("Crear Partida")').trigger("click");

    expect(wrapper.text()).toContain("3 segundos");
    vi.advanceTimersByTime(3000);
    expect(window.location.href).toBe("/games");

    vi.useRealTimers();
  });
});
