import React, { useEffect, useState } from 'react';
import { Layout, Menu, Icon, Pagination, Button, Switch, Alert } from 'antd';
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
  
  const [gender, setGender] = useState("");
  const [size, setSize] = useState("");
  const [age, setAge] = useState("");
  const [data, setData] = useState<Array<any> | null>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(1);
  const [sort, setSort] = useState('name');
  const [order, setOrder] = useState(""); // '-' for DESC & '' for ASC
  const [error, setError] = useState("");

  useEffect(() => {
    const storedAccessKey: string | null = localStorage.getItem("access_key");

    if (storedAccessKey && storedAccessKey !== 'undefined') {
      setAccessKey(storedAccessKey);
      setLoaded(true);
      return
    }

    if (!API_KEY) {
      setError("API_KEY was not found. Please add a API_KEY to the config.ts file")
      return;
    }

    (async () => {
      const accessKey: string | null = await authenticate(API_KEY)
      if (!accessKey) {
        setError("User authentication failed");
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
        const resp = await findPets(access_key, gender, size, age, currentPage, [order + sort]);
        if(!resp) {
          setError("There were some technical issues. Please try again later");
          return;
        }
        setData(resp.result);
        setCount(resp.count);
      })();
    }
  }, [access_key, gender, size, age, currentPage, order, sort]);

  function clearFilters():void {
    setGender('');
    setSize(''); 
    setAge(''); 
    setSort('name'); 
    setOrder('');
  }

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
          <div className="sider-settings-header"> Settings: </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["11"]}
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

            <SubMenu
              key="sort"
              title={
                <span>
                  <Icon type="retweet"/>
                  <span>Sort by</span>
                </span>
              }
            >
              <Menu.Item key="11" onClick={() => setSort("name")}>
                Name
              </Menu.Item>
              <Menu.Item key="12" onClick={() => setSort("sex_key")}>
                Gender
              </Menu.Item>
              <Menu.Item key="13" onClick={() => setSort("size_key")}>
                Size
              </Menu.Item>
              <Menu.Item key="14" onClick={() => setSort("age_key")}>
                Age
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="15" onClick={clearFilters}>
              <Icon type="undo" />
              Clear filters
            </Menu.Item>
            <Menu.Item key="16">
              <span>Order: &nbsp;</span>
              <Switch 
                checkedChildren={<Icon type="arrow-up"/>} 
                unCheckedChildren={<Icon type="arrow-down"/>} 
                defaultChecked
                onClick={(checked:boolean) => setOrder(checked ? '' : '-')}
              />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header className="app-header align-text-center">
            Pet Search
          </Header>
          {
            error ? 
            <Alert message={error} type="error" closable showIcon />
            : ""
          }
          <Content style={{ height: "0"}}>
            <Button type="primary" onClick={() => setCollapsed(!collapsed)} className="collapse-btn">
              <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
            </Button>
          </Content>
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
              onChange={(pageNumber:number) => setCurrentPage(pageNumber)}
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
