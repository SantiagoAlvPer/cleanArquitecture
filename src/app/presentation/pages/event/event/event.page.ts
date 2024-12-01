import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IEvent } from 'src/app/domain/models/interfaces/event/Ievent';
import { EventRepository } from 'src/app/infrastructure/repositories/firebase/event.repository';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  events: IEvent[] = []; // Almacena los eventos

  constructor(private eventRepo: EventRepository,  private router: Router) {

    }

  ngOnInit() {
    this.loadEvents();
  }

  // Cargar eventos desde el repositorio
  async loadEvents() {
    this.eventRepo.getAll().subscribe((data) => {
      this.events = data;
    });
  }
  goToUpdatePage(eventID: string) {
    this.router.navigate(['/event-update', { eventID }]);
  }

  async deleteEvent(eventID: string) {
    try {
      await this.eventRepo.deleteEvent(eventID);
      this.events = this.events.filter((event) => event.eventID !== eventID); // Actualizar la lista localmente
    } catch (error) {
      console.error('Error al eliminar el evento', error);
    }
  }
}


