import {INotifier} from "../INotifier";

export interface ISmartTimer {
    waitMillisecond(milliseconds: number): ISmartTimer;
    beforeDoing(notifyMessage: INotifier, datagrams: Array<string>): ISmartTimer;
}