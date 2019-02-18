import {NavController, Modal, Page} from 'ionic-angular';
import {Event} from '../../event';
import {OnInit} from 'angular2/core';
import {EventsProvider} from '../../providers/events';
import {DetailsModal} from '../modals/details';


@Page({
  templateUrl: 'build/pages/page2/page2.html',
  providers: [EventsProvider]
})
export class Page2 implements OnInit {
  constructor (private nav: NavController, private _eventsProvider: EventsProvider) {
  }
  private events = {};
  private errorMessage: string;
  getEvents(e?) {
    this._eventsProvider.getEvents().subscribe(
      events => {
        this.events = {};
        console.log('got events', events);
        for (let i = 0; i < events.length; ++i)
        console.log(`events[${i}] = ${events[i]}`);
        events.forEach(event => {
          console.log('foreach', event);
          if (!this.events[event.type]) this.events[event.type] = [];
          this.events[event.type].push(event);
        });
        console.log('FINAL DICTIONARY', this.events);
        if (e) e.complete();
      },
      error => {
        this.errorMessage = <any> error;
        if (e) e.complete();
      }
    );
  }
  types() {
    return Object.keys(this.events);
  }
  ngOnInit() {
    this.getEvents();
  }
  private openModal(event: Event) {
    let modal = Modal.create(DetailsModal, event);
    this.nav.present(modal);
  }
}
