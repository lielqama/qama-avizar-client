import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './Authentication';
import { ServerResponse } from '../entities/ServerResponse';
import { Router } from '@angular/router';


@Injectable()
export class SecureHttp {

    private headers: Headers;
    private options: RequestOptions;

    constructor(private http: Http, private router: Router, private auth: AuthenticationService) {
        this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + AuthenticationService.Token() });
        this.options = new RequestOptions({ headers: this.headers });
    }

    public async get(url: string): Promise<Response> {
        await this.ValidToken();
        return this.http.get(url, this.options).toPromise().catch(err => this.handleError(err));
    }

    public async post(url: string, body: any): Promise<Response> {

        await this.ValidToken();

        Date.prototype.toJSON = function () {
            const hoursDiff = this.getHours() - this.getTimezoneOffset() / 60;
            this.setHours(hoursDiff);
            return this.toISOString();
        };

        var data = JSON.stringify(body);
        return this.http.post(url, data, this.options).toPromise().catch(err => this.handleError(err));
    }

    public async put(url: string, body: Object): Promise<Response> {
        await this.ValidToken();
        var data = JSON.stringify(body);
        return this.http.put(url, data, this.options).toPromise().catch(err => this.handleError(err));
    }

    public async delete(url: string): Promise<Response> {
        await this.ValidToken();
        return this.http.delete(url, this.options).toPromise().catch(err => this.handleError(err));
    }

    public async _get<T>(url: string): Promise<ServerResponse<T>> {
        await this.ValidToken();
        var result = await this.http.get(url, this.options).toPromise()
            .then(res => {
                var data = res.json() as ServerResponse<T>;
                return data;
            },
                err => { return null; }
            );

        if (result == null) {
            result = new ServerResponse<T>();
            result.isOk = false;
        }
        return result;
    }

    public async _post<T>(url: string, body: any): Promise<ServerResponse<T>> {
        await this.ValidToken();
        var data = JSON.stringify(body);
        var result = await this.http.post(url, data, this.options).toPromise()
            .then(res => {
                var data = res.json() as ServerResponse<T>;
                return data;
            },
                err => { return null; }
            );
        if (result == null) {
            result = new ServerResponse<T>();
            result.isOk = false;
        }
        return result;
    }

    public async _put<T>(url: string, body: any): Promise<ServerResponse<T>> {
        await this.ValidToken();
        var data = JSON.stringify(body);
        var result = await this.http.put(url, data, this.options).toPromise()
            .then(res => {
                var data = res.json() as ServerResponse<T>;
                return data;
            },
                err => { return null; }
            );
        if (result == null) {
            result = new ServerResponse<T>();
            result.isOk = false;
        }
        return result;
    }

    public async postFile<T>(url: string, formData: FormData): Promise<ServerResponse<T>> {
        this.ValidToken();
        var headers = new Headers({ 'Authorization': 'Bearer ' + AuthenticationService.Token() });
        var options = new RequestOptions({ headers: headers });
        var result = await this.http.post(url, formData, options).toPromise()
            .then(res => {
                var data = res.json() as ServerResponse<T>;
                return data;
            },
                err => { return null; });
        if (result == null) {
            result = new ServerResponse<T>();
            result.isOk = false;
        }
        return result;
    }

    private handleError(error: Response): Promise<Response> {
        if (error.status == 401) {
            console.log('Auth not valid - reset token data');
            AuthenticationService.ClearToken();
        }

        throw new Error(error.json().message);
    }

    private async ValidToken() {
        await this.auth.ValidToken();
        this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + AuthenticationService.Token() });
        this.options = new RequestOptions({ headers: this.headers });
    }
}
