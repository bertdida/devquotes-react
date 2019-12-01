import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Quote from "./Quote";
import { AuthContext } from "../Auth";

afterEach(cleanup);

const quote = {
  id: 1,
  author: "Author 1",
  quotation: "Quotation 1"
};

it("renders semantic quote", () => {
  const { getByTestId } = render(
    <AuthContext.Provider value={[null]}>
      <Quote quote={quote} />
    </AuthContext.Provider>
  );

  expect(getByTestId("quote").nodeName).toBe("BLOCKQUOTE");
  expect(getByTestId("author").nodeName).toBe("CITE");
  expect(getByTestId("quotation").nodeName).toBe("P");
  expect(getByTestId("author")).toHaveTextContent(quote.author);
  expect(getByTestId("quotation")).toHaveTextContent(quote.quotation);
});
