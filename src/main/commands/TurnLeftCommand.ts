import {ICommand} from "./ICommand";
import {Position} from "../model/Position";

export class TurnLeftCommand implements ICommand {
    execute(position: Position): Position {
        return position.turnLeft();
    }
}