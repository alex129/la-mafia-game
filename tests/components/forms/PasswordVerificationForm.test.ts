import { describe, test, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import PasswordVerificationForm from "@/components/forms/PasswordVerificationForm.vue";
import { nextTick } from "vue";

describe("PasswordVerificationForm", () => {
  test("renders correctly", () => {
    const wrapper = mount(PasswordVerificationForm);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
    expect(wrapper.find("button").exists()).toBe(true);
    expect(wrapper.text()).toContain("Introduce la Contraseña");
  });

  test("shows error when submitting empty password", async () => {
    const wrapper = mount(PasswordVerificationForm);
    await wrapper.find("button").trigger("click");
    expect(wrapper.text()).toContain("Por favor, introduce la contraseña");
  });

  test("emits verify event with password when submitting", async () => {
    const wrapper = mount(PasswordVerificationForm);

    await wrapper.find("input").setValue("testpassword");
    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted("verify")?.[0]).toEqual(["testpassword"]);
  });

  test("shows error message when verification fails", async () => {
    const wrapper = mount(PasswordVerificationForm);

    await wrapper.find("button").trigger("click");

    await nextTick();

    expect(wrapper.find(".error-message").text()).toContain(
      "Por favor, introduce la contraseña"
    );
  });

  test("submits form when pressing enter", async () => {
    const wrapper = mount(PasswordVerificationForm);

    await wrapper.find("input").setValue("testpassword");
    await wrapper.find("input").trigger("keyup.enter");

    expect(wrapper.emitted("verify")?.[0]).toEqual(["testpassword"]);
  });

  test("clears error when submitting new password", async () => {
    const wrapper = mount(PasswordVerificationForm);

    await wrapper.find("button").trigger("click");
    expect(wrapper.text()).toContain("Por favor, introduce la contraseña");

    await wrapper.find("input").setValue("testpassword");
    await wrapper.find("button").trigger("click");

    expect(wrapper.text()).not.toContain("Por favor, introduce la contraseña");
  });
});
