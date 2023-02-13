import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

interface Scripts {
  name: string;
  src: string;
  async?: boolean;
  integrity?: string;
  crossorigin?: string;
  type?: string;
}

export const ScriptStore: Scripts[] = [
  {
    name: 'jQuery',
    src: 'https://code.jquery.com/jquery-3.6.0.min.js',
    integrity: 'sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=',
    crossorigin: 'anonymous',
    type: 'text/javascript',
  },
  {
    name: 'bootstrap',
    src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js',
    integrity:
      'sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0',
    crossorigin: 'anonymous',
    type: 'text/javascript',
  },
  {
    name: 'bs-stepper-js',
    src: '../assets/js/bs-stepper.js',

    //src: 'https://cdn.jsdelivr.net/npm/bs-stepper/dist/js/bs-stepper.js',
    crossorigin: 'anonymous',
    type: 'text/javascript',
  },
  {
    name: 'stripe-checkout',
    src: 'https://js.stripe.com/v3'
  },
  {
    name: 'google-maps-autocomplete',
    src: `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapApi}&libraries=places`,
    type: 'text/javascript',
    async: true
  }
]

@Injectable({
  providedIn: 'root'
})
export class ScriptsStore {

  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src,
        async: script.async,
        type: script.type
      }
    })
  }

  load(...scripts: string[]){
    let promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string){
    return new Promise((resolve, reject) => {
      if(this.scripts[name].loaded){
        resolve({script: name, loaded: true, status: 'Already Loaded'})
      } else {
        //load script
        const script = document.createElement('script');
        script.async = this.scripts[name].async || false;
        script.type = this.scripts[name].type;
        script.src = this.scripts[name].src;
        if (document.readyState){
          document.onreadystatechange = () => {
            if(document.readyState === 'interactive' || document.readyState === 'complete'){
              document.onreadystatechange = null;
              this.scripts[name].loaded = true;
              resolve({ script: name, loaded: true, status: 'Loaded'});
            }
          }
        } else {
          script.onload = () => {
            this.scripts[name].loaded = true;
            resolve({ script: name, loaded: true, status: 'Loaded' })
          };
        }
        script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    })
  }
}
