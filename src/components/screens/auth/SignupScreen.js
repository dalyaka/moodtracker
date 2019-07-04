import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { SafeAreaView, Button, KeyboardAvoidingView } from 'react-native';

import { signupUser } from '../../../sagas/authSagas';
import { signupStateSelector } from '../../../selectors/ui';
import { userSelector } from '../../../selectors/auth';

import { RequestStates } from '../../../common/requestState';

import { Container, Input } from './styles';

export default function Signup({ navigation }) {
  const dispatch = useDispatch();

  const submitState = useSelector(signupStateSelector);
  const user = useSelector(userSelector);

  const [login, changeLogin] = useState('');
  const [password, changePassword] = useState('');

  const singupClick = useCallback(() => {
    if (submitState.state !== RequestStates.Fetching) {
      dispatch(signupUser({ login, password }));
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
  navigation: PropTypes.shape({}).isRequired,
};
