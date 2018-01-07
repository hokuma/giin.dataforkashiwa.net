import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Home.css';

const GROUPS = [
  {
    label: "柏清風",
    items: [
      "阿比留義顯",
      "石井昭一",
      "後藤浩一郎",
      "佐藤勝次郎",
      "助川忠弘",
      "円谷憲人",
      "日暮栄治",
      "古川隆史",
      "山内弘一",
      "山田一一",
      "山中一男"
    ],
  },
  {
    label: "公明党",
    items: [
      '小泉文子',
      '小松幸子',
      '田中晋',
      '塚本竜太郎',
      '中島俊',
      '橋口幸生',
      '林伸司'
    ]
  },
  {
    label: '日本共産党',
    items: [
      '日下みや子',
      '平野光一',
      '武藤美津江',
      '矢澤英雄',
      '渡部和子'
    ]
  },
  {
    label: '柏愛倶楽部',
    items: [
      '岡田智佳',
      '永野正敏',
      '山下洋輔',
      '吉田進'
    ]
  },
  {
    label: '市民サイド・ネット',
    items: [
      '林紗絵子',
      '松本寛道',
      '宮田清子'
    ]
  },
  {
    label: '護憲市民会議',
    items: [
      '末永康文',
      '本池奈美枝'
    ]
  },
  {
    label: '無所属',
    items: [
      '内田博紀',
      '上橋泉',
      '北村和之',
      '高松健太郎'
    ]
  }
];

class Home extends Component {
  renderItems(items) {
    let subItems = [];
    let renderedItems = [];
    items.forEach((item, index) => {
      const linkProps = {
        pathname: '/members/' + item
      };
      subItems.push(<Col key={index} xs="2"><Link to={linkProps}>{item}</Link></Col>);
      if(subItems.length === 6) {
        renderedItems.push(<Row key={renderedItems.length}>{subItems}</Row>);
        subItems = [];
      }
    });
    if(subItems.length !== 0) {
      renderedItems.push(<Row key={renderedItems.length}>{subItems}</Row>);
    }
    return renderedItems;
  }

  renderList() {
    return GROUPS.map((group, i) => {
      return (
        <div className='party' key={i}>
          <h6>{group.label}</h6>
          {this.renderItems(group.items)}
        </div>
      );
    });
  }

  render() {
    return (
      <div className='Home'>
        <Row>
          <Col>
            <p>
              柏市議会、市議会議員の特徴を様々な視点で可視化します。<br/>
              可視化のための解析には<a href='https://github.com/hokuma/kashiwa-gijiroku-analyzer' target='_blank' rel='noopener noreferrer'>こちら</a>で公開しているスクリプトを利用しています。<br/>
            </p>
          </Col>
        </Row>
        {this.renderList()}
      </div>
    );
  }
}

export default Home;
