import { Observable } from 'rxjs/Observable';

export abstract class UserApi {
    signIn: (uername: string, password: string, rememberme: boolean) => Observable<any>;
    signOut: () => Observable<any>;
}