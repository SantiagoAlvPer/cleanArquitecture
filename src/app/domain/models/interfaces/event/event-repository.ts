import { IEvent } from "../event/Ievent";


export interface EventRepository {
    create(event: IEvent): Promise<void>;
    update(event: IEvent): Promise<void>;
    delete(eventID: string): Promise<void>;
    getAll(): Promise<IEvent[]>;
    getById(eventID: string): Promise<IEvent | undefined>;
}
