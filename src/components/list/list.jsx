import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {withObservables} from '@nozbe/watermelondb/react';
import {observeProducts} from '../../model/helperbook';

const List = ({books}) => {
  return (
    <FlatList
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
      }}
      data={books}
      renderItem={({item}) => {
        return (
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flex: 1,
              flexDirection: 'row',
              borderBottomWidth: 2,
              borderColor: 'blue',
              width: '100%',
              justifyContent: 'space-evenly',
              margin: 10,
              alignItems: 'center',
              padding: 10,
            }}>
            <Text>{`${item.idBook} - ${item.title}`}</Text>
          </View>
        );
      }}
    />
  );
};

const enhanceWithWeights = withObservables([], () => ({
  books: observeProducts(),
}));

export const ListBook = enhanceWithWeights(List);
