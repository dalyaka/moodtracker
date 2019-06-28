import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SafeAreaView, Button, KeyboardAvoidingView } from 'react-native';

import { loginUser } from '../../../sagas/authSagas';
import { loginStateSelector } from '../../../selectors/ui';
import { userSelector } from '../../../selectors/auth';

import { RequestStates } from '../../../common/requestState';

import { Container, Input } from './styles';

const mapStateToProps = state => ({
  submitState: loginStateSelector(state),
  user: userSelector(state),
});

function Login({ submitState, loginUser, user, navigation }) {
  const [login, changeLogin] = useState('');
  const [password, changePassword] = useState('');

  function loginClick() {
    if (submitState.state !== RequestStates.Fetching) {
      loginUser(login, password);
    }
  }

  useEffect(() => {
    if (user) navigation.navigate('Main');
  }, user);

  const loading = submitState.state === RequestStates.Fetching;
  return (
    <KeyboardAvoidingView>
      <SafeAreaView>
        <Container>
          <Input
            placeholder="Логин"
            autoCorrect={false}
            autoCapitalize="none"
            autoComplete="email"
            onChangeText={value => changeLogin(value)}
            value={login}
          />
          <Input
            placeholder="Пароль"
            secureTextEntry
            onChangeText={value => changePassword(value)}
            value={password}
          />
          <Button
            disabled={loading}
            onPress={loginClick}
            title={loading ? 'Войти ...' : 'Войти'}
          />
        </Container>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

Login.propTypes = {
  submitState: PropTypes.shape({}).isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.shape({}),
  navigation: PropTypes.shape({}).isRequired,
};

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
