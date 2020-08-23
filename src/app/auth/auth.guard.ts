import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map, tap, take } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({providedIn: 'root'}) // Setting 'providedIn' to root is equivalent to giving global access by putting it in app.module
export class AuthGuard implements CanActivate {
    
    constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) {}

    // Route guards are used to prevent access to certain routes based on the logic in this function
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        return this.store.select('auth').pipe(
            take(1), // Add take operator because we want to unsubscribe after receiving a value instead of continuously listening
            map(authState => {
                return authState.user;
            }),
            map(user => {
            const isAuth = !!user; // Double exclamation converts object nullability/validity to a boolean value
            if (isAuth) {
                return true;
            }
            return this.router.createUrlTree(['/auth'])
        }));  

        // The below approach works for redirecting the user, but can lead to edge cases in rare situations
        // tap(isAuth => {
        //     if (!isAuth) {
        //         this.router.navigate(['/auth']);
        //     }
        // }));  
    }

}