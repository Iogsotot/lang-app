export interface TimerProps {
  duration: number;
  tick: boolean;
  callback: () => void;
}
