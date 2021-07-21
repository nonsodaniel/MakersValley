import { render, cleanup, screen } from "@testing-library/react";
import store from "../../store/store";
import { Provider } from "react-redux";
import AlertBar from "./AlertBar";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);
render(
  <Provider store={store}>
    <AlertBar />
  </Provider>
);

describe("Completely render <Footer />", () => {
  test("render the AlertBar component without crashing", () => {
    expect(screen.getAllByTestId("alert-text")).toHaveLength(1);
  });
});
