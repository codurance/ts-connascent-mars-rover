import {IProcessMessages} from "./IProcessMessages";
import {MarsRoverEngine} from "../app/MarsRoverEngine";
import {CommandInterpreter} from "../app/CommandInterpreter";
import {ISendNotificationBus} from "./bus/ISendNotificationBus";
import {IReadMessages} from "./IReadMessages";
import {ICommand} from "../commands/ICommand";
import {Position} from "../model/Position";

export class MarsRoverController implements IProcessMessages {

    private marsRoverEngine: MarsRoverEngine;
    private commandInterpreter: CommandInterpreter;
    private marsRoverServiceWriter!: ISendNotificationBus;


    constructor() {
        this.marsRoverEngine = new MarsRoverEngine();
        this.commandInterpreter = new CommandInterpreter();
    }

    writesTo(marsRoverServiceBus: ISendNotificationBus): void {
        this.marsRoverServiceWriter = marsRoverServiceBus;
    }

    readsFrom(marsRoverServiceBus: IReadMessages): void {
        marsRoverServiceBus.callback(this);
    }

    process(messageReceived: string): void {
        let commands: Array<ICommand> = this.commandInterpreter.translate(messageReceived);
        this.marsRoverEngine.execute(commands);
        let finalPosition: Position = this.marsRoverEngine.getPosition();
        this.marsRoverServiceWriter.NotifyExecution(finalPosition.toString());
    }

}