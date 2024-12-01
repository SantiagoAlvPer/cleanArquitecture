import { Injectable } from '@angular/core';
import { IEvent } from 'src/app/domain/models/interfaces/event/Ievent';
import { EventRepository } from 'src/app/infrastructure/repositories/firebase/event.repository';
@Injectable({
  providedIn: 'root'  // O en un módulo específico si prefieres
})
export class UpdateEventCommand {
    constructor(private eventRepository: EventRepository) {}
  
    async updateEvent(event: IEvent): Promise<void> {
      try {
        await this.eventRepository.updateEvent(event);  // Llamamos al repositorio para actualizar el evento en la base de datos
      } catch (error) {
        console.error('Error al actualizar el evento:', error);
        throw new Error('No se pudo actualizar el evento');
      }
    }
  }