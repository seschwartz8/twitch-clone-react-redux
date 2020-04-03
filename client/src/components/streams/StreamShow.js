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
    this.buildPlayer();
  }

  componentDidUpdate() {
    // In case buildPlayer failed on mount (if stream hadn't fetched yet), build the player once the stream has been fetched
    this.buildPlayer();
  }

  componentWillUnmount() {
    // To stop the video player from continuously attempting to stream video
    this.player.destroy();
  }

  buildPlayer() {
    // If we already have a player, or the stream hasn't fetched yet
    if (this.player || !this.props.stream) {
      return;
    }
    // Flv downloads the video stream from the server and converts it to be playable in the html <video> player
    const { id } = this.props.match.params;
    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`,
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
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
