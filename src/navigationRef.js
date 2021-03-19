// Make navigation accessible to all files outside of the main app
// eg. context, api, etc
import { NavigationActions } from 'react-navigation'

let navigator

export const setNavigator = (nav) => {
  navigator = nav
}

export const navigate = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  )
}
