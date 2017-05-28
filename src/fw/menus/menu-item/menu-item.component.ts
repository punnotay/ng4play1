import { Component, OnInit, Input, 
        HostBinding, HostListener, ElementRef, Renderer,
        trigger, state, style, transition, animate } from '@angular/core';
import { MenuItem, MenuService } from '../../services/menu.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'fw-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  animations: [
    trigger('visibilityChanged', [
      transition(':enter', [ //:enter is alias to void => *
        style({opacity:0}),
        animate(500, style({opacity:1}))
      ]),
      transition(':leave', [
        animate(500, style({opacity:0}))
      ])
    ])
  ]
})
export class MenuItemComponent implements OnInit {
  @Input() item = <MenuItem>null;  //angular-cli issue
  @HostBinding('class.parent-is-popup')
  @Input() parentIsPopup = true;
  isActiveRoute = false;

  mouseInItem = false;
  mouseInPopup = false;
  popupLeft = 0;
  popupTop = 34;

  constructor(private menuService: MenuService, private router: Router,
              private el: ElementRef, private renderer: Renderer) { }

  ngOnInit() {  
    this.checkActiveRoute(this.router.url);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkActiveRoute(event.url);
        //console.log(event.url + ' ' + this.item.route + ' ' + this.isActiveRoute);
      }
    })
  }

  checkActiveRoute(route: string) {
    this.isActiveRoute = (route == '/' + this.item.route);
  }

  @HostListener('click', ['$event'])
  onClick(e): void {
    e.stopPropagation();
    if (this.item.submenu) {
      if (this.menuService.isVertical) {
        this.mouseInPopup = !this.mouseInPopup;
      }
    }
    else if (this.item.route) {
      //force horizontal menus to close by sending mouseleave event
      let newEvent = new MouseEvent('mouseleave', {bubbles: true});
      this.renderer.invokeElementMethod(this.el.nativeElement, 'dispatchEvent', [newEvent]);
      this.router.navigate(['/' + this.item.route]);
    }
  }

  onPopupMouseEnter(e) {
    if (!this.menuService.isVertical) {
      this.mouseInPopup = true;
    }
  }

  onPopupMouseLeave(e) {
    if (!this.menuService.isVertical) {
      this.mouseInPopup = false;
    }
  }

  @HostListener('mouseleave',['$event'])
  onMouseLeave(e): void {
    if (!this.menuService.isVertical) {
      this.mouseInItem = false;
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (!this.menuService.isVertical) {
      if (this.item.submenu){
        this.mouseInItem = true;
        if (this.parentIsPopup) {
          this.popupLeft = 160;
          this.popupTop = 0;
        }
      }
      
    }
  }
}
