import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { Context as AuthContext } from '../context/AuthContext'
import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'

const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <AuthForm
        headerText='Sign In'
        errorMessage={state.errorMessage}
        onSubmit={signin}
      />
      <NavLink
        text='Dont have an account? Sign up instead'
        routeName='Signup'
      />
    </View>
  )
}

SigninScreen.navigationOptions = {
  headerShown: false
}

export default SigninScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 150
  },
  link: {
    color: 'blue'
  }
})
