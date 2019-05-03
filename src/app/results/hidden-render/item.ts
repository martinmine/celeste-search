import { Item } from "../../interfaces"

export const item: Item = {
  id: "item_id",
  name: "name",
  type: "Armor Plating",
  levels: [
    40,
  ],
  icon: 22,
  rarity: "epic",
  effects: [
    {
      name: "name",
      amount: 1.0398,
      scaling: 0.0134,
      beneficial: true,
    },
  ],
  effectsRange: true,
  recipe: {
    school: "Engineering",
    level: 40,
    materials: [
      {
        id: "4ObsidianBlock",
        quantity: 18,
      },
      {
        id: "4PhilosopherStone",
        quantity: 8,
      },
      {
        id: "4ArchimedesTool",
        quantity: 4,
      },
    ],
  },
  vendors: [
    {
      id: "gn_Cap_LootStore06",
      name: "name",
      location: "location",
      blueprint: true,
      level: 40,
      currency: "coin",
      price: 1750,
    },
  ],
  marketplace: [
    {
      ItemID: "Mehrab_R_III",
      ItemType: "Advisor",
      ItemLevel: 7,
      ItemCount: 1,
      ItemPrice: 5000,
      DateTimeExpiry: "2019-05-27T15:16:49.5272071Z",
      ItemSeed: 0,
    },
  ],
  quest: "quest",
  event: { name: "halloween", year: 2018 },
  starting: ["persian", "babylonian", "norse"],
  search: "search",
  searchDynamic: "searchDynamic",
}