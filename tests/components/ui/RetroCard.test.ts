import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import RetroCard from "@/components/ui/RetroCard.vue";

describe("RetroCard", () => {
  test("renders without title", () => {
    const wrapper = mount(RetroCard, {
      slots: {
        default: "<div>Card content</div>",
      },
    });
    expect(wrapper.find("h3").exists()).toBe(false);
    expect(wrapper.text()).toContain("Card content");
  });

  test("renders with title", () => {
    const title = "Test Title";
    const wrapper = mount(RetroCard, {
      props: { title },
      slots: {
        default: "<div>Card content</div>",
      },
    });
    expect(wrapper.find("h3").text()).toBe(title);
    expect(wrapper.text()).toContain("Card content");
  });

  test("applies correct styling classes", () => {
    const wrapper = mount(RetroCard);
    expect(wrapper.classes()).toContain("bg-[#333333]");
    expect(wrapper.classes()).toContain("border-2");
    expect(wrapper.classes()).toContain("border-[#404040]");
    expect(wrapper.classes()).toContain("rounded-md");
  });
});
