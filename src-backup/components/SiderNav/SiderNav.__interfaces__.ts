export interface SiderProps {
  isMobile?: boolean;
  collapsed: boolean;
  onCollapse: (truefalse: boolean) => void;
  onOpenChange: (openKeys: MenuData[]) => void;
}
interface MenuDataAttr {
  key: string | MenuData;
  name: string;
  path: string;
  target?: string;
  hideInMenu?: boolean;
  authority?: string;
}
export interface MenuData {
  // key: MenuData;
  // path: MenuData;
  menu: MenuDataAttr;
  icon: string;
  children: Array<MenuData>;
}
interface Location {
  pathname: string;
}
export interface SiderNavProps {
  siderProps: SiderProps;
  menuData: Array<MenuData>;
  logo: string;
  location: Location;
  // openKeys: string[];
}

export interface SiderNavState {
  openKeys: string[] | MenuData[];
}
