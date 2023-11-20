import { PriorityProductViewModel } from "./OrderViewModel";


export class CartItem{

    product : PriorityProductViewModel = new PriorityProductViewModel();
    amount: number;
    price: number;

    public get TotalPrice(){
        return this.product.price * this.amount;
    }
}