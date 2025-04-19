import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ConfirmModal from "@/components/modals/ConfirmModal.vue";

describe("ConfirmModal", () => {
  const defaultProps = {
    isOpen: true,
    title: "Test Title",
    message: "Test Message",
  };

  test("renders when isOpen is true", () => {
    const wrapper = mount(ConfirmModal, {
      props: defaultProps,
    });
    expect(wrapper.find(".fixed.inset-0.z-50").exists()).toBe(true);
  });

  test("does not render when isOpen is false", () => {
    const wrapper = mount(ConfirmModal, {
      props: {
        ...defaultProps,
        isOpen: false,
      },
    });
    expect(wrapper.find(".fixed.inset-0.z-50").exists()).toBe(false);
  });

  test("displays correct title and message", () => {
    const wrapper = mount(ConfirmModal, {
      props: defaultProps,
    });
    expect(wrapper.text()).toContain("Test Title");
    expect(wrapper.text()).toContain("Test Message");
  });

  test("emits confirm event when confirm button is clicked", async () => {
    const wrapper = mount(ConfirmModal, {
      props: defaultProps,
    });
    await wrapper.find("#confirm-button").trigger("click");
    expect(wrapper.emitted("confirm")).toBeTruthy();
  });

  test("emits cancel event when cancel button is clicked", async () => {
    const wrapper = mount(ConfirmModal, {
      props: defaultProps,
    });
    await wrapper.find("#cancel-button").trigger("click");
    expect(wrapper.emitted("cancel")).toBeTruthy();
  });
});
