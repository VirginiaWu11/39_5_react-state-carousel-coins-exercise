import { render } from "@testing-library/react";
import Card from "./Card";

test("it renders without crashing", () => {
  render(<Card />);
});

test("it matches snapshot", () => {
  const { asFragment } = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
});
