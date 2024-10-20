export class query{
    pageSize:number =5;
    pageNumber:number =1;
    filterRequestModel?:FilterRequestModel[];

}
export class FilterRequestModel {
    property?:string;
    type?:string
    value?:string[];
  }
  