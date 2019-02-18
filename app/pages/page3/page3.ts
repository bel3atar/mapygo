import {Page} from 'ionic-angular';
import {NgZone, OnInit} from 'angular2/core';
import {SocialSharing, Camera} from 'ionic-native';


@Page({
  templateUrl: 'build/pages/page3/page3.html',
  inputs: ['image']
})
export class Page3 implements OnInit {
  public image: string;
  constructor(private _ngz: NgZone) {}
  ngOnInit() {
    this.takePicture();
  }
  private takePicture() {
    Camera.getPicture({
      cameraDirection: 1,
      destinationType: 0,
      correctOrientation: true
    }).then(img => this.workImage(img));
  }
  private share() {
    SocialSharing.share("Beaux souvenirs à Marrakech", "MapyGoCard", this.image);
  }
  workImage(camImg: string) {
    let resolutions = {
      '4-3' : {w: 2048, h: 1536},
      '3-4' : {w: 1536, h: 2048},
      '16-9': {w: 2560, h: 1440},
      '9-16': {w: 1440, h: 2560}
    };

    var img: HTMLImageElement = new Image();
    img.src = `data:image;base64,${camImg}`;
    img.onload = () => {
      var aspect: string = this.detectAspect(img.width, img.height);

      console.log(`detected image apect ${aspect}`);

      var h: number = Math.min(img.height, resolutions[aspect].h)
        , w: number = Math.min(img.width , resolutions[aspect].w);

      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');

      canvas.width = w;
      canvas.height = h;

      context.drawImage(img, 0, 0, w, h);
      var overlay: HTMLImageElement = new Image();
      overlay.src = `assets/${aspect}.png`;
      overlay.onload = () => {
        context.drawImage(overlay, 0, 0, w, h);
        this._ngz.run(() => this.image = canvas.toDataURL());
      };
    }
  }
  private detectAspect(w: number, h: number): string {
    switch (Math.floor(w / h * 100) / 100) {
      case 1.33: return '4-3';
      case 0.75: return '3-4';
      case 1.77: return '16-9';
      case 0.56: return '9-16';
    }
  }
}
