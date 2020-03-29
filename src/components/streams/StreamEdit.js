import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends Component {
  componentDidMount() {
    // Use the props that router automatically passes to rendered components (it contains the params from the routes, such as :id)
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.stream) {
      // While waiting for fetchStream
      return <div>Loading...</div>;
    }
    return (
      // "initialValues" is a special named property for redux form that will pass the initial values of our object into the form by matching field names to object key names
      // Use lodash pick to pass a new object with only the properties we want, so that "id" and "userId" don't get registered as having changed
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          initialValues={_.pick(this.props.stream, 'title', 'description')}
          onSubmit={onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const specificId = ownProps.match.params.id;
  // Add the specific stream to component props
  return { stream: state.streams[specificId] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
