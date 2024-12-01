import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CreateEventCommand } from 'src/app/application/commands/createEvent.comand';
import { DeleteEventCommand } from 'src/app/application/commands/deleteEvent.command';
import { UpdateEventCommand } from 'src/app/application/commands/updatEvent.command';
import { EventPageModule } from '../event/event/event.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    EventPageModule,
    ReactiveFormsModule
  ],
  declarations: [HomePage],
  providers:[
    CreateEventCommand,
    DeleteEventCommand,
    UpdateEventCommand
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class HomePageModule {}
