import { Material as ApiMaterial } from "../../api-types"

import { downloadIcon } from "../download"
import { Material } from "../interfaces"
import { translateEn } from "../shared/convert-text"

export async function convertMaterial(material: ApiMaterial): Promise<Material> {
  const name = await translateEn(material.displaynameid, material.name)
  const icon = await downloadIcon(`Art/${material.icon}`, "materials")
  const rarity = material.rarity.substr("cRarity".length).toLowerCase()

  return {
    id: material.name,
    name,
    icon,
    rarity,
  }
}
