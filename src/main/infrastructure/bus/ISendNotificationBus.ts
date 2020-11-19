export interface ISendNotificationBus {
    NotifyExecution(finalState: string): void;
}