import {ISendNotifications} from "../ISendNotifications";
import {ISendFinalStateBus} from "../bus/ISendFinalStateBus";
import {INasaAntenna} from "./INasaAntenna";

export class MarsRoverSender implements ISendNotifications {

    private nasaAntenna: INasaAntenna;


    constructor(nasaAntenna: INasaAntenna) {
        this.nasaAntenna = nasaAntenna;
    }

    readsFrom(marsRoverServiceBus: ISendFinalStateBus): void {
        marsRoverServiceBus.trigger(this);
    }

    send(message: string): void {
        let messageParts: string[] = message.split(" ");
        this.nasaAntenna.received([
            "X" + messageParts[0],
            "Y" + messageParts[1],
            "D" + messageParts[2]
        ])
    }

    sendError(): void {
        this.nasaAntenna.received(["ER"])
    }

}