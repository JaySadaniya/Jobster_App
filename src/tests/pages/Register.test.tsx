import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Register from "../../pages/Register";
import { ComponentWithProviders } from "../utils/testing-library";

const renderComponent = (
  <ComponentWithProviders>
    <Register />
  </ComponentWithProviders>
);

describe("Register Page Testing", () => {
  test('renders a "form" element to fill out credentials of user', () => {
    render(renderComponent);

    const outputElement = screen.getByTestId("register-form");
    expect(outputElement).toBeInTheDocument();
  });

  test('renders an "img" element with alt text of "jobster logo"', () => {
    render(renderComponent);

    const outputElement = screen.getByAltText("jobster logo");
    expect(outputElement).toBeInTheDocument();
  });

  test('renders a "h1" element with text of Register', () => {
    render(renderComponent);

    const outputElement = screen.getByRole("heading", { name: "Register" });
    expect(outputElement).toBeInTheDocument();
  });

  test('renders an "input" element with label of name', () => {
    render(renderComponent);

    const outputElement = screen.getByLabelText("Name");
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

  test('renders a "button" element with Register text', () => {
    render(renderComponent);

    const outputElement = screen.getByRole("button");
    expect(outputElement).toBeInTheDocument();
  });

  test('renders a "p" element with "Already a member?" text', () => {
    render(renderComponent);

    const outputElement = screen.getByText("Already a member?");
    expect(outputElement).toBeInTheDocument();
  });

  test('renders an "anchor" element with Login text', () => {
    render(renderComponent);

    const outputElement = screen.getByRole("link");
    expect(outputElement).toBeInTheDocument();
  });
});
