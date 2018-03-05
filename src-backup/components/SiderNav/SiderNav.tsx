import { isUrl } from "../../utils/isUrl";
import React, { PureComponent } from "react";
import { Layout, Menu, Icon } from "antd";
import pathToRegexp from "path-to-regexp";
import { Link } from "react-router-dom";
import styles from "./SiderNav.less";
import { menuData } from "./SiderNav.__mocks__";
import {
  SiderNavProps,
  SiderNavState,
  MenuData
} from "./SiderNav.__interfaces__";

const { Sider } = Layout;
const { SubMenu } = Menu;

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
const getIcon = (icon?: string) => {
  if (icon === undefined) return;
  if (typeof icon === "string" && icon.indexOf("http") === 0) {
    return <img src={icon} alt="icon" className={styles.icon} />;
  }
  if (typeof icon === "string") {
    return <Icon type={icon} />;
  }
  return icon;
};

export default class SiderNav extends PureComponent<
  SiderNavProps,
  SiderNavState
> {
  public menus: MenuData[];

  constructor(props: SiderNavProps) {
    super(props);
    this.menus = props.menuData;
    this.state = { openKeys: this.getDefaultCollapsedSubMenus(props) };
  }
  componentWillReceiveProps(nextProps: SiderNavProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        openKeys: this.getDefaultCollapsedSubMenus(nextProps)
      });
    }
  }
  /**
   * Convert pathname to openKeys
   * /list/search/articles = > ['list','/list/search']
   * @param  props
   */
  getDefaultCollapsedSubMenus(props: SiderNavProps) {
    const { location: { pathname } } = props || this.props;
    // eg. /list/search/articles = > ['','list','search','articles']
    let snippets = pathname.split("/");
    // Delete the end
    // eg.  delete 'articles'
    snippets.pop();
    // Delete the head
    // eg. delete ''
    snippets.shift();
    // eg. After the operation is completed, the array should be ['list','search']
    // eg. Forward the array as ['list','list/search']
    snippets = snippets.map((item, index) => {
      // If the array length > 1
      if (index > 0) {
        // eg. search => ['list','search'].join('/')
        return snippets.slice(0, index + 1).join("/");
      }
      // index 0 to not do anything
      return item;
    });
    snippets = snippets.map(item => {
      return this.getSelectedMenuKeys(`/${item}`)[0];
    });
    // eg. ['list','list/search']
    return snippets;
  }
  /**
   * Recursively flatten the data
   * [{path:string},{path:string}] => {path,path2}
   * @param  menus
   */
  getFlatMenuKeys(menus: MenuData[]) {
    let keys: string[] = [];
    menus.forEach(item => {
      if (item.children) {
        keys.push(item.menu.path);
        keys = keys.concat(this.getFlatMenuKeys(item.children));
      } else {
        keys.push(item.menu.path);
      }
    });
    return keys;
  }
  /**
   * Get selected child nodes
   * /user/chen => ['user','/user/:id']
   */
  getSelectedMenuKeys = (path: string) => {
    const flatMenuKeys = this.getFlatMenuKeys(this.menus);
    return flatMenuKeys.filter(item => {
      return pathToRegexp(`/${item}(.*)`).test(path);
    });
  };
  /**
   * Determine if it is an http link. Return <Link> or <a>
   * @memberof SiderNav
   */
  getMenuItemPath = (item: MenuData) => {
    const itemPath = this.conversionPath(item.menu.path);
    const icon = getIcon(item.icon);
    const { target, name } = item.menu;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === this.props.location.pathname}
        onClick={
          this.props.siderProps.isMobile
            ? () => {
                this.props.siderProps.onCollapse(true);
              }
            : undefined
        }
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
  };
  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = (item: MenuData) => {
    if (item.children && item.menu.name !== null) {
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{item.menu.name}</span>
              </span>
            ) : (
              item.menu.name
            )
          }
          key={item.menu.path}
        >
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    } else {
      return (
        <Menu.Item key={item.menu.path}>{this.getMenuItemPath(item)}</Menu.Item>
      );
    }
  };
  /**
   * Get menu items
   * @memberof SiderNav
   */
  getNavMenuItems = (menusData: MenuData[]) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.menu.name && !item.menu.hideInMenu)
      .map(item => {
        const ItemDom: JSX.Element = this.getSubMenuOrItem(item);
        return this.checkPermissionItem(ItemDom, item.menu.authority);
      })
      .filter(item => !!item);
  };
  // conversion Path
  conversionPath = (path: string) => {
    if (path && path.indexOf("http") === 0) {
      return path;
    } else {
      return `/${path || ""}`.replace(/\/+/g, "/");
    }
  };
  // permission to check
  checkPermissionItem = (ItemDom: JSX.Element, authority?: string) => {
    if (this.props.Authorized && this.props.Authorized.check) {
      const { check } = this.props.Authorized;
      return check(authority, ItemDom);
    }
    return ItemDom;
  };
  handleOpenChange = (openKeys: MenuData[]) => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const isMainMenu = this.menus.some(
      item =>
        lastOpenKey &&
        (item.menu.key === lastOpenKey || item.path === lastOpenKey)
    );
    this.setState({
      openKeys: isMainMenu ? [lastOpenKey] : [...openKeys]
    });
  };
  render() {
    const { logo, location: { pathname } } = this.props;
    const { collapsed, onCollapse } = this.props.siderProps;
    const { openKeys } = this.state;
    // Don't show popup menu when it is been collapsed
    const menuProps = collapsed ? {} : { openKeys };
    // if pathname can't match, use the nearest parent's key
    let selectedKeys: string[] = this.getSelectedMenuKeys(pathname);
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={onCollapse}
        width={256}
        className={styles.sider}
      >
        <div className={styles.logo} key="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>Ant Design Pro</h1>
          </Link>
        </div>
        <Menu
          key="Menu"
          theme="dark"
          mode="inline"
          {...menuProps}
          onOpenChange={this.handleOpenChange}
          selectedKeys={selectedKeys}
          style={{ padding: "16px 0", width: "100%" }}
        >
          {this.getNavMenuItems(this.menus)}
        </Menu>
      </Sider>
    );
  }
}

function formatter(data, parentPath = "", parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority
    };
    if (item.children) {
      result.children = formatter(
        item.children,
        `${parentPath}${item.path}/`,
        item.authority
      );
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
