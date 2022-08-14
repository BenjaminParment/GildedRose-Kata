const { Shop, Item } = require("../src/gilded_rose");
const { AGED_BRIE, BACKSTAGE_PASS, SULFURAS } = require("../const/index.js");

describe("Gilded Rose", () => {
  let item;
  let gildedRose;
  let items;

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
        gildedRose = new Shop([item]);
        items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(9);
        expect(items[0].quality).toBe(11);
      });

      it("Should not increase quality if set at 50", () => {
        item.quality = 50;
        gildedRose = new Shop([item]);
        items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(9);
        expect(items[0].quality).toBe(50);
      });
    });

    describe("When its sellin is set to 0 or less", () => {
      beforeEach(() => ((item.sellIn = 0), (item.quality = 10)));

      it("Should decrement sellin on updates while increasing the quality by 2", () => {
        gildedRose = new Shop([item]);
        items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(-1);
        expect(items[0].quality).toBe(12);
      });

      it("Should set quality to 50 when quality is set to 49", () => {
        item.quality = 49;
        gildedRose = new Shop([item]);
        items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(-1);
        expect(items[0].quality).toBe(50);
      });
    });
  });

  // BACKSTAGE PASS
  describe("Given the backstage pass article", () => {
    beforeEach(() => (item.name = BACKSTAGE_PASS));

    describe("When its sellin is above 10", () => {
      beforeEach(() => (item.sellIn = 11));

      it("Should increase quality and decrease sellin by 1 on update", () => {
        item.quality = 10;
        gildedRose = new Shop([item]);
        items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(10);
        expect(items[0].quality).toBe(11);
      });

      it("Should not increase quality if set at 50", () => {
        item.quality = 50;
        gildedRose = new Shop([item]);
        items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(10);
        expect(items[0].quality).toBe(50);
      });
    });

    describe("When its sellin is set to less than 10 and more than 5", () => {
      beforeEach(() => ((item.sellIn = 8), (item.quality = 10)));

      it("Should decrement sellin on updates while increasing the quality by 2", () => {
        gildedRose = new Shop([item]);
        items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(7);
        expect(items[0].quality).toBe(12);
      });
    });

    describe("When its sellin is set to less than 5 and more than 0", () => {
      beforeEach(() => ((item.sellIn = 3), (item.quality = 10)));

      it("Should decrement sellin on updates while increasing the quality by 3", () => {
        gildedRose = new Shop([item]);
        items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(2);
        expect(items[0].quality).toBe(13);
      });
    });

    describe("When its sellin is set to 0", () => {
      beforeEach(() => ((item.sellIn = 0), (item.quality = 10)));

      it("Should decrement sellin on updates and sets quality to 0", () => {
        gildedRose = new Shop([item]);
        items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(-1);
        expect(items[0].quality).toBe(0);
      });
    });
  });

  // LEGENDARY SULFURAS
  describe("Given the sulfuras article", () => {
    beforeEach(() => (item.name = SULFURAS));

    describe("When its sellin is above 0", () => {
      beforeEach(() => (item.sellIn = 10));

      it("Should not change the quality nor sellin on updates", () => {
        item.quality = 10;
        gildedRose = new Shop([item]);
        items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(10);
        expect(items[0].quality).toBe(10);
      });
    });

    describe("When its sellin is set to 0 or less", () => {
      beforeEach(() => ((item.sellIn = -10), (item.quality = 10)));

      it("Should not change any properties on updates", () => {
        gildedRose = new Shop([item]);
        items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(-10);
        expect(items[0].quality).toBe(10);
      });
    });
  });

  // COMMON ITEM
  describe("Given a common article article", () => {
    beforeEach(() => (item.name = "foo"));

    describe("When its sellin is above 0", () => {
      beforeEach(() => (item.sellIn = 10));

      it("Should decrease both quality and sellin by 1 on update", () => {
        item.quality = 10;
        gildedRose = new Shop([item]);
        items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(9);
        expect(items[0].quality).toBe(9);
      });

      it("Should not decrease quality if that is set to 0 or less", () => {
        item.quality = 0;
        gildedRose = new Shop([item]);
        items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(9);
        expect(items[0].quality).toBe(0);
      });
    });

    describe("When its sellin is set to 0 or less", () => {
      beforeEach(() => ((item.sellIn = 0), (item.quality = 10)));

      it("Should decrement sellin and decrease quality by 2", () => {
        gildedRose = new Shop([item]);
        items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(-1);
        expect(items[0].quality).toBe(8);
      });

      it("Should not change quality if already set to 0", () => {
        item.quality = 0;
        gildedRose = new Shop([item]);
        items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(-1);
        expect(items[0].quality).toBe(0);
      });
    });
  });
});
