import { Component } from '@angular/core';
import { FrameworkConfigService, FrameworkConfigSettings } from '../fw/services/framework-config.service';
import { MenuService } from '../fw/services/menu.service';
import { initMenuItems } from './app.menu';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private frameworkConfigServices: FrameworkConfigService,
        private menuService: MenuService) 
    {
    let config: FrameworkConfigSettings = {
      socialIcons: [ 
        {imageFile: 'assets/social-fb-bw.png', alt: 'facebook', link: 'http://facebook.com'},
        {imageFile: 'assets/social-google-bw.png', alt: 'google', link: 'http://google.com'},
        {imageFile: 'assets/social-twitter-bw.png', alt: 'twitter', link: 'http://twitter.com'}
      ],
      showLanguageSelector: true,
      showStatusBar: true,
      showUserControls: true,
      showStatusBarBreakpoint: 800
    };
    frameworkConfigServices.configure(config);  
    menuService.items = initMenuItems;
  }
}
