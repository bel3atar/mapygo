import {NavParams, Page, ViewController} from 'ionic-angular';
import {Place} from '../../place';
@Page({
  templateUrl: 'build/pages/modals/place.html'
})
export class PlaceModal {
  private place: Place;
  constructor (private params: NavParams, private viewCtrl: ViewController) {
    this.place = params.data;
  }
  close() {
    this.viewCtrl.dismiss();
  }
  error(place: Place) {
    place.image = null;
  }
}
