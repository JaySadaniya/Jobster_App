import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Profile from "../../pages/Profile";
import { ComponentWithProviders, testingMirageServer } from "../utils/testing-library";

const renderComponent = (
  <ComponentWithProviders>
    <Profile />
  </ComponentWithProviders>
);

const newUserName = "Prince";
const newUserLocation = "Earth 2.0";

const server = testingMirageServer();

beforeEach(server.beforeEach);

afterEach(server.afterEach);

describe("Profile Page Testing", () => {
  test('renders two "button" elements with cancel and submit text', async () => {
    render(renderComponent);

    const cancelButton = await screen.findByRole("button", { name: "Cancel" });
    expect(cancelButton).toBeInTheDocument();

    const submitButton = await screen.findByRole("button", { name: "Submit" });
    expect(submitButton).toBeInTheDocument();
  });

  test("Edits user name and location", async () => {
    const user = userEvent.setup();

    render(renderComponent);

    const userNameElement = await screen.findByLabelText("User Name");
    expect(userNameElement).toBeInTheDocument();

    await user.click(userNameElement);
    await user.clear(userNameElement);
    expect(userNameElement).toHaveValue("");

    await user.type(userNameElement, newUserName);
    expect(userNameElement).toHaveValue(newUserName);

    const locationElement = await screen.findByLabelText("Location");
    expect(locationElement).toBeInTheDocument();

    await user.type(locationElement, newUserLocation);
    expect(locationElement).toHaveValue(newUserLocation);

    const submitButton = await screen.findByRole("button", { name: "Submit" });
    expect(submitButton).toBeInTheDocument();

    await user.click(submitButton);
    expect(submitButton).toHaveTextContent("Submitting");

    await waitFor(async () => {
      const submitButton = await screen.findByRole("button", { name: "Submit" });
      expect(submitButton).toBeInTheDocument();
    });

    const userNameInputElement = await screen.findByLabelText("User Name");
    expect(userNameInputElement).toHaveValue(newUserName);

    const locationInputElement = await screen.findByLabelText("Location");
    expect(locationInputElement).toHaveValue(newUserLocation);
  });
});
