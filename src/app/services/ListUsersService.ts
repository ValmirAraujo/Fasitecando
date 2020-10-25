import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class ListUsersService {

    private URL = environment.url;

    constructor(private http: HttpClient) { }

    listUsers(page: number) {
        return this.http.get<any>(this.URL + '/users?page=' + page)
            .pipe(
                catchError(this.handleError)
            );
    }

    allUsers() {
        return this.http.get<any>(this.URL + '/users?per_page=' + 12)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        return throwError(error.error);
    }
}