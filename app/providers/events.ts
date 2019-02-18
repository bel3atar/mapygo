import {Injectable} from 'angular2/core';
import {Event} from '../event';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from 'angular2/http';
import 'rxjs/Rx';
@Injectable()
export class EventsProvider {
  constructor (private http: Http) {}
  getEvents() {
    return this.http.get('http://sobegest.com/api.php/events')
      .map(res => {
        let xs = res.json().events.records.reverse();
        return <Event[]> xs.map(x => {
          let date = new Date(x[4])
            , months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
          return {type: x[5], title: x[1], description: x[2], image: x[3], date: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`};
        });
      })
      //.do(x => console.log(x))
      .catch(this.handleError);
  }
  private handleError (error: Response) {
    return Observable.throw(error.json() || 'Server error');
  }
}

