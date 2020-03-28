import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamEdit extends Component {
  componentDidMount() {
    // Use the props that router automatically passes to rendered components (it contains the params from the routes, such as :id)
    this.props.fetchStream(this.props.match.params.id);
  }

  render() {
    return <div>StreamEdit</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  const specificId = ownProps.match.params.id;
  // Add the specific stream to component props
  return { stream: state.streams[specificId] };
};

export default connect(mapStateToProps, { fetchStream })(StreamEdit);
