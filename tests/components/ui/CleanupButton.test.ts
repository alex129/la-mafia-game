import { describe, test, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import CleanupButton from "@/components/ui/CleanupButton.vue";
import ConfirmModal from "@/components/modals/ConfirmModal.vue";
import { cleanupGames } from "@/services/api";

// Mock the API function
vi.mock("@/services/api", () => ({
  cleanupGames: vi.fn(),
}));

describe("CleanupButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders correctly", () => {
    const wrapper = mount(CleanupButton);
    expect(wrapper.find("button").exists()).toBe(true);
    expect(wrapper.text()).toContain("Clean Up All Games");
  });

  test("opens modal when button is clicked", async () => {
    const wrapper = mount(CleanupButton);
    await wrapper.find("button").trigger("click");
    expect(wrapper.findComponent(ConfirmModal).props("isOpen")).toBe(true);
  });

  test("closes modal when cancel is clicked", async () => {
    const wrapper = mount(CleanupButton);
    await wrapper.find("button").trigger("click");
    await wrapper.findComponent(ConfirmModal).vm.$emit("cancel");
    expect(wrapper.findComponent(ConfirmModal).props("isOpen")).toBe(false);
  });

  test("calls cleanupGames and emits event on successful cleanup", async () => {
    const mockCleanupGames = cleanupGames as ReturnType<typeof vi.fn>;
    mockCleanupGames.mockResolvedValueOnce(true);

    const wrapper = mount(CleanupButton);
    await wrapper.find("button").trigger("click");
    await wrapper.findComponent(ConfirmModal).vm.$emit("confirm");

    expect(mockCleanupGames).toHaveBeenCalled();
    expect(wrapper.emitted("cleanup-complete")).toBeTruthy();
  });

  test("handles cleanup failure gracefully", async () => {
    const mockCleanupGames = cleanupGames as ReturnType<typeof vi.fn>;
    mockCleanupGames.mockRejectedValueOnce(new Error("Cleanup failed"));

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const wrapper = mount(CleanupButton);

    await wrapper.find("button").trigger("click");
    await wrapper.findComponent(ConfirmModal).vm.$emit("confirm");

    expect(mockCleanupGames).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalled();
    expect(wrapper.emitted("cleanup-complete")).toBeFalsy();

    consoleSpy.mockRestore();
  });

  test("passes correct props to ConfirmModal", () => {
    const wrapper = mount(CleanupButton);
    const modal = wrapper.findComponent(ConfirmModal);

    expect(modal.props("title")).toBe("Clean Up Games");
    expect(modal.props("message")).toBe(
      "Are you sure you want to delete all games and players? This action cannot be undone."
    );
  });
});
