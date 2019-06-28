import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { userSelector } from '../../selectors/auth';

const mapStateToProps = state => ({
  user: userSelector(state),
});

export default function authorized(Wrapped) {
  class AuthContainer extends Component {
    static propTypes = {
      user: PropTypes.shape({}),
      navigation: PropTypes.shape({}).isRequired,
    };

    static defaultProps = {
      user: null,
    };

    static router = Wrapped.router;

    componentDidUpdate() {
      const { user, navigation } = this.props;
      if (!user) {
        navigation.navigate('Splash');
      }
    }

    render() {
      return <Wrapped {...this.props} />;
    }
  }
  return connect(mapStateToProps)(AuthContainer);
}
