export interface TimerTask {
    run(): void;

    cancel(): void;
}