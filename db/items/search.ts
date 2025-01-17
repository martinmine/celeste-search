import { Trait } from "../../api-types"

import { Item } from "../interfaces"
import { SearchBuilder } from "../shared/search-helpers"
import {
  searchByEffects,
  searchByLevels,
  searchByRecipe,
  searchByVendor,
} from "../shared/search-tags"

import {
  isBabylonianStartingGear,
  isClassicItem,
  isHalloween2018Reward,
  isNorseStartingGear,
  isPersianStartingGear,
  isQuestReward,
  isReforgeable,
  isSoldByCouncilOfImhotep,
  isSoldByCyprus,
  isSoldByDelianLeague,
  isSoldByLegionOfCarthage,
  isWinterReward,
  isSummer2019Reward,
  isSummer2020Reward,
  isSummer2021Reward,
  isWinter2020Reward,
  isHalloween2019Reward,
  isHalloween2020Reward,
  isHalloween2021Reward,
} from "./source"

export async function buildSearchString(item: Item, trait: Trait): Promise<string> {
  const builder = new SearchBuilder()

  builder.add("gears")
  builder.add("items")

  builder.addStrict(item.id)
  builder.add(item.name)
  builder.add(item.rarity)
  builder.add(item.type)

  await searchByLevels(builder, item.levels)
  await searchByEffects(builder, item.effects)
  await searchByRecipe(builder, item.recipe)
  await searchByVendor(builder, item.vendors)

  if (isSoldByCyprus(trait)) {
    builder.add("Cyprus")
  }
  if (isSoldByCouncilOfImhotep(trait)) {
    builder.add("Council of Imhotep Alliance")
  }
  if (isSoldByDelianLeague(trait)) {
    builder.add("Delian League Alliance")
  }
  if (isSoldByLegionOfCarthage(trait)) {
    builder.add("Legion of Carthage Alliance")
  }
  if (isHalloween2018Reward(trait)) {
    builder.add("Halloween Event Reward")
  }
  if (isWinterReward(trait) || isWinter2020Reward(trait)) {
    builder.add("Winter Event Reward")
  }
  if (isSummer2019Reward(trait) || isSummer2020Reward(trait) || isSummer2021Reward(trait)) {
    builder.add("Summer Event Reward")
  }
  if (isHalloween2019Reward(trait)) {
    builder.add("Halloween Event Reward")
  }
  if (isHalloween2020Reward(trait)) {
    builder.add("Halloween Event Reward")
  }
  if (isHalloween2021Reward(trait)) {
    builder.add("Halloween Event Reward")
  }
  if (isQuestReward(trait)) {
    builder.add("Quest Reward")
  }
  if (isReforgeable(trait)) {
    builder.add("Reforgeable")
  }
  if (item.vendors && item.vendors.some(vendor => vendor.currency === "empire")) {
    builder.add("Legendary Rotation")
  }
  if (isClassicItem(trait)) {
    builder.add("Classic")
  } else {
    builder.add("Celeste")
  }
  if (isBabylonianStartingGear(trait)) {
    builder.add("Babylonian Starting Gear")
  }
  if (isPersianStartingGear(trait)) {
    builder.add("Persian Starting Gear")
  }
  if (isNorseStartingGear(trait)) {
    builder.add("Norse Starting Gear")
  }
  if (item.lootTable) {
    builder.add(item.lootTable)
    if (item.lootTable == "skirmish hall") {
      builder.add("Skirmish-Exclusive")
    } else {
      builder.add(item.lootTable + "-Exclusive")
    }
  }

  if ([
    "BallistaArms",
    "BellyBows",
    "Bows",
    "Clubs2H",
    "FireThrowers",
    "GreatAxe",
    "Javalins",
    "RamHeads",
    "Sling",
    "Spears1H",
    "Spears2H",
    "Swords1H",
  ].includes(trait.traittype)) {
    builder.add("weapon")
  }

  /* if ([
    "ArmorBuilding",
    "ArmorCloth",
    "ArmorLgt",
    "ArmorMed",
    "ArmorPlt",
    "Arrows",
    "FishingNet",
    "Gear",
    "GearBldg",
    "GearBoat",
    "GearPriest",
    "GearSiege",
    "GearVill",
    "Merchant",
    "Scepter",
    "ScoutSpecial1H",
    "Shields",
    "Staffs2H",
    "Tools",
    "Torc",
    "War Horn",
    "Warpaint",
  ].includes(trait.traittype)) {
    builder.add("armor")
  } */

  if ([
    "VanityHelm",
    "VanityShield",
    "VanityWeapon",
  ].includes(trait.traittype)) {
    builder.add("vanity")
  }

  return builder.build()
}
