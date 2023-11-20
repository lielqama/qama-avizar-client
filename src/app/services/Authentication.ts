import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Router } from '@angular/router';
import { LocalStorage } from './LocalStorage';
import { ShaerdStrings, RegisterViewModel } from '../entities/Helprs';
//import { retry } from 'rxjs/operator/retry';

@Injectable()
export class AuthenticationService {

    //Storage values
    public static keys_token = "_t";
    public static keys_rtoken = "_rt";
    public static keys_tokenExp = "_texp";

    //Api calls


    constructor(private http: Http, private nav: Router) { }

    public static isAuthenticated(): boolean {
        var token = LocalStorage.GetString(AuthenticationService.keys_token);
        if (token && token.length > 0) {
            return true;
        }
        return false;
    }
    public static ClearToken() {
        LocalStorage.removeItem(AuthenticationService.keys_token);
        LocalStorage.removeItem(AuthenticationService.keys_rtoken);
        LocalStorage.removeItem(AuthenticationService.keys_tokenExp);
    }
    public static Token(): string {
        return LocalStorage.GetString(AuthenticationService.keys_token) || "";
    }
    private async RefreshToken(http: Http): Promise<boolean> {
        var refreshToken = LocalStorage.GetString(AuthenticationService.keys_rtoken);
        var model = new GetTokenViewModel();
        model.InitByToken(refreshToken);
        return await this.GetToken(model);
    }

    public async ValidToken() {
        var tokenExpString = LocalStorage.GetString(AuthenticationService.keys_tokenExp);
        var tokenExpDate = new Date(tokenExpString);
        var currentDate = new Date();
        var errorDate = tokenExpString == "Invalid Date" || tokenExpString == "" || tokenExpDate.toString() == "Invalid Date";
        if (errorDate || currentDate > tokenExpDate) {
            var refrashResult = await this.RefreshToken(this.http);
            return true;
        }
        return false;
    }
    public async Register(model: RegisterViewModel): Promise<boolean> {
        var _string = new ShaerdStrings();
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        var data = JSON.stringify(model);
        return this.http.post(_string.auth_register, data, options).toPromise() //Register
            .then(async res => {
                if (res.status == 200) { // Register ok
                    return await this.LoginWithParameters(model.UserName, model.Password);
                }
                return false;
            },
                async err => {
                    if (err.status == 400) {
                        var data = err.json();
                        if (data['modelState'][""][0].indexOf("is already taken") > 0) {
                            throw new Error("username_exist");
                        }
                    }
                    this.handleError(err);
                    return false;
                }
            );
    }
    public async LoginWithParameters(username: string, password: string): Promise<boolean> {
        var model = new LoginViewModel();
        model.UserName = username;
        model.Password = password;
        return await this.Login(model);
    }
    public async Login(model: LoginViewModel): Promise<boolean> {

        var _data = new GetTokenViewModel();
        _data.InitByPassword(model);

        var resilt = await this.GetToken(_data);
        return resilt;

    }
    public async SendResetPassword(mail: string) {
        var _string = new ShaerdStrings();
        var url = _string.auth_get_reset_password + "?mail=" + mail;
        return this.http.get(url).toPromise();
    }
    public async SaveResetPassword(password: string, passwordConfirm: string, token: string, mail: string) {
        var _string = new ShaerdStrings();
        var url = _string.auth_get_reset_password;
        var data = {
            'Token': token,
            'Mail': mail,
            'Password': password,
            'ConfirmPassword': passwordConfirm
        }
        return this.http.post(url, data).toPromise();
    }

    public async RegisterExternal(model: RegisterExternalViewModel): Promise<boolean> {
        var _string = new ShaerdStrings();
        var url = _string.auth_external_register;

        return await this.http.post(url, model)
            .toPromise()
            .then(res => {
                var data = res.json();
                if (data && data.access_token) {
                    LocalStorage.SetString(AuthenticationService.keys_token, data.access_token);
                    LocalStorage.SetString(AuthenticationService.keys_rtoken, data.refresh_token);
                    var exp = new Date(data['.expires']);
                    LocalStorage.SetString(AuthenticationService.keys_tokenExp, exp.toString());
                    return true;
                }
                return false;
            })
            .catch(res => { console.log(res); return false; })
    }

