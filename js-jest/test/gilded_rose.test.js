const { Shop, Item } = require("../src/gilded_rose");
const { AGED_BRIE, BACKSTAGE_PASS, SULFURAS } = require("../const/index.js");

describe("Gilded Rose", () => {
  it("should update aged brie correctly", () => {
    const gildedRose = new Shop([new Item(AGED_BRIE, 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(11);
  });
});
