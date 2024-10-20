import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { FilterRequestModel, query } from "./FilterRequestModel.model";

  
@Injectable({
    providedIn: 'root',
  })
export class appService{
constructor(private http: HttpClient){}
getUserList(query:query):Observable<any>{
    console.log(query);
    return this.http.post<any>('https://localhost:5001/api/Connector/getConnectorListFilteredPaginated',query);
}
getCountriesList():Observable<any>{
    console.log(1);
    return this.http.get<any>('https://localhost:5001/api/Lookup/GetCountries');
}

}
