import {ICommand} from "./ICommand";
import {Position} from "../model/Position";

export class MoveForwardCommand implements ICommand {
    execute(position: Position): Position {
        return position.moveForward();
    }

}