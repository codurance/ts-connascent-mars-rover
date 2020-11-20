import {Coordinate} from "./Coordinate";
import {Direction} from "./Direction";
import {format} from "util";
import deepEqual = require("deep-equal");

export class Position {
    private coordinate: Coordinate;
    private direction: Direction;

    private parseDirection(directionText: string): Direction {
        switch (directionText) {
            case "N":
                return Direction.NORTH()
            case "E":
                return Direction.EAST()
            case "S":
                return Direction.SOUTH()
            case "W":
                return Direction.WEST()
            default:
                return Direction.NORTH()
        }
    }

    constructor(x: number, y: number, directionText: string) {
        this.coordinate = new Coordinate(x, y);
        this.direction = this.parseDirection(directionText);
    }

    turnLeft(): Position {
        return new Position(this.coordinate.x, this.coordinate.y, this.direction.turnLeft().toString())
    }

    turnRight(): Position {
        return new Position(this.coordinate.x, this.coordinate.y, this.direction.turnRight().toString())
    }

    moveForward() {
        var coordinate: Coordinate = new Coordinate(0, 0);
        let s = this.direction.enumValue();
        if (s === "NORTH") {
            coordinate = this.coordinate.moveNorth()
        } else if (s === "EAST") {
            coordinate = this.coordinate.moveEast()
        } else if (s === "SOUTH") {
            coordinate = this.coordinate.moveSouth()
        } else if (s === "WEST") {
            coordinate = this.coordinate.moveWest();
        }
        return new Position(coordinate.x, coordinate.y, this.direction.toString());
    }

    toString(): string {
        return format("%s %s", this.coordinate.toString(), this.direction.toString())
    }

    equals(o: Position): boolean {
        return deepEqual(this.coordinate, o.coordinate) && this.direction === o.direction;
    }


}