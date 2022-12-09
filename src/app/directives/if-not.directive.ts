import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { TemplateLiteral } from '@angular/compiler';

@Directive({
  selector: '[ngIfNot]'
})
export class IfNotDirective implements OnInit{
 
  private condition=false;
  // ViewContainerRef => direktifin uygulandığı elementin kendisi (parent)
  // TemplateRef => direktifin uygulandığı elementin altındaki elementler (childlar)
  constructor(private _viewContainer:ViewContainerRef,private templateRef:TemplateRef<any>) { }
@Input()
set ngIfNot(condition:boolean){
  //=> gelen condition(boolean) false ise elemanları göster
  
   this.condition=condition;
   this.displayTemplate();
  }
@Input()ngIfNotElse?:TemplateRef<unknown>;
 ngOnInit():void{
this.displayTemplate();
 }
private displayTemplate(){
  this._viewContainer.clear();
  if(this.condition){
    this._viewContainer.createEmbeddedView(this.templateRef);
  }
  else if(this.ngIfNotElse){
this._viewContainer.createEmbeddedView(this.ngIfNotElse)
  }
}
}
//https://angular.io/guide/structural-directives