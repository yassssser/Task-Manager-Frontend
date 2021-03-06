import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, empty } from 'rxjs'
import {  tap, catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebRequestIterceptor implements HttpInterceptor{

  constructor(private authService: AuthService) { }

  refreshingAccessToken : boolean
  accessTokenRefreshed: Subject<any> = new Subject()

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // handle the request
    request = this.addAuthHeader(request)

    // call next() & handle the response
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error)
        if(error.status === 401){
          // 401 error that say that we are unauthorized
          // refresh the access token
          return this.refreshAccessToken().pipe(
            switchMap(() => {
              request = this.addAuthHeader(request)
              return next.handle(request)
            }),
            catchError((err: any) => {
              console.log(err)
              this.authService.logout()
              return empty()
            })
          )
        }
      })
    )
  }
  

  refreshAccessToken(){
    if(this.refreshingAccessToken){
      return new Observable(observer => {
        this.accessTokenRefreshed.subscribe(() => {
          // this code will run when the access token has been refreshed
          observer.next()
          observer.complete()
        })
      })
    } else {
      this.refreshingAccessToken = true
      // we want to call method in the AuthService to send a request to refresh the access token
      return this.authService.getNewAccessToken().pipe(
        tap(() => {
          this.refreshingAccessToken = false
          this.accessTokenRefreshed.next()
          console.log("Access Token Refreshed")
        })
      )
    }
  }

  addAuthHeader(req: HttpRequest<any>){
    // get the access token
    const token = this.authService.getAccessToken()

    if(token){
      // append the access token to the request header
      return req.clone({
        setHeaders : {
          'x-access-token': token
        }
      })
    }
    return req
  }
}
