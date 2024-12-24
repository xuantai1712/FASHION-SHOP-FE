import { Injectable } from '@angular/core';
import {Loader} from '@googlemaps/js-api-loader';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapService {

  private loader: Loader;

  constructor() {

    this.loader = new Loader({
      apiKey: 'AIzaSyAOWLQq2YsmWVNq41u4G3ZTw-SkcKWbfpQ', // Thay bằng API Key của bạn
      version: 'weekly',
      libraries: ['places', 'geometry', 'drawing'],
    });
  }
    loadMaps() {
      return this.loader.load();
    }

}