    public async LoginExternal(provider: string, externalAccessToken: string): Promise<boolean> {

        var _string = new ShaerdStrings();
        var url = _string.auth_external_login;
        var data = { "Provider": provider, "ExternalAccessToken": externalAccessToken };
        var options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
        var login: boolean = await this.http.post(url, data, options)
            .toPromise()
            .then(res => {
                var data = res.json();
                if (data && data.access_token) {
                    LocalStorage.SetString(AuthenticationService.keys_token, data.access_token);
                    LocalStorage.SetString(AuthenticationService.keys_rtoken, data.refresh_token);
                    var exp = new Date(data['.expires']);
                    LocalStorage.SetString(AuthenticationService.keys_tokenExp, exp.toString());
                    return true;
                }
                return false
            })
            .catch(res => { console.log(res); return false; })

        return login;

    }

    private async GetToken(model: GetTokenViewModel): Promise<boolean> {
        var _string = new ShaerdStrings();
        var url = _string.auth_token;

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        var data = model.GetString();

        var result = await this.http.post(url, data, options).toPromise()
            .then(res => {
                if (res.status == 200) {
                    var data = res.json();
                    if (data && data.access_token) {
                        LocalStorage.SetString(AuthenticationService.keys_token, data.access_token);
                        LocalStorage.SetString(AuthenticationService.keys_rtoken, data.refresh_token);
                        var exp = new Date(data['.expires']) || new Date().setMinutes(new Date().getMinutes() + 25);
                        LocalStorage.SetString(AuthenticationService.keys_tokenExp, exp.toString());
                        return true;
                    }
                }
                return false;
            }, (err: Response) => {
                if (err.status == 400) {
                    var data = err.json();
                    if (data.error_description) {
                        if (data.error_description === "The user name or password is incorrect.") {
                            var errorMsg = "שם המשתמש או הסיסמא שגויים, אנא נסה שנית";
                            throw new Error(errorMsg);
                        }
                    }
                    else if (data.error && data.error == "invalid_grant") {
                        //this.nav.navigate(["/Home"]);
                        return false;
                    }
                }
                else if (err.status == 0) {
                    var errorMsg = "אופס! קרה משהו שלא צפינו, אנא נסה שוב מאוחר יותר";
                    throw new Error(errorMsg);
                }

                return false;
            });

        return result;
    }

    public async GetCompanyOptions() {
        var _string = new ShaerdStrings();
        var url = _string.companyOptions;

        return this.http.get(url).toPromise().then(res => {
            return res.json() as any;
        });
    }
    private handleError(error: Response) {
        if (error.status == 401) {
            console.log('Auth not valid - reset token data');
            AuthenticationService.ClearToken();
            //this.nav.navigate(["/Home"]);
        }
        console.log(error.status);

    }
}




// Helprs


export class GetTokenViewModel {
    constructor() {
        this.client_id = "ngApp";
    }

    public InitByPassword(data: LoginViewModel) {
        this.username = data.UserName;
        this.password = data.Password;
        this.grant_type = "password";
    }

    public InitByToken(token: string) {
        this.refresh_token = token;
        this.grant_type = "refresh_token";
    }

    public GetString() {
        return 'grant_type=' + this.grant_type + '&username=' + this.username + '&password=' + this.password + '&refresh_token=' + this.refresh_token + '&client_id=' + this.client_id;
    }

    private grant_type: string = "";
    private username: string = "";
    private password: string = "";
    private refresh_token: string = "";
    private client_id: string = "";
}

export class LoginViewModel {
    public UserName: string = "";
    public Password: string = "";
}

export class RegisterExternalViewModel {
    public ID: string = "";
    public UserName: string = "";
    public Provider: string = "";
    public ExternalAccessToken: string = "";
}
