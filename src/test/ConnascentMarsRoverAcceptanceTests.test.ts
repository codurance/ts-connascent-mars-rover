import {MarsRoverReceiver} from "../main/infrastructure/spacecomm/MarsRoverReceiver";
import {ISendNotifications} from "../main/infrastructure/ISendNotifications";
import {INasaAntenna} from "../main/infrastructure/spacecomm/INasaAntenna";
import {MarsRover} from "../main/MarsRover";
import {mock} from "jest-mock-extended";
import {MarsRoverSender} from "../main/infrastructure/spacecomm/MarsRoverSender";
import {MarsRoverController} from "../main/infrastructure/MarsRoverController";
import {ServiceBus} from "../main/infrastructure/bus/ServiceBus";

describe('Connascent MarsRover Acceptance Tests', () => {

    const maxDelay: number = 3000;
    let marsRoverReceiver: MarsRoverReceiver;
    let marsRoverSender: ISendNotifications;
    let nasaAntenna: INasaAntenna;
    let marsRover: MarsRover;

    beforeEach(() => {
        nasaAntenna = mock<INasaAntenna>();
        marsRoverReceiver = new MarsRoverReceiver();
        marsRoverSender = new MarsRoverSender(nasaAntenna);
        let marsRoverController: MarsRoverController = new MarsRoverController();
        let marsRoverBus: ServiceBus = new ServiceBus();
        marsRover = new MarsRover(marsRoverBus, marsRoverReceiver, marsRoverSender, marsRoverController);
    })

    it("move following commands", () => {
        let inputPackages: string[] = ["X2", "Y5", "DN", "M5", "1F", "2L", "3F", "4R", "5F"];
        for (let pack of inputPackages) {
            marsRoverReceiver.received(pack);
        }

        expect(nasaAntenna.received).toBeCalledWith(["X1", "Y7", "DN"]);
    });

    it("move following commands any order", () => {
        let inputPackages: string[] = ["DN", "M5","X2", "Y5", "3F", "4R", "1F", "2L",  "5F"];
        for (let pack of inputPackages) {
            marsRoverReceiver.received(pack);
        }

        expect(nasaAntenna.received).toBeCalledWith(["X1", "Y7", "DN"]);
    });

    it("move following commands incomplete", async () => {
        let inputPackages: string[] = ["DN", "M5","X2", "Y5", "3F", "1F", "2L",  "5F"];
        for (let pack of inputPackages) {
            marsRoverReceiver.received(pack);
        }
        await new Promise( r => setTimeout(r, 3100));
        expect(nasaAntenna.received).toBeCalledWith(["ER"])
    })
})