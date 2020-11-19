import {ICommand} from "./ICommand";
import {Position} from "../model/Position";

export class StartingPositionCommand implements ICommand {

    private startingPosition: Position;


    constructor(startingPosition: Position) {
        this.startingPosition = startingPosition;
    }

    execute(position: Position): Position {
        return this.startingPosition;
    }

}