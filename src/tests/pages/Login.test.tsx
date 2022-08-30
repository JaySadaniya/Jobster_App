import { render, screen } from "@testing-library/react";

import Login from "../../pages/Login";
import { ComponentWithProviders } from "../utils/testing-library";

const renderComponent = (
  <ComponentWithProviders>
    <Login />
  </ComponentWithProviders>
);

describe("Login Page Testing", () => {
  test('renders a "form" element to fill out credentials of user', () => {
    render(renderComponent);

    const outputElement = screen.getByTestId("login-form");
    expect(outputElement).toBeInTheDocument();
  });

  test('renders an "img" element with alt text of "jobster logo"', () => {
    render(renderComponent);

    const outputElement = screen.getByAltText("jobster logo");
    expect(outputElement).toBeInTheDocument();
  });

  test('renders a "h1" element with text of Login', () => {
    render(renderComponent);

    const outputElement = screen.getByRole("heading", { name: "Login" });
    expect(outputElement).toBeInTheDocument();
  });

  test('renders an "input" element with label of email', () => {
    render(renderComponent);

    const outputElement = screen.getByLabelText("Email");
    expect(outputElement).toBeInTheDocument();
  });

  test('renders an "input" element with label of password', () => {
    render(renderComponent);

    const outputElement = screen.getByLabelText("Password");
    expect(outputElement).toBeInTheDocument();
  });

  test('renders a "button" element with Login text', () => {
    render(renderComponent);

    const outputElement = screen.getByRole("button");
    expect(outputElement).toBeInTheDocument();
  });

  test('renders a "p" element with "Not a member yet?" text', () => {
    render(renderComponent);

    const outputElement = screen.getByText("Not a member yet?");
    expect(outputElement).toBeInTheDocument();
  });

  test('renders an "anchor" element with Register text', () => {
    render(renderComponent);

    const outputElement = screen.getByRole("link");
    expect(outputElement).toBeInTheDocument();
  });
});
