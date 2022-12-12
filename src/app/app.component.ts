import { Component, OnInit } from '@angular/core';

import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',//Html tarafındaki etiketi tanımlar
  templateUrl: './app.component.html',// hangi html dosyasını kullanacağını belirtir.
  styleUrls: ['./app.component.scss']//hangi css dosyasını veya dostalarını kullanacağını belirtir.
})
export class AppComponent implements OnInit {
  constructor(private loadingService:LoadingService){}
 //property,State
 isLoading:boolean=false;
 text!:string;
 //Loafing.service'den çekip, değerini değiştirmek istiyorum
  ngOnInit(): void {
this.subscribeToLoading();
this.subscribeToLoadingText();
  }//OnInit interface/arayüz
 subscribeToLoading(){
  this.loadingService.isLoadingSubject.subscribe((isLoading)=>{
    console.log(isLoading);
    this.isLoading=isLoading;
  });
 }
 subscribeToLoadingText(){
  this.loadingService.text.subscribe((text)=>{
  this.text=text;
 })
 }
  }

