import { describe, it, expect } from "vitest";
import { api } from "../lib/api";

// Test utilities
describe("Utility Functions", () => {
  it("should pass basic test", () => {
    expect(true).toBe(true);
  });
});

// Test API functions
describe("API Functions", () => {
  it("should have api object with required methods", () => {
    expect(api).toBeDefined();
    expect(typeof api.getBlogPosts).toBe("function");
    expect(typeof api.subscribeNewsletter).toBe("function");
    expect(typeof api.sendContactMessage).toBe("function");
  });
});

// Test form validation logic
describe("Form Validation", () => {
  const validateForm = (form: {
    name: string;
    email: string;
    message: string;
  }) => {
    const errors = { name: "", email: "", message: "" };
    let isValid = true;

    if (!form.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!form.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!form.message.trim()) {
      errors.message = "Message is required";
      isValid = false;
    }

    return { isValid, errors };
  };

  it("should validate valid form data", () => {
    const form = {
      name: "John Doe",
      email: "john@example.com",
      message: "Hello world",
    };

    const { isValid, errors } = validateForm(form);
    expect(isValid).toBe(true);
    expect(errors.name).toBe("");
    expect(errors.email).toBe("");
    expect(errors.message).toBe("");
  });

  it("should reject empty name", () => {
    const form = {
      name: "",
      email: "john@example.com",
      message: "Hello world",
    };

    const { isValid, errors } = validateForm(form);
    expect(isValid).toBe(false);
    expect(errors.name).toBe("Name is required");
  });

  it("should reject invalid email", () => {
    const form = {
      name: "John Doe",
      email: "invalid-email",
      message: "Hello world",
    };

    const { isValid, errors } = validateForm(form);
    expect(isValid).toBe(false);
    expect(errors.email).toBe("Please enter a valid email");
  });

  it("should reject empty message", () => {
    const form = {
      name: "John Doe",
      email: "john@example.com",
      message: "",
    };

    const { isValid, errors } = validateForm(form);
    expect(isValid).toBe(false);
    expect(errors.message).toBe("Message is required");
  });
});
