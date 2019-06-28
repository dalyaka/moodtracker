import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SafeAreaView, Button, KeyboardAvoidingView } from 'react-native';

import { signupUser } from '../../../sagas/authSagas';
import { signupStateSelector } from '../../../selectors/ui';
import { userSelector } from '../../../selectors/auth';

import { RequestStates } from '../../../common/requestState';

import { Container, Input } from './styles';

const mapStateToProps = state => ({
  submitState: signupStateSelector(state),
  user: userSelector(state),
});

function Signup({ submitState, signupUser, user, navigation }) {
  useEffect(() => {
    if (user) navigation.navigate('Main');
  }, user);

  function singupClick() {
    if (submitState.state !== RequestStates.Fetching) {
      signupUser({ login, password });
    }
  }

  const [login, changeLogin] = useState('');
  const [password, changePassword] = useState('');

  const loading = submitState.state === RequestStates.Fetching;
  return (
    <KeyboardAvoidingView>
      <SafeAreaView>
        <Container>
          <Input
            placeholder="Email"
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
            onPress={singupClick}
            title={loading ? 'Зарегестироваться...' : 'Зарегестироваться'}
          />
        </Container>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

Signup.propTypes = {
  submitState: PropTypes.shape({}).isRequired,
  signupUser: PropTypes.func.isRequired,
  user: PropTypes.shape({}),
  navigation: PropTypes.shape({}).isRequired,
};

export default connect(
  mapStateToProps,
  { signupUser }
)(Signup);
