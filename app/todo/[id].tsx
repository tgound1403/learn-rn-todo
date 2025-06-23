import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const TodoDetail = () => {
  const {id} = useLocalSearchParams()

  return (
    <SafeAreaView>
      <Text>TodoDetail: {id}</Text>
    </SafeAreaView>
  )
}

export default TodoDetail

const styles = StyleSheet.create({})