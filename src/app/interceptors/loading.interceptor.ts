import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

import { Injectable } from '@angular/core';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService:LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //eğer uygulamada  o an bir request gönderilmiş ve cevap bekleniyorsa,o an loading ekranı gösterilsin..
    this.loadingService.startLoading();
    //cevap geldiğinde => loading stopped
    //rxjs
    //! TODO: Add Loading Event
    return next.handle(request).pipe(
      finalize(()=>{
        //requestin response döndüğünü ve sonlandığını ele alan fonksiyon
       this.loadingService.stopLoading();
      })
    );
  }
}