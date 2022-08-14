// Consts
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
    const ret = [];
    let item;

    this.items.forEach((i) => {
      switch (true) {
        case i.name.includes(AGED_BRIE):
          item = new AgedBrie(i.name, i.sellIn, i.quality);
          break;
        case i.name.includes(BACKSTAGE_PASS):
          item = new BackstagePass(i.name, i.sellIn, i.quality);
          break;
        case i.name.includes(SULFURAS):
          item = new Legendary(i.name, i.sellIn, i.quality);
          break;
        default:
          item = new Common(i.name, i.sellIn, i.quality);
          break;
      }

      item.handleQuality();
      item.handleSellIn();
      ret.push(item);
    });

    return ret;
  }
}

class _Item extends Item {
  static handleQuality;

  conjuredMultiplier = this.name.includes("Conjured") ? 2 : 1;
  handleSellIn = () => (this.sellIn = this.sellIn - 1);
  canQualityIncrease = () => this.quality < 50;
  isExpired = () => this.sellIn <= 0;
}

class Common extends _Item {
  handleQuality() {
    if (this.quality) {
      this.isExpired()
        ? (this.quality -= 2 * this.conjuredMultiplier)
        : (this.quality -= 1 * this.conjuredMultiplier);
    }
  }
}

class AgedBrie extends _Item {
  handleQuality = () => {
    if (this.canQualityIncrease()) {
      if (!this.isExpired()) {
        this.quality += 1 * this.conjuredMultiplier;
      } else {
        this.quality += 2 * this.conjuredMultiplier;
      }

      if (this.quality > 50) {
        this.quality = 50;
      }
    }
  };
}

class BackstagePass extends _Item {
  handleQuality = () => {
    if (this.isExpired()) {
      this.quality = 0;
    } else if (this.canQualityIncrease()) {
      switch (true) {
        case this.sellIn > 10:
          this.quality += 1 * this.conjuredMultiplier;
          break;
        case this.sellIn > 5:
          this.quality += 2 * this.conjuredMultiplier;
          break;
        default:
          this.quality += 3 * this.conjuredMultiplier;
          break;
      }

      if (this.quality > 50) {
        this.quality = 50;
      }
    }
  };
}

class Legendary extends _Item {
  handleQuality = () => {
    this.quality = this.quality;
  };

  handleSellIn = () => {
    this.sellIn = this.sellIn;
  };
}

module.exports = {
  Item,
  Shop,
};
