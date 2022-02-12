import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@nestjs/common";
import { environment } from "../../environments/environment";
import { LoginService } from "../services/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  urlsToNotUse: Array<string>= [
      'authenticate',
      'registration',
    ];

  constructor(private logService: LoginService) {}

   intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (this.isValidRequestForInterceptor(req.url)) {
        const user=this.logService.getLoggedUser();
        const token= this.logService.getToken();
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq: HttpRequest<any> = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + token),
        });
        return next.handle(modifiedReq);
   }
   return next.handle(req);
  }

  private isValidRequestForInterceptor(requestUrl: string): boolean {
    const positionIndicator = `${environment.apiUrl}/`;
    const position = requestUrl.indexOf(positionIndicator);
    if (position > 0) {
      const destination: string = requestUrl.substr(position + positionIndicator.length);
      for (const address of this.urlsToNotUse) {
        if (new RegExp(address).test(destination)) {
          return false;
        }
      }
    }
    return true;
  }
}
