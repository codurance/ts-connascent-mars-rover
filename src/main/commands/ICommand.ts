import {Position} from "../model/Position";

export interface ICommand {
    execute(position: Position): Position;
}