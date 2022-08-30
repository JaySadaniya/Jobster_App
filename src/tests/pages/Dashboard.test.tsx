import { render, screen } from "@testing-library/react";

import Dashboard from "../../pages/Dashboard";
import {
  ComponentWithProviders,
  testingMirageServer,
} from "../utils/testing-library";

const renderComponent = (
  <ComponentWithProviders>
    <Dashboard />
  </ComponentWithProviders>
);

const server = testingMirageServer();

beforeEach(server.beforeEach);

afterEach(server.afterEach);

describe("Dashboard Page Testing", () => {
  test('renders a "div" element with loading component', () => {
    render(renderComponent);

    const outputElement = screen.getByTestId("dashboard-loading-element");
    expect(outputElement).toBeInTheDocument();
  });

  test('renders a loader with "Loading data" message', () => {
    render(renderComponent);

    const outputElement = screen.getByText("Loading data");
    expect(outputElement).toBeInTheDocument();
  });

  test('renders three "div" elements containing the card each', async () => {
    render(renderComponent);

    const outputListOfDiv = await screen.findAllByTestId("card-component");
    expect(outputListOfDiv).toHaveLength(3);
  });
});
