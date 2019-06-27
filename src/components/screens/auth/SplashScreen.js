import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Text } from 'react-native';

import { authStateSelector } from '../../../selectors/ui';
import { userSelector } from '../../../selectors/auth';
import { Container, Header } from './SplashScreen.styles';

const mapStateToProps = state => ({
  authState: authStateSelector(state),
  user: userSelector(state),
});

class SplashScreen extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Text>Mood</Text>
        </Header>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(SplashScreen);
