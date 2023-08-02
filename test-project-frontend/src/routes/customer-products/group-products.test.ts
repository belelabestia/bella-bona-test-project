import { Status } from "../../types/status";
import { groupProducts, reduceStatus } from "./group-products";
import { expectedGroups, mockProducts } from "./group-products.mocks";

describe("groupProducts", () => {
  test("should group products", () => {
    const result = groupProducts(mockProducts);
    expect(result).toEqual(expectedGroups);
  });
});

describe("reduceStatus", () => {
  test("should reduce all done statuses", () => {
    const statuses: Status[] = [
      "done",
      "done"
    ];

    expect(statuses.reduce(reduceStatus, "done")).toEqual("done");
  });

  test("should reduce all processing statuses", () => {
    const statuses: Status[] = [
      "processing",
      "processing"
    ];

    expect(statuses.reduce(reduceStatus, "done")).toEqual("processing");
  });

  test("should reduce mixed statuses", () => {
    const statuses: Status[] = [
      "processing",
      "done"
    ];

    expect(statuses.reduce(reduceStatus, "done")).toEqual("processing");
  });
});