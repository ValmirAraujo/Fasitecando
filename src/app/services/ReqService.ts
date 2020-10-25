import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../objects/Login';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ReqService {

    private URL = environment.url;
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            //   Authorization: 'my-auth-token'
        })
    };

    constructor(private http: HttpClient) { }

    login(login: Login): Observable<any> {
        return this.http.post<Login>(this.URL + '/login', JSON.stringify(login), this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
        // .catch(erroCatch => {
        //     if (erroCatch.error.code === 400) {
        //         // throw new Erros(erro.error);           
        //         this.tratamentoMensagem(erroCatch);
        //     }
    }

    listUsers(page: number) {
        return this.http.get<any>(this.URL + '/users?page=' + page)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        return throwError(error.error);
    }

    //   tratamentoMensagem(erroCatch: any) {
    //     let arrayErros = [];
    //     if (erroCatch.error.erros) {

    //         erroCatch.error.erros.forEach(element => {
    //             arrayErros.push(element.mensagem);
    //         });

    //         let texto = "<div>" + erroCatch.error.mensagem + "</div>" + "<br>" + "<div style='text-align: left; padding-left: 19%;'>" + arrayErros.join() + "</div>";


    //         throw new Erros(texto.split(',').join('<br>'));
    //     } else {
    //         throw new Erros(erroCatch.error.mensagem);
    //     }
    // }




}