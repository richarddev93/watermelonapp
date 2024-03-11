import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import database from './src/model';
import {ListBook} from './src/components/list/list';
import mySync from './src/services/sync';
export default function App() {
  const [data, setdata] = useState([]);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState();
  const getAllBooks = async () => {
    // const books = await database.get('books');
    const books = await database.get('books');
    // const books = await database.get('books').query().fetch();
    // const dataAux = books.map(item => item._raw);
    setdata(books);
  };
  useEffect(() => {
    getAllBooks();
  }, []);

  const CreateData = async () => {
    await database.write(async () => {
      await database
        .get('books')
        .create(post => {
          post.title = input1;
          post.idBook = parseInt(input2);
          post.body = 'Lorem ipsum...';
        })
        .then(() => cleanData())
        .catch(error => console.error(error));
    });
  };

  const cleanData = () => {
    setInput1('');
    setInput2(null);
  };

  const syncData = async () => {
    await mySync('iduser', database);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => syncData()}
        style={{
          alignItems: 'center',
          borderWidth: 2,
          borderRadius: 20,
          backgroundColor: 'blue',
          padding: 20,
          width: '25%',
          marginTop: 5,
        }}>
        <Text style={{color: 'white'}}>Sync</Text>
      </TouchableOpacity>
      <ListBook />
      <View
        style={{
          width: '100%',
          height: '20%',
          justifyContent: 'center',
          borderTopWidth: 1,
        }}>
        <TextInput
          value={input1}
          placeholder="book"
          style={{
            borderWidth: 1,
            width: '100%',
          }}
          onChangeText={setInput1}
        />
        <TextInput
          value={input2}
          placeholder="lesson"
          style={{
            borderWidth: 1,
            width: '100%',
            marginVertical: 10,
          }}
          onChangeText={setInput2}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity
        onPress={() => CreateData()}
        style={{
          alignItems: 'center',

          borderWidth: 2,
          borderRadius: 20,
          backgroundColor: 'blue',
          padding: 20,
          width: '90%',
          marginTop: 5,
        }}>
        <Text style={{color: 'white'}}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
