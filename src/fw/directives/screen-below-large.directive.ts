import { Directive, Input, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ScreenService } from '../services/screen.service';

@Directive({selector: '[screenBelowLarge]'})
export class ScreenBelowLarge implements OnDestroy {
    private hasView = false;
    private subscription: Subscription;
    
    constructor(private viewContainer: ViewContainerRef,
                private template: TemplateRef<Object>, private screenService: ScreenService){
        this.subscription = screenService.resize$.subscribe(() => this.onResize());
    }

    @Input()
    set screenBelowLarge(condition) {
        condition = this.screenService.screenWidth < this.screenService.largeBreakPoint;

        if (condition && !this.hasView) {
            this.hasView = true;
            this.viewContainer.createEmbeddedView(this.template);
        }
        else if (!condition && this.hasView)
        {
            this.hasView = false;
            this.viewContainer.clear();
        }
    }  

    onResize() {
        this.screenBelowLarge = false;
    } 

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

