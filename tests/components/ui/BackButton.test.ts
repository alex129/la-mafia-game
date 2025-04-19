import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BackButton from "@/components/ui/BackButton.vue";

describe("BackButton", () => {
  test("renders correctly", () => {
    const wrapper = mount(BackButton);
    const link = wrapper.find("a");

    expect(link.exists()).toBe(true);
    expect(link.attributes("href")).toBe("/games");
    expect(wrapper.text()).toContain("Volver a Partidas");
  });

  test("contains SVG icon", () => {
    const wrapper = mount(BackButton);
    const svg = wrapper.find("svg");

    expect(svg.exists()).toBe(true);
    expect(svg.attributes("class")).toContain("h-5");
    expect(svg.attributes("class")).toContain("w-5");
  });

  test("applies correct styling classes", () => {
    const wrapper = mount(BackButton);
    const link = wrapper.find("a");

    expect(link.classes()).toContain("text-blue-600");
    expect(link.classes()).toContain("hover:text-blue-800");
    expect(link.classes()).toContain("flex");
    expect(link.classes()).toContain("items-center");
    expect(link.classes()).toContain("gap-2");
  });
});
