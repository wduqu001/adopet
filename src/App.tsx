import React, { useEffect, useState } from 'react';
import { Layout, Menu, Icon, Pagination, Button } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';

import { API_KEY } from './config';
import { authenticate } from './authentication.helper';
import { findPets } from './pet-search.helper';
import CardsList from './CardsList';

import './App.css';

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [access_key, setAccessKey] = useState("");
  
  const [gender, setGender] = useState("FEMALE");
  const [size, setSize] = useState("M");
  const [age, setAge] = useState("SENIOR");
  const [data, setData] = useState<Array<any> | null>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const storedAccessKey: string | null = localStorage.getItem("access_key");

    if (storedAccessKey && storedAccessKey !== 'undefined') {
      setAccessKey(storedAccessKey);
      setLoaded(true);
      return
    }

    if (!API_KEY) {
      alert("API_KEY was not found. Please add a API_KEY to the config.ts file")
      return;
    }

    (async () => {
      const accessKey: string | null = await authenticate(API_KEY)
      if (!accessKey) {
        alert("User authentication failed");
        return;
      }

      setAccessKey(accessKey);
      localStorage.setItem("access_key", accessKey);
    })();

    setLoaded(true)
  }, []);

  useEffect(() => {
    if (loaded) {
      (async () => {
        const resp = await findPets({access_key, gender, size, age, currentPage});
        setData(resp.result);
        setCount(resp.count);
      })();
    }
  }, [access_key, gender, size, age, currentPage]);

  return (
    <div className="App">
      <Layout>
        <Sider
          className="app-sider"
          breakpoint="sm"
          collapsedWidth="0"
          collapsed={collapsed}
        >
          <div className="logo"/>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["2", "4", "10"]}
          >
            <SubMenu
              key="gender"
              title={
                <span>
                  <Icon type="woman" />
                  <Icon type="man" />
                  <span>Gender</span>
                </span>
              }
            >
              <Menu.Item key="1" onClick={() => setGender("MALE")}>
                Male
              </Menu.Item>
              <Menu.Item key="2" onClick={() => setGender("FEMALE")}>
                Female
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="size"
              title={
                <span>
                  <Icon type="column-height" />
                  <span>Size</span>
                </span>
              }
            >
              <Menu.Item key="3" onClick={() => setSize("S")}>
                S
              </Menu.Item>
              <Menu.Item key="4" onClick={() => setSize("M")}>
                M
              </Menu.Item>
              <Menu.Item key="5" onClick={() => setSize("L")}>
                L
              </Menu.Item>
              <Menu.Item key="6" onClick={() => setSize("XL")}>
                XL
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="age"
              title={
                <span>
                  <Icon type="calendar" />
                  <span>Age</span>
                </span>
              }
            >
              <Menu.Item key="7" onClick={() => setAge("BABY")}>
                Baby
              </Menu.Item>
              <Menu.Item key="8" onClick={() => setAge("YOUNG")}>
                Young
              </Menu.Item>
              <Menu.Item key="9" onClick={() => setAge("ADULT")}>
                Adult
              </Menu.Item>
              <Menu.Item key="10" onClick={() => setAge("SENIOR")}>
                Senior
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>

        <Button type="primary" onClick={() => setCollapsed(!collapsed)} className="collapse-btn">
          <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>

        <Layout style={{ marginLeft: 200 }}>
          <Header className="app-header align-text-center">
            Pet Search
          </Header>
          <Content className="app-content">
            <CardsList data={data} />
          </Content>
          <Content
            style={{ margin: "12px 16px 0" }}
            className="pagination"
          >
            <Pagination
              defaultCurrent={1}
              defaultPageSize={5}
              onChange={e => setCurrentPage(e)}
              total={count}
            />
          </Content>
          <Footer className="align-text-center">Adopets test ©2019 Created by Willian Duque</Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
