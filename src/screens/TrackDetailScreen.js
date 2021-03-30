import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Context as TrackContext } from '../context/TrackContext'
import MapView, {PolyLine} from 'react-native-maps'

const TrackDetailScreen = ({ navigation }) => {
  const { state } = useContext(TrackContext)
  const _id = navigation.getParam('_id')

  const track = state.find((t = t._id === _id))
  const initialCoords = track.locations[0].coords
  return (
    <>
      <Text>{track.name}</Text>
      <MapView
      initialRegion={{
        longitudeDelta: 0.01,
        latitudeDelta: 0.01,
        ...initialCoords
      }}
      style={styles.map}
      >
        <PolyLine
        coordinates={track.location.map(loc=>loc.coords)}

        />
      </MapView>
    </>
  )
}

export default TrackDetailScreen

const styles = StyleSheet.create({
  map: {
    height: 300
  }
})
