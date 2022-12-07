import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appButton]'
})

export class ButtonDirective implements OnInit {
  @Input() appButton: "btn-primary" | "btn-dark" | "btn-secondary"="btn-primary";
  constructor(private el:ElementRef) { 
  }
ngOnInit(){
  this.el.nativeElement.classList.add(this.appButton);
}
@HostListener('mouseenter')
onMouseEnter() {
  if(this.appButton=='btn-dark'){
this.el.nativeElement.style.backgroundColor='red'
  }
  if(this.appButton=='btn-primary'){
    this.el.nativeElement.style.backgroundColor='purple'
      }
      if(this.appButton=='btn-secondary'){
        this.el.nativeElement.style.backgroundColor='black'
          }
  
}

@HostListener('mouseleave')
onMouseLeave() {
  this.el.nativeElement.style.backgroundColor = '';

}
}


