import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SafeAreaView, View, Text, Button } from 'react-native';

import { loginUser } from '../../../sagas/authSagas';
import { loginStateSelector } from '../../../selectors/ui';

import { RequestStates } from '../../../common/requestState';

import { Container, Input } from './styles';

const mapStateToProps = state => ({
  submitState: loginStateSelector(state),
});

class Login extends Component {
  static propTypes = {
    submitState: PropTypes.shape({}).isRequired,
    loginUser: PropTypes.func.isRequired,
  };

  state = {
    login: '',
    password: '',
    error: null,
  };

  handleChangeLogin = login => {
    this.setState({ login });
  };

  handleChangePassword = password => {
    this.setState({ password });
  };

  handleError = ({ error }) => {
    this.setState({ error });
  };

  handleLoginClick = () => {
    const { submitState } = this.props;
    const { login, password } = this.state;
    if (submitState.state !== RequestStates.Fetching) {
      this.props.loginUser(login, password);
    }
  };

  render() {
    const { submitState } = this.props;
    const { login, password, error } = this.state;
    const loading = submitState.state === RequestStates.Fetching;
    return (
      <SafeAreaView>
        <Container>
          <Input
            placeholder="Логин"
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
            onPress={this.handleLoginClick}
            title={loading ? 'Войти ...' : 'Войти'}
          />
        </Container>
      </SafeAreaView>
    );
  }
}

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
