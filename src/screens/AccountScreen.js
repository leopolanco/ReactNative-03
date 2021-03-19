import React, { useContext } from 'react'
import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from 'react-native-elements'
import Spacer from '../components/Spacer'
import { Context as AuthContext } from '../context/AuthContext'

const AccountScreen = () => {
  const { signout } = useContext(AuthContext)

  return (
    <SafeAreaView forceInset={{top:'always'}}> 
      <Text>AccountScreen</Text>
      <Spacer>
        <Button title='Sign out' onPress={signout} />
      </Spacer>
    </SafeAreaView>
  )
}

export default AccountScreen

const styles = StyleSheet.create({})
