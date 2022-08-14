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
    for (const item in this.items) {
      this.handleQuality(item);
      this.handleSellIn(item);
      this.isExpired(item);
    }

    return this.items;
  }

  handleQuality = (item) => {
    if (
      item.name != "Aged Brie" &&
      item.name != "Backstage passes to a TAFKAL80ETC concert"
    ) {
      if (item.quality > 0) {
        if (item.name != "Sulfuras, Hand of Ragnaros") {
          item.quality = item.quality - 1;
        }
      }
    } else {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
        if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
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

  isItemLegendary = (item) => item.name === "Sulfuras, Hand of Ragnaros";

  isExpired = (item) => {
    if (item.sellIn < 0) {
      this.handleExpired(item);
    }
  };

  handleExpired = (item) => {
    if (item.name != "Aged Brie") {
      if (item.name != "Backstage passes to a TAFKAL80ETC concert") {
        if (item.quality > 0) {
          if (item.name != "Sulfuras, Hand of Ragnaros") {
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
