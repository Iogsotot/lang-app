export interface ButtonProps {
  props?: any;
  onBtnClick: (...args: any) => void;
  text: string;
  className: string;
  icon?: string;
}
