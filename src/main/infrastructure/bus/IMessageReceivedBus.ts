export interface IMessageReceivedBus {
    NotifyMessageReceived(message: string): void;
    NotifyError(): void;
}