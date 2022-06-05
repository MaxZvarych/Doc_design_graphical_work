import { Menu } from "antd";
import "antd/dist/antd.css";
import React from "react";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

class CatalogMenu extends React.Component {
  state = {
    current: "mail",
  };

  handleClick = (e) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[current]}
        mode="horizontal"
      >
        <SubMenu
          key="FilterSubMenu"
          icon={<SettingOutlined />}
          title="Choose Filter"
        >
          <SubMenu key="FilterPrice" title="Filter By Price">
            <Menu.Item key="priceLess100">Price lower 100$</Menu.Item>
            <Menu.Item key="priceOver100">Price over 100$</Menu.Item>
            <Menu.Item key="priceOver200">Price over 200$</Menu.Item>
            <Menu.Item key="priceOver500">Price over 500$</Menu.Item>
            <Menu.Item key="priceOver1000">Price over 1000$</Menu.Item>
          </SubMenu>
          <SubMenu key="FilterRiskLevel" title="Filter By level of risk">
            <Menu.Item key="riskLow">LOW</Menu.Item>
            <Menu.Item key="riskMedium">MEDIUM</Menu.Item>
            <Menu.Item key="riskHigh">HIGH</Menu.Item>
            <Menu.Item key="riskUltraHigh">ULTRAHIGH</Menu.Item>
          </SubMenu>
          <SubMenu key="FilterBiddingTrend" title="Filter By trend of bidding">
            <Menu.Item key="trendAscending">ASCENDING</Menu.Item>
            <Menu.Item key="trendDescending">DESCENDING</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu
          key="SortingSubMenu"
          icon={<SettingOutlined />}
          title="Sortings"
        >
          <Menu.ItemGroup title="Sort By(Ascending order):">
            <Menu.Item key="sortPriceAsc">Price</Menu.Item>
            <Menu.Item key="sortOwnerAsc">Owner</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Sort By(Descending order):">
            <Menu.Item key="sortPriceDesc">Price</Menu.Item>
            <Menu.Item key="sortOwnerDesc">Owner</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    );
  }
}
export default CatalogMenu;
