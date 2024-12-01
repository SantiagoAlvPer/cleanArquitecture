
import { Injectable } from '@angular/core';
import { IEvent } from 'src/app/domain/models/interfaces/event/Ievent';
import { EventRepository } from 'src/app/infrastructure/repositories/firebase/event.repository';

@Injectable({
  providedIn: 'root'  // O en un módulo específico si prefieres
})
export class CreateEventCommand {
  constructor(private eventRepository: EventRepository) {}

  async execute(event: IEvent): Promise<void> {
    await this.eventRepository.createEvent(event);
  }
}