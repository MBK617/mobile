import { fromJS } from "immutable"
import { selectApp } from "../selectors"

it("should select app state", () => {
  expect(selectApp({ app: fromJS({ some: "kind", of: "state" })})).toEqual({ some: "kind", of: "state" });
})