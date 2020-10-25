import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../objects/User';

@Injectable()
export class UpdateService {

    private URL = environment.url;
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    constructor(private http: HttpClient) { }

    update(id: number, user: User): Observable<any> {
        return this.http.put<User>(this.URL + '/users/' + id, JSON.stringify(user), this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        return throwError(error.error);
    }
}