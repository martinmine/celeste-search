import { API } from "../download"
import { Recipe, Vendor } from "../interfaces"

import { compareVendors } from "./sort-vendors"

export interface CanBeSold {
  id?: number
  name: string
  rarity: string
  recipe?: Recipe
}

/**
 * Searches all vendors and collects the ones that sell the
 * specified item.
 */
export async function findAndConvertVendors(entity: CanBeSold): Promise<Vendor[]> {
  const stores = await API.getStores()
  const vendors: Vendor[] = []

  stores.forEach(store => {
    const soldItem = store.items.find(storeItem => storeItem.name === entity.name)

    if (soldItem) {
      vendors.push({
        name: store.name,
        level: soldItem.level,
        rarity: soldItem.quality,
        currency: store.currency || soldItem.currency,
        price: soldItem.price,
      })
    }
  })

  vendors.sort(compareVendors)

  return vendors
}
