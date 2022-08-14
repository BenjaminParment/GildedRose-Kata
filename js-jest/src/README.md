# Gilded Rose Structure

Every item in the shop should extend the \_Item class, which in itself extends the original Item class. This means that any item should have in its class its own handleQuality function (the only static property from the \_Item class).

## \_Item Class

This \_Item class was created since we cannot touch the original Item class. It handles the categorization between a conjured and regular item (by checking that the name of the item does not include that keyword). It also implements the handleSellIn function which is called on every update of the shop list. This is because almost all the items have the same implementation of this function (just decrement it day by day). Only the legendary class will override this as it stays the same on every update. Two helper methods are also implemented in it, one to check if an item quantity can increase, the other to check that the item is not expired.

## ItemMap

The itemMap is an object used to generate the correct instance for an object. It works in combination with the getType function implemented in the Shop class. Each item have a specific key used to get the right class from the map.

## Adding more items

Adding an item is more than trivial, all that needs to be done is extend the \_Item class and implement its handleQuality function. To add it to the map, create a key for it and add it to the getItemType function.
