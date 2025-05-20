export interface IMenuItem {
  label: string;
  onClick: () => void;
  subMenus?: {
    label: string;
    onClick: () => void;
  }[];
}
