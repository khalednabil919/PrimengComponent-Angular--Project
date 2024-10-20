import { Component,OnInit } from '@angular/core';
import { appService } from './app.service';
import { FilterRequestModel, query } from './FilterRequestModel.model';
import { Table } from 'primeng/table';
import { FormBuilder, Validator, Validators} from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { categoryProps } from './category';

interface country{
  id:string;
  name:string;
  isActive?:boolean
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent implements OnInit{

  categories:categoryProps[]=[
    {
      label:"Category 1",
      value:"category1"
    },
    {
      label:"Category 2",
      value:"category2"
    },
    {
      label:"Category 3",
      value:"category3"
    },
    {
      label:"Category 4",
      value:"category4"
    },
    {
      label:"Category 5",
      value:"category5"
    },
  ]

  message1:Message[]=[]

  users=[];
  countries:country[]=[];
  autoCountries:country[]=[];
  autoSelectedCountry:any;
  countriesDisabled=[]
  Query:query;
  pageSize:number = 5;
  pageNumber:number = 0;
  totalRecords:number = 0;
  selectedCountry:any;
  selectedCountries:any[]=[];
  checked:boolean = false;
  selectedCheckBoxs: string[] = ['newyork'];
  date:Date=new Date();
  minDate:Date= new Date('12/10/2024');
  maxDate:Date= new Date('15/10/2024');
  rangeDates:Date[]=[];
  selectedItem:any;
  selectedInputText:any;
  userForm =this.fb.group({
    firstName:['',Validators.required],
    lastName:[''],
    address:this.fb.group({
      street:['',Validators.required],
      postCode:['']
    })
    
  })

  myForm = this.fb.group({
    selectedCategory:[[] as categoryProps[]]
  });
  
  constructor(private appService:appService,private fb:FormBuilder, private messageService:MessageService)
  {
    this.Query = new query(); 
  }
  ngOnInit() {
    this.loadCountries();
    this.message1 = [
      {severity:'success', summary:'Heading', detail:'More details...' },
      {severity:'warn', summary:'Heading', detail:'More details...' },
      {severity:'info', summary:'Heading', detail:'More details...' },
      {severity:'error', summary:'Heading', detail:'More details...' }

    ]
    // this.loadUsers();
  }
  cols=["id","name","paymentNetworkId","paymentNework","isActive","status"]
  

  loadUsers(event?:any){
    if(event)
    {
      this.Query.pageNumber = (event.first/event.rows) +1;
      this.Query.pageSize = event.rows
    }
    this.appService.getUserList(this.Query).subscribe(response=>{
      this.users = response.data.data;
        this.totalRecords = response.data.totalRows;
    })
    
  }
  loadCountries(){
    this.appService.getCountriesList().subscribe(response=>{
      console.log(response)
      this.countries = response.data;
      this.countries.forEach((user,index)=>{
        user.isActive = index%2===0
      })
      console.log(this.countries);
    })
    
  }

  CheckBox(event:any){
      console.log(event)
  }

  change(event:any)
  {
    console.log(this.selectedCountry);
  }
  changeMulti(event:any){
    console.log(this.selectedCountries);
  }
  DateChange(event:any)
  {
    console.log(event);
  }

  search(event:any)
  {
    console.log(event.query)
    this.autoCountries = this.countries.filter(x => 
      x.name.toLowerCase().includes(event.query.toLowerCase()))
    

  }
  OnSelect(event:any)
  {
    console.log(event);
    console.log(this.autoSelectedCountry)
  }
  addUser(){
    console.log(this.userForm.value)
  }
  addMessages(){
    this.messageService.add({severity:'success', summary:'Heading', detail:'More details...' })
    // this.message1=[];
    // this.message1=[{severity:'success', summary:'Heading', detail:'More details...' }];
  }
  clearMessages(){
    this.messageService.clear();
    this.message1=[];
  }

  showToast()
  {
    this.messageService.add({severity:'success', summary:'Heading', detail:'More details...', sticky:true });
  }
  selectAll()
  {
    this.myForm.controls.selectedCategory.setValue(this.categories);
  }
  deselectAll(){this.myForm.controls.selectedCategory.setValue([])}
}
