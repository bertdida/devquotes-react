import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Feed from "./Feed";
import { AuthContext } from "../Auth";

afterEach(cleanup);

const quotes = {
  data: [
    {
      data: {
        id: 1,
        author: "Author 1",
        quotation: "Quotation 1"
      }
    },
    {
      data: {
        id: 2,
        author: "Author 2",
        quotation: "Quotation 2"
      }
    }
  ]
};

function renderFeed(quotes) {
  return render(
    <AuthContext.Provider value={[null]}>
      <Feed data={{ quotes }} />
    </AuthContext.Provider>
  );
}

it("renders with pagination", () => {
  const { getByTestId } = renderFeed(quotes);
  expect(getByTestId("pagination")).toBeTruthy();
});
