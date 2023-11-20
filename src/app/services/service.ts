import { Injectable, PipeTransform, Pipe } from '@angular/core';
import { SecureHttp } from './SecureHttp';
import { ShaerdStrings } from '../entities/Helprs';
import { RegisterViewModel } from '../entities/RegisterViewModel';
import { ServerResponse } from '../entities/ServerResponse';
import { PriorityProductViewModel } from '../entities/OrderViewModel';
import { UserStatusViewModel } from '../entities/UserStatusViewModel';
import { PriorityCustomerViewModel } from '../entities/CustomerViewModel';
import { AppState } from './AppState';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class ServerService {





    constructor(private shttp: SecureHttp, private str: ShaerdStrings, private httpClient: HttpClient) { }


    Status() {
        var url = this.str.user_status;
        return this.shttp.get(url).then(res => {
            return res.json() as ServerResponse<UserStatusViewModel>;
        });
    }

    GetResources(resource: string, arg1: boolean, params: string = '') {
        var url = this.str.GetResource + "?resource=" + resource;
        return this.shttp.get(url).then(res => {
            return res.json() as ServerResponse<any>;
        });
    }

    GetDOCUMENTS(day: Date, type: string) {
        var url = this.str.GetDOCUMENTS + "?day=" + day.toISOString() + "&type=" + type;
        return this.shttp.get(url).then(res => {
            return res.json() as ServerResponse<any>;
        });
    }
    GetAllLogpart( filter :string){
        var url = this.str.GetAllLogpart ;
        return this.shttp.get(url).then(res => {
            return res.json() as ServerResponse<any>;
    });
    }

    HasReturnsInDay(day: Date, user: string) {
        var url = this.str.HasReturnsInDay + "?day=" + new Date(day).toISOString() + "&user=" + user;
        return this.shttp.get(url).then(res => {
            return res.json() as ServerResponse<any>;
        });
    }

    GetDOCUMENT(id, type = "D") {
        var url = `${this.str.GetDOCUMENT}?id=${id}&type=${type}`;
        return this.shttp.get(url).then(res => {
            return res.json() as ServerResponse<any>;
        });
    }

    GetPartBALExtra() {
        var url = `${this.str.GetPartBALExtra}`;
        return this.shttp.get(url).then(res => {
            return res.json() as ServerResponse<any>;
        });
    }


    UpdateDOCUMENT_ITEM(docno, type, line, model) {
        var url = `${this.str.UpdateDOCUMENT_PART}?docno=${docno}&type=${type}&line=${line}`;
        return this.shttp.post(url, model).then(res => {
            return res.json() as ServerResponse<any>;
        });
    }

    DeleteDOCUMENT_PART(docno, type, line) {
        var url = `${this.str.DeleteDOCUMENT_PART}?docno=${docno}&type=${type}&line=${line}`;
        return this.shttp.post(url, {}).then(res => {
            return res.json() as ServerResponse<any>;
        });
    }


    UpdateDOCUMENT(type: string, model: any) {
        var clone = this.jsonCopy(model);

        let subform = `TRANSORDER_${type}_SUBFORM`;
        if (clone[subform]) {
            clone[subform].forEach(element => {
                delete element["PDES"];
            });
        }

        var url = this.str.UpdateDOCUMENT + "?type=" + type;
        return this.shttp.post(url, clone).then(res => {
            return res.json() as ServerResponse<any>;
        });
    }

    AddDOCUMENT(type: string, model: any) {
        var clone = this.jsonCopy(model);

        let subform = `TRANSORDER_${type}_SUBFORM`;

        if (clone[subform]) {
            clone[subform] = clone[subform].filter(x => !x.Deleted);
            clone[subform].forEach(element => {
                delete element.Delete;
                delete element.PDES;
            });
        }

        var url = this.str.AddDOCUMENT + "?type=" + type;
        return this.shttp.post(url, clone).then(res => {
            return res.json() as ServerResponse<any>;
        });
    }

    GetStatusOptions(type: string) {
        var url = this.str.GetResource + "?resource=StatusOptions&type=" + type;
        return this.shttp.get(url).then(res => {
            return res.json() as ServerResponse<any>;
        });
    }

    GetWAREHOUSES() {
        var url = this.str.GetResource + "?resource=WAREHOUSES";
        return this.shttp.get(url).then(res => {
            return res.json() as ServerResponse<any>;
        });
    }


    GetCREDITREASONS() {
        var url = this.str.GetResource + "?resource=CREDITREASONS";
        return this.shttp.get(url).then(res => {
            return res.json() as ServerResponse<any>;
        });
    }

    GetCUSTOMERS(term: string) {
        var url = this.str.GetResource + "?resource=CUSTOMERS&type=" + term;
        return this.shttp.get(url).then(res => {
            return res.json() as ServerResponse<any>;
        });
    }

    GetLOGPART(partname: string) {
        var url = this.str.GetLOGPART + "?partname=" + partname;
        return this.shttp.get(url).then(res => {
            return res.json() as ServerResponse<any>;
        });
    }


    public upload(data) {

        let uploadURL = "https://pharmexpress.wee.co.il/PriorityFileUploader/api/Upload";

        return this.httpClient.post<any>(uploadURL, data, {
            reportProgress: true,
            observe: 'events',
        }).pipe(map((event) => {

            switch (event.type) {

                case HttpEventType.UploadProgress:
                    const progress = Math.round(100 * event.loaded / event.total);
                    return { status: 'progress', message: progress };

                case HttpEventType.Response:
                    return event.body;
                default:
                    return `Unhandled event: ${event.type}`;
            }
        })
        );
    }

    jsonCopy(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
}


@Pipe({ name: 'familyFilter' })
export class FamilyFilterPipe implements PipeTransform {
    transform(items: PriorityProductViewModel[], filter: string): PriorityProductViewModel[] {
        if (!filter || filter.length == 0)
            return items;

        return items.filter(x => x.id.includes(filter) || x.name.includes(filter));
    }
}