import {IWriteToServiceBus} from "../bus/IWriteToServiceBus";
import {IMessageReceivedBus} from "../bus/IMessageReceivedBus";
import {Message} from "./Message";
import {SmartTimer} from "../timing/SmartTimer";
import {INotifier} from "../INotifier";

export class MarsRoverReceiver implements IWriteToServiceBus {
    private marsRoverServiceBus!: IMessageReceivedBus;
    private datagrams: Array<string> = new Array<string>();
    private smartTimer: SmartTimer = new SmartTimer();

    private notifyMessage: INotifier = new class implements INotifier {
        notifyMessage(data: Array<String>): void {
            this.notifyMessage(data)
        }
    }
    private MAX_DELAY_MILLISECONDS: number = 3000;

    writesTo(marsRoverServiceBus: IMessageReceivedBus): void {
        this.marsRoverServiceBus = marsRoverServiceBus;
    }

    received(datagram: string): void {
        this.datagrams.push(datagram);

        let message: Message = new Message(this.datagrams);

        if (message.isValid()) {
            this.marsRoverServiceBus.NotifyMessageReceived(message.toString());
            return;
        }

        this.smartTimer.waitMillisecond(this.MAX_DELAY_MILLISECONDS)
            .beforeDoing(this.notifyMessage, this.datagrams);
    }

    private notifyMessage(datagrams: Array<string>): void {
        let message: Message = new Message(datagrams);
        if(message.isValid()) {
            this.marsRoverServiceBus.NotifyMessageReceived(message.toString());
            return;
        }
        this.marsRoverServiceBus.NotifyError();
    }

}