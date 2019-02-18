import {Injectable} from 'angular2/core';
import {LatLng, LatLngBounds} from 'leaflet';
import {Geolocation} from 'ionic-native';
@Injectable()
export class AreaProvider {
  public areas = {
    marrakech_centre: {name: 'Marrakech', bounds: new LatLngBounds(
        new LatLng(31.587894461186,-8.0255126953125),
        new LatLng(31.6627329103456,-7.965087890625))}
  }
  posToAreaName(pos: {coords: {longitude: number, latitude: number}})
    : {name: string, longname: string} {
    let g = new LatLng(pos.coords.latitude, pos.coords.longitude);
    for (let area in this.areas)
      if (this.areas[area].bounds.contains(g))
        return {name: area, longname: this.areas[area].name};
    return {name: 'marrakech_centre', longname: 'Marrakech'};
  }
}

