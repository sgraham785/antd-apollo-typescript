import * as React from 'react';
import Character from '../../components/Character/Character';
import { Episode } from '../../__generated__/types';

import { Layout, Menu, Icon } from 'antd/lib';
const { Header, Content, Footer, Sider } = Layout;
import './App.css';

export const App = () => {

return(
    <Layout>
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
            // style={{ height: '100vh', position: 'fixed', left: 0, background: '#fff' }}
        >
            <div className="logo" />
            <Menu theme='dark' mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                    <Icon type="user" />
                    <span className="nav-text">nav 1</span>
                </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="video-camera" />
                    <span className="nav-text">nav 2</span>
                </Menu.Item>
                <Menu.Item key="3">
                    <Icon type="upload" />
                    <span className="nav-text">nav 3</span>
                </Menu.Item>
                <Menu.Item key="4">
                    <Icon type="user" />
                    <span className="nav-text">nav 4</span>
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout>
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content style={{ margin: '24px 16px 0', height: '100vh' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <Character episode={Episode.NEWHOPE} />
        </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2016 Created by Ant UED
            </Footer>
        </Layout>
    </Layout>
)}