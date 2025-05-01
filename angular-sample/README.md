# Angular Subsurge sample
Use subsurge sdk to manage user payments and subscriptions and authentication all in one place

## Steps:
```
npm install subsurge
```

Then import into a service for example

```ts
import { APIClient } from 'subsurge';

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
```


**Important**
Don't forget to add this when using the Google Auth flow in your index.html file 

```html
  <script src="https://accounts.google.com/gsi/client" async defer></script>
```