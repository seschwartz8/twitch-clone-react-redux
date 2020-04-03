import React, { Component } from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends Component {
  constructor(props) {
    super(props);

    // Use refs to access the video from the DOM
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    const { title, description } = this.props.stream;
    return (
      <div>
        <video ref={this.videoRef} style={{ width: '100%' }} controls />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // Add the stream with given id to props
  const { id } = ownProps.match.params;
  return {
    stream: state.streams[id],
  };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
