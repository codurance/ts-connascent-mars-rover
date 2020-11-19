import {IProcessMessages} from "./IProcessMessages";

export interface IReadMessages {
    callback(messageProcessor: IProcessMessages): void;
}