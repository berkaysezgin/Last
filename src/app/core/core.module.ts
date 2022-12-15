import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { IfNotDirective } from './directives/if-not.directive';
import { NgModule } from '@angular/core';
import { OverlayLoadingComponent } from './components/overlay-loading/overlay-loading.component';

@NgModule({
  declarations: [
    OverlayLoadingComponent,
    IfNotDirective,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  exports:[OverlayLoadingComponent,IfNotDirective],
})
export class CoreModule { }
