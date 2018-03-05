import React, { Component } from "react";
import { connect } from "dva";
import { Card, Badge, Table, Divider } from "antd";
import DescriptionList from "ant-design-pro/lib/DescriptionList";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import styles from "./BasicProfile.css";

const { Description } = DescriptionList;

const progressColumns = [
  {
    title: "Time",
    dataIndex: "time",
    key: "time"
  },
  {
    title: "Current Progress",
    dataIndex: "rate",
    key: "rate"
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: text =>
      text === "success" ? (
        <Badge status="success" text="success" />
      ) : (
        <Badge status="processing" text="in progress" />
      )
  },
  {
    title: "Operator ID",
    dataIndex: "operator",
    key: "operator"
  },
  {
    title: "Time-consuming",
    dataIndex: "cost",
    key: "cost"
  }
];

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects["profile/fetchBasic"]
}))
export default class BasicProfile extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "profile/fetchBasic"
    });
  }

  render() {
    const { profile, loading } = this.props;
    const { basicGoods, basicProgress } = profile;
    let goodsData = [];
    if (basicGoods.length) {
      let num = 0;
      let amount = 0;
      basicGoods.forEach(item => {
        num += Number(item.num);
        amount += Number(item.amount);
      });
      goodsData = basicGoods.concat({
        id: "Total",
        num,
        amount
      });
    }
    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {}
      };
      if (index === basicGoods.length) {
        obj.props.colSpan = 0;
      }
      return obj;
    };
    const goodsColumns = [
      {
        title: "Product Code",
        dataIndex: "id",
        key: "id",
        render: (text, row, index) => {
          if (index < basicGoods.length) {
            return <a href=""> {text} </a>;
          }
          return {
            children: <span style={{ fontWeight: 600 }}> Total </span>,
            props: {
              colSpan: 4
            }
          };
        }
      },
      {
        title: "Product Name",
        dataIndex: "name",
        key: "name",
        render: renderContent
      },
      {
        title: "product barcode",
        dataIndex: "barcode",
        key: "barcode",
        render: renderContent
      },
      {
        title: "unit price",
        dataIndex: "price",
        key: "price",
        align: "right",
        render: renderContent
      },
      {
        title: "quantity (pieces)",
        dataIndex: "num",
        key: "num",
        align: "right",
        render: (text, row, index) => {
          if (index < basicGoods.length) {
            return text;
          }
          return <span style={{ fontWeight: 600 }}> {text} </span>;
        }
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        align: "right",
        render: (text, row, index) => {
          if (index < basicGoods.length) {
            return text;
          }
          return <span style={{ fontWeight: 600 }}> {text} </span>;
        }
      }
    ];
    return (
      <PageHeaderLayout title="Basic Details Page">
        <Card bordered={false}>
          <DescriptionList
            size="large"
            title="refund request"
            style={{ marginBottom: 32 }}
          >
            <Description term="Bill of Lading Number">1000000000</Description>
            <Description term="Status"> Acquired </Description>
            <Description term="Sales Order Number"> 1234123421 </Description>
            <Description term="child order"> 3214321432 </Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList
            size="large"
            title="User Information"
            style={{ marginBottom: 32 }}
          >
            <Description term="user name"> pay small </Description>
            <Description term="Contact Number"> 18100000000 </Description>
            <Description term="common courier"> rookie storage </Description>
            <Description term="pick up address">
                West Lake District, Hangzhou, Zhejiang Wan Tong Road on the 18th
            </Description>
            <Description term="Comments"> None </Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}> returned goods </div>
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            loading={loading}
            dataSource={goodsData}
            columns={goodsColumns}
            rowKey="id"
          />
          <div className={styles.title}> Return Progress </div>
          <Table
            style={{ marginBottom: 16 }}
            pagination={false}
            loading={loading}
            dataSource={basicProgress}
            columns={progressColumns}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}
