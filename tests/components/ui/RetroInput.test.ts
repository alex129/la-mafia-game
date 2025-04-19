import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import RetroInput from "@/components/ui/RetroInput.vue";

describe("RetroInput", () => {
  test("renders with default props", () => {
    const wrapper = mount(RetroInput, {
      props: {
        modelValue: "",
      },
    });
    expect(wrapper.find("input").exists()).toBe(true);
  });

  test("updates modelValue on input", async () => {
    const wrapper = mount(RetroInput, {
      props: {
        modelValue: "",
      },
    });
    const input = wrapper.find("input");
    await input.setValue("test value");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["test value"]);
  });

  test("displays placeholder text", () => {
    const placeholder = "Enter text here";
    const wrapper = mount(RetroInput, {
      props: {
        modelValue: "",
        placeholder,
      },
    });
    expect(wrapper.find("input").attributes("placeholder")).toBe(placeholder);
  });

  test("displays error message when error prop is provided", () => {
    const error = "This field is required";
    const wrapper = mount(RetroInput, {
      props: {
        modelValue: "",
        error,
      },
    });
    expect(wrapper.text()).toContain(error);
    expect(wrapper.find("input").classes()).toContain("border-[#ff0000]");
  });

  test("uses correct input type", () => {
    const wrapper = mount(RetroInput, {
      props: {
        modelValue: "",
        type: "password",
      },
    });
    expect(wrapper.find("input").attributes("type")).toBe("password");
  });

  test("defaults to text type when not specified", () => {
    const wrapper = mount(RetroInput, {
      props: {
        modelValue: "",
      },
    });
    expect(wrapper.find("input").attributes("type")).toBe("text");
  });
});
