import { Injectable } from "@angular/core";

@Injectable()
export class ShaerdStrings {

    private BaseUrl(): string {
        return this.IsInDevMode() ? "https://localhost:44392/" : `https://api${this.IsInTestMode() ? '-test' : ''}.qama.co.il/avizar/`;
    }

    private IsInDevMode(): boolean {
        if (this.IsBroswer()) {
            return /localhost/.test(document.location.host);
        }
        return false;
    }

    private IsInTestMode(): boolean {
        return 'app-test.qama.co.il' === document.location.host;
    }

    private IsBroswer(): boolean {
        try {
            if (document != null) {
                return true;
            }
        } catch (e) {

        }

        return false;
    }

    //Logins
    public googleAuthUtl(): string {
        if (this.IsBroswer()) {
            return this.BaseUrl() + "/api/Account/ExternalLogin?provider=Google&response_type=token&client_id=ngApp&redirect_uri=" + document.getElementsByTagName('base')[0].href + "authComplate";
        }
        return "";
    }
    public facebookAuthUtl(): string {
        if (this.IsBroswer()) {
            return this.BaseUrl() + "/api/Account/ExternalLogin?provider=Facebook&response_type=token&client_id=ngApp&redirect_uri=" + document.getElementsByTagName('base')[0].href + "authComplate";
        }
        return "";
    }
    //Logouts 
    public googleAuthLogoutUrl(): string {
        if (this.IsBroswer()) {

            return "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=" + document.getElementsByTagName('base')[0].href + "authComplateError";
        }
        return "";
    }
    public facebookAuthLogoutUrl(): string {
        if (this.IsBroswer()) {
            return "http://m.facebook.com/logout.php?confirm=1&next=" + document.getElementsByTagName('base')[0].href + "authComplateError";
        }
        return "";
    }


    private user_controller = "api/Users";
    private account_controller = "api/Account";
    private tech_controller = "api/Tech";
    private part_controller = "api/Part";

    private UrlAction(controller: string, action: string): string {
        var base_url = this.BaseUrl();

        if (controller.length > 0) {
            base_url = base_url + controller + '/';
        }
        return base_url + action;
    }

    // Auth
    public auth_register = this.UrlAction(this.account_controller, "Register");
    public auth_external_register = this.UrlAction(this.account_controller, "RegisterExternal");
    public auth_external_login = this.UrlAction(this.account_controller, "ObtainLocalAccessToken");
    public auth_get_reset_password = this.UrlAction(this.account_controller, "ResetPassword");
    public auth_token = this.UrlAction('', "token");
    public user_registerExternal = this.UrlAction(this.user_controller, "RegisterExternal");

    // Users
    public user_register = this.UrlAction(this.user_controller, "Signup");
    public user_status = this.UrlAction(this.user_controller, "Status");
    public companyOptions = this.UrlAction(this.user_controller, "CompanyOptions");

    public GetDOCUMENT = this.UrlAction(this.tech_controller, "GetDOCUMENT");
    public GetLOGPART = this.UrlAction(this.part_controller, "GetPart");
    public GetAllLogpart = this.UrlAction(this.part_controller, "GetAllPart");
    public GetDOCUMENTS = this.UrlAction(this.tech_controller, "GetDOCUMENTS");
    public UpdateDOCUMENT = this.UrlAction(this.tech_controller, "UpdateDOCUMENT");
    public AddDOCUMENT = this.UrlAction(this.tech_controller, "AddDOCUMENT");
    public UpdateDOCUMENT_PART = this.UrlAction(this.tech_controller, "UpdateDOCUMENT_PART");
    public DeleteDOCUMENT_PART = this.UrlAction(this.tech_controller, "DeleteDOCUMENT_PART");
    public GetResource = this.UrlAction(this.tech_controller, "GetResource");
    public HasReturnsInDay = this.UrlAction(this.tech_controller, "HasReturnsInDay");
    public GetPartBALExtra = this.UrlAction(this.tech_controller, "GetDriverExtraMerchandise");


}

export class RegisterViewModel {
    constructor() { };
    public UserName: string = "";
    public Password: string = "";
    public ConfirmPassword: string = "";

    public userNameError: string = "";
    public passwordError: string = "";
    public confirmPasswordError: string = "";

    public Valid(): boolean {
        var flag = true;
        if (this.UserName && !InputValidation.Email(this.UserName)) {
            this.userNameError = "Invalid_email";
            flag = false;
        }
        else {
            this.userNameError = "";
        }

        if (this.Password && this.Password.length < 6) {
            this.passwordError = "short_password";
            flag = false;
        }
        else {
            this.passwordError = "";
        }

        if (this.Password && this.ConfirmPassword && !InputValidation.Match(this.Password, this.ConfirmPassword)) {
            this.confirmPasswordError = "password_not_match";
            flag = false;
        }
        else {
            this.confirmPasswordError = "";
        }

        return flag;
    }
}

export class InputValidation {

    public static Email(input: string): boolean {
        var patrren = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return patrren.test(input);
    }

    public static Match(input: string, confirm: string): boolean {
        return input === confirm;
    }
}