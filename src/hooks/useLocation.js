import { useState, useEffect } from 'react'
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync
} from 'expo-location'

const useLocation = (shouldTrack, callback) => {
  const [err, setErr] = useState(null)

  useEffect(() => {
    let subscriber
    const startWatching = async () => {
      try {
        await requestPermissionsAsync()
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            // How often one gets data
            // each 1000ms or
            timeInterval: 1000,
            // in meters
            distanceInterval: 10
          },
          callback
        )
      } catch (err) {
        setErr(err)
      }
    }
    if (shouldTrack) {
      startWatching()
    } else {
      if (subscriber) {
        subscriber.remove()
      }
    }
    return () => {
      if (subscriber) {
        subscriber.remove()
      }
    }
  }, [shouldTrack, callback])
  return [err]
}

export default useLocation
