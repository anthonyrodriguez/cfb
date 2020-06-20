import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConferenceCardComponent } from './conference/conference-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ConferenceCardComponent,
  ],
  exports: [
    ConferenceCardComponent,
  ]
})
export class ComponentsModule { }
