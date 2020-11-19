import {INasaAntenna} from "../main/infrastructure/spacecomm/INasaAntenna";
import {MarsRoverSender} from "../main/infrastructure/spacecomm/MarsRoverSender";
import {mocked} from "ts-jest";

jest.mock('../main/infrastructure/spacecomm/INasaaAntenna', () => {
    return {
        INasantena: jest.fn().mockImplementation(() => {
            return {
                received: () => {}
            };
        })
    }
})

describe('Test: MarsRoverSender', () => {
    it('should send message correctly', () => {
        const nasaAntenna = mocked(INasaAntenna, true)
        let marsRoverSender: MarsRoverSender = new MarsRoverSender(nasaAntenna);

        marsRoverSender.send("6 99 S");

        expect(nasaAntenna.received(["X6", "Y99", "DS"])).toBeCalled();
    });
    it('should send error message', () => {

    });
})