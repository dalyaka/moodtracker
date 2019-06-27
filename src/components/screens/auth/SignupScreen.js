import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  View,
  Text,
  SafeAreaView,
  Button,
  KeyboardAvoidingView,
} from 'react-native';

import { signupUser } from '../../../sagas/authSagas';
import { signupStateSelector } from '../../../selectors/ui';
import { userSelector } from '../../../selectors/auth';

import { RequestStates } from '../../../common/requestState';

import { Container, Input } from './styles';

const mapStateToProps = state => ({
  submitState: signupStateSelector(state),
  user: userSelector(state),
});

class Signup extends Component {
  static propTypes = {
    submitState: PropTypes.shape({}).isRequired,
    signupUser: PropTypes.func.isRequired,
    user: PropTypes.shape({}),
    navigation: PropTypes.shape({}).isRequired,
  };

  state = {
    login: '',
    password: '',
    name: '',
    error: null,
  };

  componentDidUpdate({ user: prevUser }) {
    const { user, navigation } = this.props;
    if (user && prevUser !== user) {
      navigation.navigate('Main');
    }
  }

  handleChangeLogin = login => {
    this.setState({ login });
  };

  handleChangePassword = password => {
    this.setState({ password });
  };

  handleChangeName = name => {
    this.setState({ name });
  };

  handleError = ({ error }) => {
    this.setState({ error });
  };

  handleSignupClick = () => {
    const { login, password, name } = this.state;
    this.props.signupUser({ login, password, name });
  };

  render() {
    const { submitState } = this.props;
    const { login, password, name, error } = this.state;
    const loading = submitState.state === RequestStates.Fetching;
    return (
      <KeyboardAvoidingView>
        <SafeAreaView>
          <Container>
            <Input
              placeholder="Имя"
              autoCorrect={false}
              autoCapitalize="none"
              autoComplete="none"
              onChangeText={this.handleChangeName}
              value={name}
            />
            <Input
              placeholder="Никнейм"
              autoCorrect={false}
              autoCapitalize="none"
              autoComplete="email"
              onChangeText={this.handleChangeLogin}
              value={login}
            />
            <Input
              placeholder="Пароль"
              secureTextEntry
              onChangeText={this.handleChangePassword}
              value={password}
            />
            <View>{error && <Text>{error}</Text>}</View>
            <Button
              disabled={loading}
              onPress={this.handleSignupClick}
              title={loading ? 'Зарегестироваться...' : 'Зарегестироваться'}
            />
          </Container>
          {/* <SubmitStateEffect
          submitState={submitState}
          onFailed={this.handleError}
        /> */}
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(
  mapStateToProps,
  { signupUser }
)(Signup);
