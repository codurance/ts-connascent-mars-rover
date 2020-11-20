import {InitializationCommand} from "../main/commands/InitializationCommand";
import {Coordinate} from "../main/model/Coordinate";
import {StartingPositionCommand} from "../main/commands/StartingPositionCommand";
import {Position} from "../main/model/Position";
import {TurnLeftCommand} from "../main/commands/TurnLeftCommand";
import {TurnRightCommand} from "../main/commands/TurnRightCommand";
import {MoveForwardCommand} from "../main/commands/MoveForwardCommand";
import {MarsRoverEngine} from "../main/app/MarsRoverEngine";

describe('MarsRoverEngine ', () => {
    beforeEach(() => {

    })

    it.each([
        [[new InitializationCommand(new Coordinate(5, 5)),
            new StartingPositionCommand(new Position(2, 2, "N"))],
            new Position(2, 2, "N")],
        [[new InitializationCommand(new Coordinate(5, 5)),
            new StartingPositionCommand(new Position(2, 2, "N")),
            new TurnLeftCommand()
        ], new Position(2, 2, "W")],
        [[new InitializationCommand(new Coordinate(5, 5)),
            new StartingPositionCommand(new Position(2, 2, "N")),
            new TurnRightCommand()
        ], new Position(2, 2, "E")],
        [[new InitializationCommand(new Coordinate(5, 5)),
            new StartingPositionCommand(new Position(2, 2, "2")),
            new MoveForwardCommand()
        ], new Position(2, 3, "N")]
    ])('should execute commands %s then end in %s position', (commands, finalPosition) => {
        let roverEngine: MarsRoverEngine = new MarsRoverEngine();

        roverEngine.execute(Array.from(commands))

        let position = roverEngine.getPosition();
        expect(position).toStrictEqual(finalPosition);
    })
})