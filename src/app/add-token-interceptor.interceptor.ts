import { HttpInterceptorFn } from '@angular/common/http';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem("token");
  if (!token ) {
    return next(req)
  }

 req= req.clone({
  setHeaders:{
    'Authoriztion':`Bearer${token}`,
  }
 })
  return next(req);
  //add  tokrn to req header + clone req cause its amutable +in app.config provideHttpClient(withInterceptors([addTokenInterceptor]))]
};
