import React from 'react';
import intellisense from '../services/intellisense';
import Table from './Table';
import D3Wrapper from './D3Wrapper';
import './App.css';

class App extends React.Component {
  state = {
    data: [],
    graphData: []
  };

  componentDidMount = async () => {
    const data = await intellisense('RD:647');
    const graphData = [...data];
    this.setState({ data, graphData });
  };

  renderD3Graph() {
    return this.state.data.length ? <D3Wrapper data={this.state.graphData} /> : false;
  }

  toggleMetric = (key) => {
    const data = [...this.state.data];
    const index = data.findIndex((e) => e.key === key);
    data[index].active = !data[index].active;
    const graphData = data.filter((e) => e.active);

    this.setState({ data, graphData });
  };

  render() {
    return (
      <div className="app ui container">
        <h1 className="ui header center aligned">
          IntelliSense data visualiser
        </h1>
        <div className="ui grid">
          <div className="seven wide column">
            <Table data={this.state.data} toggleMetric={this.toggleMetric} />
          </div>
          <div className="nine wide column">{this.renderD3Graph()}</div>
        </div>
      </div>
    );
  }
}

export default App;
