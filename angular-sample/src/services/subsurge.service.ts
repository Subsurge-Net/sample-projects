import { Injectable } from '@angular/core';
import { APIClient } from 'subsurge';

@Injectable({ providedIn: 'root' })
export class SubsurgeService extends APIClient {
  constructor() {
    super({
      appId: '{{YOUR_APP_ID}}', // App Id on subsurge.com e.g 21a79421a7964ddcbf41222829041194
      googleClientId: "{{YOUR Google ClientId}}", // e."920059261823-zh90m3p3hhtvrk8sk1kinuak1thjdwve.apps.googleusercontent.com",
      platformName: 'web' 
    });
  }
}
