import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Member from './Member';
import { Container, Row, Col } from 'reactstrap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch('/data/giin.json').then((response) => {
      return response.json();
    }).then((json) => {
      this.setState({giins: json});
    });
  }

  wrapComponent(OriginComponent) {
    return (props) => {
      return <OriginComponent {...props} giins={this.state.giins} />;
    };
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Container>
            <Row>
              <Col>
                <Route exact path="/" component={this.wrapComponent(Home)}/>
                <Route path ="/members/:name" component={this.wrapComponent(Member)} />
              </Col>
            </Row>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
