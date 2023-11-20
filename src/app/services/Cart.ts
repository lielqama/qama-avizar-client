import { CartItem } from "../entities/CartItem";
import { LocalStorage } from "./LocalStorage";
import { PriorityProductViewModel } from "../entities/OrderViewModel";
import { PriorityCustomerViewModel, PriorityMissionRepoViewModel } from "../entities/CustomerViewModel";
import { AppState } from "./AppState";

export class Cart{
    
    private cart_store_key = "cartItems";
    private cart_customer_store_key = "cartCustomer";
    private cart_mission_store_key = "cartMission";


    private items: CartItem[] = [];
    public get Items(){ return this.items;}

    private  _customer : PriorityCustomerViewModel;
    public get Customer(){ return this._customer;}
    public set Customer(value){ this._customer = value; this.Save();}

    private  _mission : PriorityMissionRepoViewModel;
    public get Mission(){ return this._mission;}
    public set Mission(value){ this._mission = value; this.Save();}

    constructor() {
        this.Load();
    }



    AddItem(item: PriorityProductViewModel){
        var isExist = this.items.find(x=>x.product.id == item.id);
        if(isExist != null){
            isExist.amount = isExist.amount + 1;
        }
        else{
            var newItem = new CartItem();
            newItem.product = item;
            newItem.amount = item.amount || 1;
            this.items.push(newItem);
        }
        this.Save();
        console.log(this.items);
    }

    RemoveItem(item: CartItem){
        this.items = this.items.filter(x=>x.product.id != item.product.id);
        this.Save();
    }

    
    UpdateAmount(item: CartItem){
        this.Save();
    }

    Reset(){
        this.items = [];
        this._customer = null;
        this._mission = new PriorityMissionRepoViewModel();
        this.Save();
    }
    Load(){
        this.items = LocalStorage.GetItem(this.cart_store_key) || [];
        this._customer = LocalStorage.GetItem(this.cart_customer_store_key);
        this._mission = LocalStorage.GetItem(this.cart_mission_store_key) || new PriorityMissionRepoViewModel();
    }
    Save(){
        LocalStorage.SetItem(this.cart_store_key,this.items);
        LocalStorage.SetItem(this.cart_customer_store_key,this._customer);
        LocalStorage.SetItem(this.cart_mission_store_key,this._mission);

    }
}