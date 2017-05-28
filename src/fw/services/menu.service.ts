import { Injectable } from '@angular/core';


@Injectable()
export class MenuService {
    items: Array<MenuItem>;
    isVertical = false;
    showingLeftSideMenu = false;

    toggleLeftSideMenu() : void {
        this.isVertical = !this.isVertical;
        this.showingLeftSideMenu = !this.showingLeftSideMenu;
    }

    toggleMenuOrientation() {
        this.isVertical = !this.isVertical;
    }
}

export interface MenuItem {
    text: string,
    icon: string,
    route: string,
    submenu: Array<MenuItem>
};