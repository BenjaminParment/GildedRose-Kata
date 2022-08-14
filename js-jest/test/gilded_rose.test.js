const { Shop, Item } = require("../src/gilded_rose");
const { AGED_BRIE, BACKSTAGE_PASS, SULFURAS } = require("../const/index.js");

describe("Gilded Rose", () => {
  let item;

  beforeEach(() => {
    item = new Item(null, null, 10);
  });

  // AGED BRIE
  describe("Given the aged brie article", () => {
    beforeEach(() => (item.name = AGED_BRIE));

    describe("When its sellin is above 0", () => {
      beforeEach(() => (item.sellIn = 10));

      it("Should increase quality and decrease sellin by 1 on update", () => {
        item.quality = 10;
        const gildedRose = new Shop([item]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(9);
        expect(items[0].quality).toBe(11);
      });

      it("Should not increase quality if set at 50", () => {
        item.quality = 50;
        const gildedRose = new Shop([item]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(9);
        expect(items[0].quality).toBe(50);
      });
    });

    describe("When its sellin is set to 0 or less", () => {
      beforeEach(() => ((item.sellIn = 0), (item.quality = 10)));

      it("Should decrement sellin on updates while increasing the quality by two", () => {
        const gildedRose = new Shop([item]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(-1);
        expect(items[0].quality).toBe(12);
      });
    });
  });
});
