import { Blueprint } from "../../interfaces"

export const blueprint: Blueprint = {
  id: "blueprint_id",
  name: "name",
  description: "description",
  icon: "QGzs6E0U",
  rarity: "common",
  materials: [],
  vendors: [
    {
      id: "gn_Cap_LootStore06",
      name: "name",
      location: "location",
      level: 0,
      currency: "empire",
      price: 50,
      rarity: "common",
      quantity: 1,
      rotation: "classic",
    },
  ],
  marketplace: [
    {
      id: "alexander_l_iv",
      rarity: "legendary",
      level: 40,
    },
  ],
  event: { name: "halloween", year: 2018 },
  search: "search",
  lootTable: undefined
}
