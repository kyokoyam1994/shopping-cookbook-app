import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    
    constructor(private authService: AuthService) {}

    // Used to apply logic in this method to all HTTP requests before sending the request
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // take(n) operator takes n values from the observable, and then unsubscribes
        // exhaustMap replaces the outer observable with the observable returned, hence applying the next operations to the replaced observable
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            // If user hasn't authenticated, handle the request as usual
            if (!user) {
                return next.handle(req);
            }
        
            // Sets the token received from logging in to the header to validate our request
            const modifiedRequest = req.clone({params: new HttpParams().set('auth', user.token)});
            return next.handle(modifiedRequest);
        }));
    }
    
}