import {MarsRoverReceiver} from "../main/infrastructure/spacecomm/MarsRoverReceiver";
import {mock} from "jest-mock-extended";
import {IMessageReceivedBus} from "../main/infrastructure/bus/IMessageReceivedBus";

describe("Mars Rover Receiver", () => {

    let marsRoverReceiver: MarsRoverReceiver = new MarsRoverReceiver();
    let mockServiceBus: IMessageReceivedBus = mock<IMessageReceivedBus>();

    it.each `
        packages                                                    |   rebuiltMessage
        ${["X2", "Y5", "DN", "M5", "1F", "2L", "3F", "4R", "5F"]}   |   ${"100 100\n2 5 N\nFLFRF"}
        ${["X2", "Y5", "DN", "M4",  "3F","2L","1F",  "4R"]}         |   ${"100 100\n2 5 N\nFLFR"}
    `('should rebuild message $rebuiltMessage from $packages', ({packages, rebuiltMessage}) => {

        marsRoverReceiver.writesTo(mockServiceBus);
        for (let datagram of packages) {
            marsRoverReceiver.received(datagram);
        }
        expect(mockServiceBus.NotifyMessageReceived).toBeCalledWith(rebuiltMessage);
    });

    it('should notify error correctly', async () => {
        const sleepTime: number = 3100;
        marsRoverReceiver.writesTo(mockServiceBus);
        let packages: string[] = ["X2", "Y5", "DN", "M5", "2L", "3F", "4R", "5F"];
        for (let datagram of packages) {
            marsRoverReceiver.received(datagram);
        }
        await new Promise( r => setTimeout(r, sleepTime));
        expect(mockServiceBus.NotifyError).toHaveBeenCalled();
    })
})