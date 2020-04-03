// Generalized reusable form for creating and editing streams

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends Component {
  renderError({ error, touched }) {
    // Destructured error and touched off the formProps meta property
    if (touched && error) {
      return (
        <div className='ui error message'>
          <div className='header'>{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    // Destructure all the built-in redux-form "input" formProps and hook them up to create controlled components

    // Only highlight input with red if the user has touched the input, rather than being red from the start until it's filled in
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete='off' />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    // POST a stream to the api server
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      // Using the built-in redux-form handleSubmit and passing it our onSubmit callback, which gets automatically passed the form's values
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className='ui form error'
      >
        <Field name='title' component={this.renderInput} label='Enter Title' />
        <Field
          name='description'
          component={this.renderInput}
          label='Enter Description'
        />
        <button className='ui primary button'>Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  // Redux-form automatically calls this whenever the form is interacted with
  const errors = {};
  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }
  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }
  // Returning an empty object tells redux-form our input is valid
  return errors;
};

export default reduxForm({
  form: 'streamForm',
  validate,
})(StreamForm);
