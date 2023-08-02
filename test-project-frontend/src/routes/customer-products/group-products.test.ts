import { groupProducts } from "./group-products";
import { expectedGroups, mockProducts } from "./group-products.mocks";

describe("groupProducts", () => {
  test("should group products", () => {
    const result = groupProducts(mockProducts);
    expect(result).toEqual(expectedGroups);
  });
});
