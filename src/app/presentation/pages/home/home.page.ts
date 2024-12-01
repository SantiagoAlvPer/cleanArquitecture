import { EventRepository } from 'src/app/infrastructure/repositories/firebase/event.repository';
import { Component } from '@angular/core';
import { CreateEventCommand } from 'src/app/application/commands/createEvent.comand';
import { DeleteEventCommand } from 'src/app/application/commands/deleteEvent.command';
import { UpdateEventCommand } from 'src/app/application/commands/updatEvent.command';
import { IEvent } from 'src/app/domain/models/interfaces/event/Ievent';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  eventForm: FormGroup;
  constructor(
    private deleteEventCommand: DeleteEventCommand,
    private readonly eventRepository: EventRepository,
    private formBuilder: FormBuilder
  ) {
// Inicializamos el formulario con los controles necesarios
this.eventForm = this.formBuilder.group({
  title: ['', Validators.required],
  description: ['', Validators.required],
  direccion: ['', Validators.required], // Nuevo campo para la dirección
  date: ['', Validators.required],
  duration: [0, Validators.required],  // Nuevo campo para la duración
  numberOfAttendees: [0, Validators.required], // Nuevo campo para el número de asistentes
  specialRequirements: [''], // Nuevo campo para requisitos especiales
  done: [false],
});
}

async createEvent() {
if (this.eventForm.invalid) {
  return; // Validar el formulario antes de enviarlo
}

// Crear un evento con los valores del formulario
const event: IEvent = {
  eventID: '', // Firestore asignará automáticamente el ID
  title: this.eventForm.value.title,
  description: this.eventForm.value.description,
  direccion: this.eventForm.value.direccion,  // Extraemos la dirección
  date: this.eventForm.value.date,
  duration: this.eventForm.value.duration,  // Extraemos la duración
  numberOfAttendees: this.eventForm.value.numberOfAttendees,  // Extraemos el número de asistentes
  specialRequirements: this.eventForm.value.specialRequirements, // Extraemos los requisitos especiales
};

try {
  // Usar el use case para crear el evento en Firestore
  const eventID = await this.eventRepository.createEvent(event);
  console.log('Evento creado con ID:', eventID);
  this.resetForm();
} catch (error) {
  console.error('Error al crear el evento:', error);
}
}

// Método para reiniciar el formulario después de un envío exitoso
resetForm() {
this.eventForm.reset();
}



  // Método para eliminar un evento
  deleteEvent(eventID: string): void {
    this.deleteEventCommand.execute(eventID).then(() => {
      console.log('Evento eliminado');
    }).catch(error => {
      console.error('Error al eliminar el evento:', error);
    });
  }
}
