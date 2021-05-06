import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularPlugin } from '@microsoft/applicationinsights-angularplugin-js';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-insights';
  constructor(
    private router: Router
  ) {
    var angularPlugin = new AngularPlugin();
    const appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: '',
        extensions: [angularPlugin],
        extensionConfig: {
          [angularPlugin.identifier]: { router: this.router }
        }
      }
    });
    appInsights.loadAppInsights();
    appInsights.addTelemetryInitializer((item) => {
      item.tags['ai.cloud.role'] = 'anton-test'
      return;
    });
  }
}
