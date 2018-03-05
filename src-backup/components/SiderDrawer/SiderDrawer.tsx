import React from "react";
import DrawerMenu from "rc-drawer-menu";
import "rc-drawer-menu/assets/index.css";
import SiderNav from "../SiderNav/SiderNav";
import { SiderProps, SiderNavProps } from "../SiderNav/SiderNav.__interfaces__";

interface SiderDrawerProps {
  siderProps: SiderProps;
  siderNav: SiderNavProps;
}

export default (props: SiderDrawerProps) =>
  props.siderProps.isMobile ? (
    <DrawerMenu
      parent={null}
      level={null}
      iconChild={null}
      open={!props.siderProps.collapsed}
      onMaskClick={() => {
        props.siderProps.onCollapse(true);
      }}
      width="256px"
    >
      <SiderNav
        {...props.siderNav}
        collapsed={
          props.siderProps.isMobile ? false : props.siderProps.collapsed
        }
      />
    </DrawerMenu>
  ) : (
    <SiderNav {...props.siderNav} />
  );
