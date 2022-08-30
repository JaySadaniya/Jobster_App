import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route, Switch } from "react-router-dom";

import Add_Job from "../../pages/Add_Job";
import All_Jobs from "../../pages/All_Jobs";
import { ComponentWithProviders, testingMirageServer } from "../utils/testing-library";

const renderComponent = (
  <ComponentWithProviders>
    <Switch>
      <Route path="/all-jobs">
        <All_Jobs />
      </Route>

      <Route path="*">
        <Add_Job />
      </Route>
    </Switch>
  </ComponentWithProviders>
);

const position = "Front-End Developer";
const company = "CodeVally";
const jobLocation = "Dubai";
const status = "pending";

const server = testingMirageServer();

beforeEach(server.beforeEach);

afterEach(server.afterEach);

describe("Add_Job Page Testing", () => {
  test('renders two "button" elements with clear and submit text', async () => {
    render(renderComponent);

    const clearButton = await screen.findByRole("button", { name: "Clear" });
    expect(clearButton).toBeInTheDocument();

    const submitButton = await screen.findByRole("button", { name: "Submit" });
    expect(submitButton).toBeInTheDocument();
  });

  test("add a new job entry", async () => {
    const user = userEvent.setup();
    render(renderComponent);

    const positionInputElement = await screen.findByLabelText("Position");
    expect(positionInputElement).toBeInTheDocument();

    await user.type(positionInputElement, position);
    expect(positionInputElement).toHaveValue(position);

    const companyInputElement = await screen.findByLabelText("Company");
    expect(companyInputElement).toBeInTheDocument();

    await user.type(companyInputElement, company);
    expect(companyInputElement).toHaveValue(company);

    const jobLocationInputElement = await screen.findByLabelText("Job Location");
    expect(jobLocationInputElement).toBeInTheDocument();

    await user.type(jobLocationInputElement, jobLocation);
    expect(jobLocationInputElement).toHaveValue(jobLocation);

    const statusInputElement = await screen.findByLabelText("Status");
    expect(statusInputElement).toBeInTheDocument();

    await user.click(statusInputElement);

    const pendingStatusOption = await screen.findByRole("option", { name: status });
    expect(pendingStatusOption).toBeInTheDocument();

    await user.click(pendingStatusOption);
    expect(statusInputElement).toHaveTextContent(status);

    const submitButton = await screen.findByRole("button", { name: "Submit" });
    expect(submitButton).toBeInTheDocument();

    await user.click(submitButton);

    await waitFor(
      async () => {
        const editButtonList = await screen.findAllByRole("button", { name: "Edit" });
        expect(editButtonList).toHaveLength(9);
      },
      { timeout: 1500 }
    );
  });
});
