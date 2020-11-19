import {ISendNotifications} from "../ISendNotifications";

export interface ISendFinalStateBus {
    trigger(sender: ISendNotifications): void;
}