import {NavParams, Page, ViewController} from 'ionic-angular';
@Page({
  templateUrl: 'build/pages/modals/details.html'
})
export class DetailsModal {
  private event: Event;
  constructor (private params: NavParams, private viewCtrl: ViewController) {
    this.event = params.data;
  }
  close() {
    this.viewCtrl.dismiss();
  }
}
