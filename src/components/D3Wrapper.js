import React from 'react';
import D3Graph from './D3Graph';


class D3Wrapper extends React.Component {
  state = {
    graph: null,
    graphRef: null
  }
  
  constructor(props) {
    super(props);
    this.graphRef = React.createRef();
  }
  
  componentDidMount() {
    this.setState({ graph: new D3Graph(this.graphRef.current, this.props.data) });
  }
  
  shouldComponentUpdate(nextProps) {
    if (this.state.graph) this.state.graph.update(nextProps.data);
    return false;
  }
  
  render() {
    return <div className="graph-area" ref={this.graphRef}></div>
  }
}

export default D3Wrapper;