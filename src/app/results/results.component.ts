import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core"

import { map } from "rxjs/operators"

import { SearchService } from "../services"
import { Item } from "./../interfaces/Item"

@Component({
  selector: "cis-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent implements OnInit {

  @Input() activeTab: number

  readonly items = this.search.items.pipe(map(results => results.slice(0, 100)))
  readonly advisors = this.search.advisors.pipe(map(results => results.slice(0, 100)))
  readonly blueprints = this.search.blueprints.pipe(map(results => results.slice(0, 100)))
  readonly designs = this.search.designs.pipe(map(results => results.slice(0, 100)))
  readonly consumables = this.search.consumables.pipe(map(results => results.slice(0, 100)))

  numColumns = 3

  constructor(
    private search: SearchService,
  ) { }

  ngOnInit() {
    this.handleResize()
  }

  handleResize() {
    this.numColumns = Math.max(1, Math.floor(window.innerWidth / 30 / 15))
  }

  trackItem(index: number, item: Item) {
    return item.id
  }

}
