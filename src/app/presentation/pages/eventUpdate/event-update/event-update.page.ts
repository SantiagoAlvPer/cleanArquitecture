import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IEvent } from 'src/app/domain/models/interfaces/event/Ievent';
import { EventRepository } from 'src/app/infrastructure/repositories/firebase/event.repository';

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.page.html',
  styleUrls: ['./event-update.page.scss'],
})
export class EventUpdatePage implements OnInit {

  event: IEvent | undefined;
  eventForm: FormGroup;  // El formulario que contiene los campos de evento

  constructor(private formBuilder: FormBuilder, private eventRepo: EventRepository, private route: ActivatedRoute,
    private router: Router,) {
    // Inicializamos el formulario con los controles necesarios
    this.eventForm = this.formBuilder.group({
      eventID: ['', Validators.required],  // Agregar validación para el ID del evento
      title: ['', Validators.required],
      description: ['', Validators.required],
      direccion: ['', Validators.required],  // Dirección
      date: ['', Validators.required],
      duration: [0, Validators.required],  // Duración
      numberOfAttendees: [0, Validators.required],  // Número de asistentes
      specialRequirements: [''],  // Requisitos especiales
      done: [false],
    });
  }

  ngOnInit(){
    const eventID = this.route.snapshot.paramMap.get('eventID');
    if (eventID) {
      // Cargar los detalles del evento usando el eventID
      this.loadEvent(eventID);
    }
  }

  async loadEvent(eventID: string) {
    try {
      this.event = await this.eventRepo.getById(eventID);
    } catch (error) {
      console.error('Error al cargar el evento', error);
    }
  }
  async saveEvent() {
    if (this.event) {
      try {
        await this.eventRepo.updateEvent(this.event);
        this.router.navigate(['/home']); // Redirigir a la página de eventos después de la actualización
      } catch (error) {
        console.error('Error al actualizar el evento', error);
      }
    }
  }

  
}
