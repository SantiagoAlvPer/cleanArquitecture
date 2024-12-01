import { Injectable } from '@angular/core';
import { EventRepository } from 'src/app/infrastructure/repositories/firebase/event.repository';
@Injectable({
  providedIn: 'root'  // O en un módulo específico si prefieres
})
export class DeleteEventCommand {
    constructor(private eventRepository: EventRepository) {}
  
    async execute(eventID: string): Promise<void> {
      await this.eventRepository.deleteEvent(eventID);
    }
  }