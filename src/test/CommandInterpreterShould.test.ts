import {InitializationCommand} from "../main/commands/InitializationCommand";
import {Coordinate} from "../main/model/Coordinate";
import {StartingPositionCommand} from "../main/commands/StartingPositionCommand";
import {Position} from "../main/model/Position";
import {TurnLeftCommand} from "../main/commands/TurnLeftCommand";
import {MoveForwardCommand} from "../main/commands/MoveForwardCommand";
import {TurnRightCommand} from "../main/commands/TurnRightCommand";
import {CommandInterpreter} from "../main/app/CommandInterpreter";
import {ICommand} from "../main/commands/ICommand";

describe('Command Interpreter ', () => {

    beforeEach(() => {

    })

    it.each([
        ["5 5\n3 3 E\nLFLFR", [
            new InitializationCommand(new Coordinate(5, 5)),
            new StartingPositionCommand(new Position(3, 3, "E")),
            new TurnLeftCommand(),
            new MoveForwardCommand(),
            new TurnLeftCommand(),
            new MoveForwardCommand(),
            new TurnRightCommand()
        ]],
        ["5 5\n3 3 E\nL", [
            new InitializationCommand(new Coordinate(5, 5)),
            new StartingPositionCommand(new Position(3, 3, "E")),
            new TurnLeftCommand()
        ]],
        ["5 5\n3 3 E\nF", [
            new InitializationCommand(new Coordinate(5, 5)),
            new StartingPositionCommand(new Position(3, 3, "E")),
            new MoveForwardCommand()
        ]],
        ["5 5\n3 3 E\nR", [
            new InitializationCommand(new Coordinate(5, 5)),
            new StartingPositionCommand(new Position(3, 3, "E")),
            new TurnRightCommand()
        ]]
    ])('should parse commands', (inputCommand: string, expectedCommands) => {
        let commandInterpreter: CommandInterpreter = new CommandInterpreter();
        let commands: Array<ICommand> = commandInterpreter.translate(inputCommand.trim());

        expect(commands).toStrictEqual(expectedCommands);
    })
})