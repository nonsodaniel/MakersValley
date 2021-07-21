import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import store from "../../store/store";
import { Provider } from "react-redux";
import Todos from "./Todos";

afterEach(cleanup);
render(
  <Provider store={store}>
    <Todos />
  </Provider>
);

describe("Completely render <Todos />", () => {
  test("render the Todos component without crashing", () => {
    expect(screen.getAllByTestId("todos-wrap")).toHaveLength(1);
  });
});
