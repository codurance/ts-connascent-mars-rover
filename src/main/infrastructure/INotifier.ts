export interface INotifier {
    notifyMessage(datagrams: Array<String>): void;
}