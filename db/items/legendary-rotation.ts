import { Trait } from "../../api-types"

import { Item } from "../interfaces"
import { vendorLocations } from "../vendors/locations"
import { compareVendors } from "../vendors/sort"

import {
  isClassicItem,
  isEventReward,
  isQuestReward,
  isSoldForCoin,
} from "./source"

export function addToLegendaryRotation(item: Item, trait: Trait): void {
  if (item.rarity !== "legendary") {
    return
  }

  // event gear only drops in events
  if (isEventReward(trait)) {
    return
  }

  // there were no legendary quest rewards in classic
  // quest rewards are excluded from the celeste rotation
  if (isQuestReward(trait)) {
    return
  }

  // there were no craftable legendaries in classic
  // craftable legendaries are excluded from the celeste
  // rotation
  if (item.recipe) {
    return
  }

  // items that are sold for gold don't need to be in the
  // rotation
  if (item.vendors && item.vendors.length || isSoldForCoin(trait)) {
    return
  }

  const isClassic = isClassicItem(trait)
  const rotation = isClassic ? "Classic" : "Celeste"
  const price = isClassic ? 350 : 700

  item.vendors = item.vendors || []
  item.vendors.push({
    id: "gn_cap_generalempirestore01",
    name: "Empire Store",
    location: vendorLocations.gn_cap_generalempirestore01,
    currency: "empire",
    rarity: "legendary",
    level: 40,
    rotation,
    price,
    blueprint: undefined,
  })
  item.vendors.sort(compareVendors)
}
