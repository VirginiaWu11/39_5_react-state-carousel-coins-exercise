import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();
});

test("it renders without crashing", () => {
  render(<Carousel />);
});

test("it matches snapshot", () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

test("left arrow", () => {
  const { getByText, getByTestId } = render(<Carousel />);
  const rightBtn = getByTestId("right-arrow");
  fireEvent.click(rightBtn);
  const small = getByText("Image 2 of 3.");
  const leftBtn = getByTestId("left-arrow");
  fireEvent.click(leftBtn);
  expect(small).toHaveTextContent("Image 1 of 3.");
  expect(small).not.toHaveTextContent("Image 2 of 3.");
});

test("left/right arrow should not show one first and last image respectively", () => {
  const { getByText, debug, getByTestId } = render(<Carousel />);
  const rightBtn = getByTestId("right-arrow");
  const leftBtn = getByTestId("left-arrow");
  debug();

  expect(leftBtn).not.toBeInTheDocument();
  fireEvent.click(rightBtn);
  fireEvent.click(rightBtn);
  debug();
  expect(rightBtn).not.toBeInTheDocument();
});
