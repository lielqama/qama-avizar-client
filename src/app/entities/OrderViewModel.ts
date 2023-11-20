
export class MissionViewModel {
    CUSTNOTE: number;
    SUBJECT: string;
    CURDATE: Date;
    CUSTNOTETYPEDES: string;
    CUSTDES: string;
    QAMT_ADDRESS: string;
    QAMT_STAEA: string;
    STATDES: string;
    AGENTCODE: string;
    CELLPHONE: string;
    NAME: string;
    WazeLink: string;
}

export class StoreOrderViewModel {
    CURDATE: Date;
    ORDNAME: string;
    CDES: string;
    ORDSTATUSDES: string;
    DISPRICE: string;
}
export class OpenOrderViewModel {
    CURDATE: Date;
    ORDNAME: string;
    REFERENCE: string;
    CUSTDESSHIP: string;
    ADDRESS: string;
    STATE: string;
    PHONENUM: string;
    FAX: string;
    PARTNAME: string;
    PARTDES: string;
    TQUANT: number;
}

export class OrderFilterViewModel {
    /**
     *
     */
    constructor() {
        this.End = new Date();
        this.Start = new Date();

    }
    Start: Date;
    End: Date;
    // Customer: string;
    // OrderID: string;
    // Status: string;
}


export class PriorityProductViewModel {
    id: string;
    name: string;
    category: string;
    image: string;
    price: number;
    amount: number = 0;

}