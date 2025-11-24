import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const home = () => { 

  return (
    <View className='items-center justify-center h-full w-full mt-5'>
      <Link href={"/"}>
        <Text>Index</Text>
      </Link>

    </View>
  )
}

export default home

const styles = StyleSheet.create({})