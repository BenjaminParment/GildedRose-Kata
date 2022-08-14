const { AGED_BRIE, BACKSTAGE_PASS, SULFURAS } = require("../const/index.js");

class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      this.handleQuality(item);
      this.handleSellIn(item);
      this.isExpired(item);
    });

    return this.items;
  }

  handleQuality = (item) => {
    if (item.name != AGED_BRIE && item.name != BACKSTAGE_PASS) {
      if (item.quality > 0) {
        if (item.name != SULFURAS) {
          item.quality = item.quality - 1;
        }
      }
    } else {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
        if (item.name == BACKSTAGE_PASS) {
          if (item.sellIn < 11) {
            if (item.quality < 50) {
              item.quality = item.quality + 1;
            }
          }
          if (item.sellIn < 6) {
            if (item.quality < 50) {
              item.quality = item.quality + 1;
            }
          }
        }
      }
    }
  };

  handleSellIn = (item) => {
    if (!this.isItemLegendary(item)) {
      item.sellIn = item.sellIn - 1;
    }
  };

  isItemLegendary = (item) => item.name === SULFURAS;

  isExpired = (item) => {
    if (item.sellIn < 0) {
      this.handleExpired(item);
    }
  };

  handleExpired = (item) => {
    if (item.name != AGED_BRIE) {
      if (item.name != BACKSTAGE_PASS) {
        if (item.quality > 0) {
          if (item.name != SULFURAS) {
            item.quality = item.quality - 1;
          }
        }
      } else {
        item.quality = item.quality - item.quality;
      }
    } else {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
      }
    }
  };
}

module.exports = {
  Item,
  Shop,
};
