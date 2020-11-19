import {ICommand} from "./ICommand";
import {Position} from "../model/Position";

export class TurnRightCommand implements ICommand {
    execute(position: Position): Position {
        return position.turnRight();
    }

}