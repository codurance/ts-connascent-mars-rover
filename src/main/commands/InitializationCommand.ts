import {ICommand} from "./ICommand";
import {Position} from "../model/Position";
import {Coordinate} from "../model/Coordinate";

export class InitializationCommand implements ICommand {

    private topRightCoordinate: Coordinate;


    constructor(topRightCoordinate: Coordinate) {
        this.topRightCoordinate = topRightCoordinate;
    }

    execute(position: Position): Position {
        return position;
    }

}