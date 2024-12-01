import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IEvent } from 'src/app/domain/models/interfaces/event/Ievent';

@Injectable({
  providedIn: 'root',
})
export class EventRepository {
  private collection = this.firestore.collection<IEvent>('events'); // Referencia a la colección de eventos

  constructor(private firestore: AngularFirestore) {}

  async createEvent(event: IEvent): Promise<string> {
    const docRef = await this.collection.add(event);
    const eventID = docRef.id;
    return eventID;
  }
  getAll(): Observable<IEvent[]> {
    return this.collection.valueChanges(); // Devuelve todos los eventos
  }

  
  async getById(eventID: string): Promise<IEvent | undefined> {
    const doc = await this.collection.doc(eventID).get().toPromise();

    if (!doc || !doc.exists) {
      // Verificar si `doc` es `undefined` o si no existe
      return undefined; // Si no existe, retorna `undefined`
    }

    return doc.data() as IEvent; // Si el documento existe, devuelve los datos
  }

  async updateEvent(event: IEvent): Promise<void> {
    try {
      const docRef = this.collection.doc(event.eventID);
      await docRef.update(event); 
    } catch (error) {
      console.error('Error al actualizar el evento en Firestore:', error);
      throw new Error('Error al actualizar el evento');
    }
  }

  // Eliminar un evento por su ID
  async deleteEvent(eventID: string): Promise<void> {
    const doc = await this.collection.doc(eventID).get().toPromise();

    if (!doc || !doc.exists) {
      // Verificar si `doc` es `undefined` o si no existe
      throw new Error(`Evento con ID ${eventID} no encontrado.`);
    }

    await this.collection.doc(eventID).delete(); // Eliminar si existe
  }

  
}