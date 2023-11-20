

export class NewOrderViewModel {
    CUSTNAME: string;
    DCODE: string;
    ORDERITEMS_SUBFORM: Order_PartDetails[] = [];
    QAMT_REMARK: string;
    constructor() {
    }
}

export class NewCprofViewModel {
    CUSTNAME: string;
    PDATE: Date = new Date();
    CPROFITEMS_SUBFORM: Order_PartDetails[] = [];
    QAMT_REMARK: string;
    constructor() {
    }
}

export class Order_ClientDetails {
    CUSTDES: string;
    ADDRESS: string;
    ADDRESS2: string;
    STATE: string;
    PHONENUM: string;
    FAX: string;
    REFERENCE: string;
}

export class Order_PartDetails {
    PARTNAME: string;
    TQUANT: number;
    PRICE: number;
}

export class Order_Note {
    TEXT: string;
}