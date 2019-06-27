import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { View, Text, Button, SafeAreaView } from 'react-native';

import { authStateSelector } from '../../../selectors/ui';
import { userSelector } from '../../../selectors/auth';

import { RequestStates } from '../../../common/requestState';

import { Container } from './SplashScreen.styles';

const mapStateToProps = state => ({
  authState: authStateSelector(state),
  user: userSelector(state),
});

class SplashScreen extends Component {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
    authState: PropTypes.shape({}).isRequired,
    user: PropTypes.shape({}),
  };

  static defaultProps = {
    user: null,
  };

  static navigationOptions = () => ({
    headerTransparent: true,
    headerBackTitle: null,
  });

  componentDidMount() {
    this.tryNavigate();
  }

  componentDidUpdate() {
    this.tryNavigate();
  }

  handleSignup = () => {
    const { navigation } = this.props;
    navigation.navigate('Signup');
  };

  handleLogin = () => {
    const { navigation } = this.props;
    navigation.navigate('Login');
  };

  tryNavigate() {
    const { user, authState, navigation } = this.props;
    if (authState.state === RequestStates.Fetched && user) {
      navigation.navigate('User');
    }
  }

  render() {
    const { authState } = this.props;
    console.log(authState);

    const fetched =
      authState.state === RequestStates.FetchError ||
      authState.state === RequestStates.Fetched;

    return (
      <SafeAreaView>
        <Container>
          <View>
            <Text>Календарь настроения</Text>
          </View>
          {fetched && (
            <View>
              <Button onPress={this.handleSignup} title="Зарегестироваться" />
              <Button
                theme="secondary"
                onPress={this.handleLogin}
                title="Войти"
              />
            </View>
          )}
        </Container>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps)(SplashScreen);
