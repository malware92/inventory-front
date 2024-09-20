import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const router = inject(Router)
    const token = localStorage.getItem('token');

    if (token) {
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', `${token}`)
      });
      return next.handle(clonedRequest).pipe(catchError( (error) => {
        
        if( error.status == 0 || error.status == 401 ) 
          localStorage.removeItem('token');
          router.navigate(['/login'])
        
        return throwError(() => error);
        
      } ));
    }

    return next.handle(req).pipe(
      catchError( (error) => {
        
        if( error.status == 0 || error.status == 401 ) 
          localStorage.removeItem('token');
        
        return throwError(() => error);
        
      } )
    );
  }
}