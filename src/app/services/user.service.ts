import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';
import { UserApi } from '../../fw/users/user-api';

@Injectable()
export class UserService implements UserApi {
    isAuthenticated = false;

    constructor(private router: Router) {
    }

    signIn(username: string, password: string, rememberme: boolean): Observable<any> {
        this.isAuthenticated = true;
        return Observable.of({}).delay(2000);
        //return Observable.of({}).delay(2000).flatMap(x => Observable.throw('Invalid user name/password'));
    }

    signOut(): Observable<any> {
        this.isAuthenticated = false;
        this.router.navigate(['/signin']);
        return Observable.of({});
        //return Observable.of({}).delay(2000).flatMap(x => Observable.throw('Invalid user name/password'));
    }
}