import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route, Switch } from "react-router-dom";
import All_Jobs from "../../pages/All_Jobs";
import Edit_Job from "../../pages/Edit_Job";
import { ComponentWithProviders, testingMirageServer } from "../utils/testing-library";

const renderComponent = (
  <ComponentWithProviders>
    <Switch>
      <Route path="/edit-job/:jobId">
        <Edit_Job />
      </Route>

      <Route path="*">
        <All_Jobs />
      </Route>
    </Switch>
  </ComponentWithProviders>
);

const position = "edited position";

const server = testingMirageServer();

beforeEach(server.beforeEach);

afterEach(server.afterEach);

describe("Edit_Job Page Testing", () => {
  test("Edit the job position", async () => {
    const user = userEvent.setup();
    render(renderComponent);

    const editButtonList = await screen.findAllByRole("button", { name: "Edit" });

    await user.click(editButtonList[0]);

    const positionInputElement = await screen.findByLabelText("Position");
    expect(positionInputElement).toBeInTheDocument();

    // await user.tripleClick(positionInputElement);
    // await user.keyboard("backspace");
    // expect(positionInputElement).toHaveValue("");
    await user.click(positionInputElement);
    await user.clear(positionInputElement);
    expect(positionInputElement).toHaveValue("");

    await user.type(positionInputElement, position);
    expect(positionInputElement).toHaveValue(position);

    const submitButton = await screen.findByRole("button", { name: "Submit" });
    expect(submitButton).toBeInTheDocument();

    await user.click(submitButton);

    await waitFor(async () => {
      const searchButton = await screen.findByRole("button", { name: "Search" });
      expect(searchButton).toBeInTheDocument();
    });

    const editedJob = await screen.findByText(position);
    expect(editedJob).toBeInTheDocument();
  });
});
