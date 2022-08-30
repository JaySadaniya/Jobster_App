import { render, screen } from "@testing-library/react";

import Card from "../../components/Card";
import { ComponentWithProviders } from "../utils/testing-library";

const theme = "pending";
const cardDetail = "Pending Applications";
const totalJobs = 5;

const renderComponent = (
  <ComponentWithProviders>
    <Card theme={theme} totalJobs={totalJobs} />
  </ComponentWithProviders>
);

describe("Card component testing", () => {
  test('renders a "div" element containing the whole card', () => {
    render(renderComponent);

    const outputElement = screen.getByTestId("card-component");
    expect(outputElement).toBeInTheDocument();
  });

  test("renders total number of jobs", () => {
    render(renderComponent);

    const outputElement = screen.getByText(totalJobs);
    expect(outputElement).toBeInTheDocument();
  });

  test("renders card detail with text", () => {
    render(renderComponent);

    const outputElement = screen.getByText(cardDetail);
    expect(outputElement).toBeInTheDocument();
  });

  // test('renders a "svg" element', () => {
  //   render(renderComponent);

  //   const outputElement = screen.getByRole("presentation");
  //   expect(outputElement).toBeInTheDocument();
  // });
});
