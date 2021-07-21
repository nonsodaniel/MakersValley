import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import store from "../../store/store";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/extend-expect";
import Footer from "./Footer";

afterEach(cleanup);
render(
  <Provider store={store}>
    <Footer />
  </Provider>
);

describe("Completely render <Footer />", () => {
  test("render the Footer component without crashing", () => {
    expect(screen.getAllByTestId("footer")).toHaveLength(1);
  });
});
