import React, {
  Component,
} from 'react';

import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

const style = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
  }
});

export const MenuContainer = (attr) => {
  if (!attr.hasOwnProperty('items')) {
    throw new Error('No Items Defined')
  }

  return (
    <View style={style.container}>
      {attr.items.map((obj, i) => {
        // console.log(obj);
        return <MenuItems id={i}/>;
      })}
    </View>
  );
}

export const MenuItems = () => {
  return (
    <Text style={{ color: 'black'}}>
      Hi Fff
    </Text>
  );
}
