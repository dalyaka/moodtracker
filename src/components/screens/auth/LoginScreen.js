import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { SafeAreaView, Button, KeyboardAvoidingView } from 'react-native';

import { loginUser } from '../../../sagas/authSagas';
import { loginStateSelector } from '../../../selectors/ui';
import { userSelector } from '../../../selectors/auth';

import { RequestStates } from '../../../common/requestState';

import { Container, Input } from './styles';

export default function Login({ navigation }) {
  const dispatch = useDispatch();

  const submitState = useSelector(loginStateSelector);
  const user = useSelector(userSelector);

  const [login, changeLogin] = useState('');
  const [password, changePassword] = useState('');

  const loginClick = useCallback(() => {
    if (submitState.state !== RequestStates.Fetching) {
      dispatch(loginUser(login, password));
    }
  }, [login, password]);

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
  navigation: PropTypes.shape({}).isRequired,
};
