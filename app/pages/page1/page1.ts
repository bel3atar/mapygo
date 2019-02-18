import {Page} from 'ionic-angular';
import {MapComponent} from '../../components/map';
import {Place} from '../../place';
import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({name: 'translate'})
class TranslatePipe implements PipeTransform {
  transform(value: string, args: string[]) {
    let h = {
      cafe: "Café",
      restaurant: "Restaurant",
      riad: "Riad",
      nightclub: "Boîte de nuit",
      hotel: "Hôtel"
    };
    return h[value] || value;
  }
}

@Page({
  templateUrl: 'build/pages/page1/page1.html',
  directives: [MapComponent],
  pipes: [TranslatePipe]
})
export class Page1 {
  constructor () {}
  private placeTypes : Array<string> = [];
  private _map: MapComponent;
  mapReady(map: MapComponent) {
    this._map = map;
    for (let placeType in map.featureGroups) {
      this.placeTypes.push(placeType);
    }
  }
  toggle(type: string) {
    this._map.toggle(type);
  }
}
