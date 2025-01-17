import { Pipe, PipeTransform } from "@angular/core"

import { ItemEffect } from "../interfaces"
import { SettingsService } from "../services/settings.service"

@Pipe({
  name: "effectValue",
  pure: false,
})
export class EffectValuePipe implements PipeTransform {

  constructor(
    private settings: SettingsService,
  ) { }

  transform(effect: ItemEffect, level: number, modifier: number): string {
    const precision = +this.settings.precision.value
    const base = effect.name === "Regen. Rate" ? effect.scaling * (level + 3) + effect.amount : (effect.amount - 1) * 100 + effect.scaling * 100 * (level + 3)
    const sign = base < 0 ? "-" : "+"
    const unit = effect.name === "Regen. Rate" ? " Health Per Second" : "%"

    const modified = base * modifier
    const absolute = Math.abs(modified)
    const rounded = absolute.toFixed(precision)

    return sign + rounded + unit
  }

}
