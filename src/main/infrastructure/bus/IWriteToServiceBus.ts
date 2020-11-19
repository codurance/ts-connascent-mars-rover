import {IMessageReceivedBus} from "./IMessageReceivedBus";

export interface IWriteToServiceBus {
    writesTo(marsRoverServiceBus: IMessageReceivedBus): void;
}