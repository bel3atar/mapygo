import {Output, EventEmitter, OnInit, Component} from 'angular2/core';
import {Geolocation} from 'ionic-native';
import {NavController, Modal, Platform, IONIC_DIRECTIVES} from 'ionic-angular';
import {AreaProvider} from '../providers/area';
import {PlacesProvider} from '../providers/places';
import {FeatureGroup, Icon, Marker, LatLngBounds, LatLng, Map, ImageOverlay} from 'leaflet';
import {Place} from '../place';
import {PlaceModal} from '../pages/modals/place';
@Component({
  selector: 'map',
  template: '<div id="map" style="height:100%;width=100%"><ion-spinner *ngIf="!map" style="width:100%;height:100%"></ion-spinner></div>',
  inputs: ['area'],
  providers: [AreaProvider, PlacesProvider],
  directives: [IONIC_DIRECTIVES]
})
export class MapComponent implements OnInit {
  @Output() onReady = new EventEmitter<MapComponent>();
  private _places: {string: Place[]};
  private longname: string;
  private area: string;
  private watch: any;
  private map: Map;
  private pos: LatLng;
  private marker: Marker;
  public featureGroups = {};
  constructor(
    private _areaProvider: AreaProvider,
    private _nav: NavController,
    private _placesProvider: PlacesProvider) {}
    ngOnInit() {
      if (!this.area) {
        Geolocation.getCurrentPosition({timeout: 5000, enableHighAccuracy: true}).then(pos => {
          console.log("GOT POSITION", pos);
          let r = this._areaProvider.posToAreaName(pos);
          this.area = r.name;
          this.longname = r.longname;
          this.pos = new LatLng(pos.coords.latitude, pos.coords.longitude);
          this.makeMap();
          this.marker = new Marker(this.pos, {
            icon: new Icon({
              iconUrl: 'build/img/marker-icon.png',
              iconRetinaUrl: 'build/img/marker-icon-2x.png',
              iconSize: [25, 41], 
              iconAnchor: [12, 40],
              shadowUrl: 'build/img/marker-shadow.png'
            })
          });
          this.marker.addTo(this.map);
          this.watch = Geolocation.watchPosition();
          this.watch.subscribe(pos => {
            this.pos = new LatLng(pos.coords.latitude, pos.coords.longitude);
            this.marker.setLatLng(this.pos);
            this.marker.update();
          });
        }).catch(err => {
          console.log("FAILED GETTING POSITION, DEFAULTING TO marrakech_centre", err);
          this.area = 'marrakech_centre';
          this.longname = 'Marrakech';
          this.pos = new LatLng(31.628864, -7.978979);
          this.makeMap();
        });
      } else { /* TODO: implement functionality when an area is passed */
      }
    }
    private makeMap() {
      let bounds: LatLngBounds = this._areaProvider.areas[this.area].bounds;
      this.map = new Map('map', {
        attributionControl: false,
        minZoom: 15,
        maxZoom: 16,
        zoom: 16,
        center: this.pos,
        maxBounds: bounds,
        layers: [new ImageOverlay(`maps/${this.area}.svg`, bounds)]});
        this.putMarkers();
    } 
    get places(): {string : Place[]} { return this._places; }
    private putMarkers() {
      this._places = this._placesProvider.getPlaces(this.area);
      for (let placeType in this._places) {
        this.featureGroups[placeType] = new FeatureGroup<Marker>();
        this._places[placeType].forEach(place => this.featureGroups[placeType].addLayer(
          new Marker(new LatLng(place.lat, place.lon), {
            icon: new Icon({iconUrl: `icons/${placeType}.png`}),
            title: place.name,
            alt: place.name,
          }).on('click', x => this._nav.present(Modal.create(PlaceModal, place)))
        ));
        //this.featureGroups[placeType].addTo(this.map);
      }
      this.onReady.emit(this);
    }
    public toggle(placeType: string) {
      let layer = this.featureGroups[placeType];
      this.map.hasLayer(layer) ? 
        this.map.removeLayer(layer) :
        this.map.addLayer(layer);
    }
}
