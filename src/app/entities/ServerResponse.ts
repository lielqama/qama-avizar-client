export class ServerResponse<T>{
    singel: T;
    list: T[]=[];
    errors: ErrorItem[]=[];
    isOk: boolean = false;
    isList: boolean = false;
}

export class ErrorItem {
    key: string;
    value: string;
}