import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SafeAreaView, View, Button } from 'react-native';

import { logoutUser } from '../../sagas/authSagas';

class User extends Component {
  render() {
    return (
      <SafeAreaView>
        <View>
          <Button onPress={this.props.logoutUser} title="logoutUser" />
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(
  undefined,
  { logoutUser }
)(User);
