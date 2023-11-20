import { AuthenticationService } from "./Authentication";
import { UserStatusViewModel } from "../entities/UserStatusViewModel";
import { Cart } from "./Cart";

export class AppState {

    private static _user: UserStatusViewModel = new UserStatusViewModel();

    public static get CorrentItemKey() { return "currItemStore"; }
    public static helpContent: string;

    public static get UserName() { return AppState._user.userName; }
    public static get ComapnyName() { return AppState._user.companyName; }
    public static get Role() { return AppState._user.role; }
    public static get UserID() { return AppState._user.priorityID; }
    public static get isAuth(): boolean { return AuthenticationService.isAuthenticated() };

    public static ITEMS_PER_PAGE = 75;
    public static ITEMS_PER_FIRST_PAGE = 49;


    public static Cart: Cart;

    public static SetUserProfile(model: UserStatusViewModel) {
        console.log(model);
        AppState._user = model;
    }
}