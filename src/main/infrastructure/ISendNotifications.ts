import {ISendFinalStateBus} from "./bus/ISendFinalStateBus";

export interface ISendNotifications {
    readsFrom(marsRoverServiceBus: ISendFinalStateBus): void;
    sendError(): void;
    send(notification: string): void;
}