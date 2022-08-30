import { render, screen, waitFor } from "@testing-library/react";
import { useLayoutEffect, useState } from "react";
import { Route, Router, Switch } from "react-router-dom";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import All_Jobs from "../../pages/All_Jobs";
import { ComponentWithProviders, testingMirageServer } from "../utils/testing-library";
import Add_Job from "../../pages/Add_Job";
import Edit_Job from "../../pages/Edit_Job";

const renderComponent = (
  <ComponentWithProviders>
    <Switch>
      {/* <All_Jobs /> */}

      {/* <Link to="/add-job">
        <button>New Job Button</button>
      </Link> */}

      <Route path="/add-job">
        <Add_Job />
      </Route>

      <Route path="/edit-job/:jobId">
        <Edit_Job />
      </Route>

      <Route path="*">
        <All_Jobs />
      </Route>
    </Switch>
  </ComponentWithProviders>
);

const server = testingMirageServer();

beforeEach(server.beforeEach);

afterEach(server.afterEach);

describe("All_Jobs Page Testing", () => {
  test('renders a "button" element for "Add a new job" text', async () => {
    render(renderComponent);

    const buttonElement = await screen.findAllByRole("button", { name: "Add a new job" });
    expect(buttonElement).toHaveLength(1);
  });

  test('renders a "h1" element with the text Search Job', async () => {
    render(renderComponent);

    const headingElement = await screen.findByRole("heading", {
      name: "Search Job",
    });
    expect(headingElement).toBeInTheDocument();
  });

  test('renders an "input" element with label of "Search"', async () => {
    render(renderComponent);

    const inputElement = await screen.findByLabelText("Search");
    expect(inputElement).toBeInTheDocument();
  });

  test('renders an "select" element with label of "Status"', async () => {
    render(renderComponent);

    const selectElement = await screen.findByLabelText("Status");
    expect(selectElement).toBeInTheDocument();
  });

  test('renders an "select" element with label of "Sort"', async () => {
    render(renderComponent);

    const selectElement = await screen.findByLabelText("Sort");
    expect(selectElement).toBeInTheDocument();
  });

  test('renders two datepicker elements with placeholder text "Select Date"', async () => {
    render(renderComponent);

    const datePickerElementsList = await screen.findAllByPlaceholderText("Select Date");
    expect(datePickerElementsList).toHaveLength(2);
  });

  test('renders a "button" element with "Clear Filters" text', async () => {
    render(renderComponent);

    const buttonElement = await screen.findAllByRole("button", { name: "Clear Filters" });
    expect(buttonElement).toHaveLength(1);
  });

  test('renders a "button" element with "Search" text', async () => {
    render(renderComponent);

    const buttonElement = await screen.findAllByRole("button", { name: "Search" });
    expect(buttonElement).toHaveLength(1);
  });

  test('renders a "button" element with "Add a new job" text', async () => {
    render(renderComponent);

    const buttonElement = await screen.findAllByRole("button", { name: "Add a new job" });
    expect(buttonElement).toHaveLength(1);
  });

  test('deletes a "job" when clicked on the delete button', async () => {
    const user = userEvent.setup();
    render(renderComponent);

    const deleteButtons = await screen.findAllByRole("button", { name: "Delete" });

    await user.click(deleteButtons[0]);

    const okModalButton = await screen.findByRole("button", { name: "OK" });
    expect(okModalButton).toBeInTheDocument();

    await user.click(okModalButton);
    const deleteButtonsList = await screen.findAllByRole("button", { name: "Delete" });

    expect(deleteButtonsList).toHaveLength(deleteButtons.length - 1);
  });

  test('filter jobs based on "company" search text', async () => {
    const user = userEvent.setup();
    render(renderComponent);

    const editButtons = await screen.findAllByRole("button", { name: "Edit" });
    const companyTextList = await screen.findAllByText("company", { exact: false });

    const searchInputElement = await screen.findByLabelText("Search");
    await user.type(searchInputElement, "company");

    expect(searchInputElement).toHaveValue("company");

    const searchButton = await screen.findByRole("button", { name: "Search" });
    await user.click(searchButton);

    await waitFor(async () => {
      const editButtonsAfterFilter = await screen.findAllByRole("button", { name: "Edit" });
      expect(editButtonsAfterFilter).not.toHaveLength(editButtons.length);
    });
    expect(companyTextList).toHaveLength(companyTextList.length);
  });

  test('filter jobs based on "pending" status', async () => {
    const user = userEvent.setup();
    render(renderComponent);

    const pendingTextListBeforeFiltering = await screen.findAllByText("pending");
    const editButtons = await screen.findAllByRole("button", { name: "Edit" });

    const statusSelectElement = await screen.findByLabelText("Status");
    expect(statusSelectElement).toHaveTextContent("all");

    await user.click(statusSelectElement);

    const statusOptionWithPending = await screen.findByRole("option", { name: "pending" });

    await user.click(statusOptionWithPending);
    expect(statusSelectElement).toHaveTextContent("pending");

    const searchButton = await screen.findByRole("button", { name: "Search" });
    expect(searchButton).toBeInTheDocument();

    await user.click(searchButton);

    await waitFor(async () => {
      const editButtonsAfterFilter = await screen.findAllByRole("button", { name: "Edit" });
      expect(editButtonsAfterFilter).not.toHaveLength(editButtons.length);
    });
    const pendingTextList = await screen.findAllByText("pending");
    expect(pendingTextList).toHaveLength(pendingTextListBeforeFiltering.length + 1);

    const declinedTextList = screen.queryAllByText("declined");
    expect(declinedTextList).toHaveLength(0);

    const scheduledTextList = screen.queryAllByText("scheduled");
    expect(scheduledTextList).toHaveLength(0);
  });

  test('renders a new add job page when clicked on "Add a new job" button', async () => {
    const user = userEvent.setup();

    // render(
    //   <ComponentWithProviders>
    //     {/* <CustomRouter history={history}> */}
    //     <MemoryRouter initialEntries={["/all-jobs"]}>{renderComponent}</MemoryRouter>

    //     {/* </CustomRouter> */}
    //   </ComponentWithProviders>
    // );

    render(renderComponent);

    const buttonElement = await screen.findByRole("button", { name: "Add a new job" });
    await user.click(buttonElement);

    const submitButton = await screen.findByRole("button", { name: "Submit" });

    expect(submitButton).toBeInTheDocument();
  });
});
