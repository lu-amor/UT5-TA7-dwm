import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function App() {
  const [movie, setMovie] = useState(null);
  const [search, setSearch] = useState("");

  async function fetchMovie(title) {
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=b95e7798&t=${title}`, { method: "GET" });
      const data = await response.json();
      if (data && data.Response !== "False") {
        setMovie(data);
      } else {
        alert("Movie not found");
        setMovie(null);
      }
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  }

  const handleSearch = () => {
    Keyboard.dismiss();
    if (search && search.trim() !== '') {
      fetchMovie(search);
      setSearch("");
    } else {
      alert('The movie title cannot be empty');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : 0}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.movieTitle}>{movie ? movie.Title : "Search for a movie"}</Text>
        {movie && movie.Poster ? (
          <Image source={{ uri: movie.Poster }} style={styles.moviePoster} resizeMode="contain" />
        ) : null}
        <Text style={styles.moviePlot}>{movie ? movie.Plot : ""}</Text>
      </ScrollView>

      <View style={styles.searchWrapper}>
        <TextInput 
          style={styles.input} 
          placeholder={'Search for a movie'} 
          value={search} 
          onChangeText={text => setSearch(text)}
        />
        <TouchableOpacity onPress={handleSearch}>
          <View style={styles.buttonWrapper}>
            <Text style={styles.buttonText}>⌕</Text>
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f3',
  },
  contentContainer: {
    flexGrow: 1,
  },
  movieTitle: {
    marginTop: 70,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#a4133c',
  },
  moviePoster: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.6,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#a4133c',
  },
  moviePlot: {
    fontSize: 16,
    margin: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
    fontWeight: '500',
    color: '#a4133c',
  },
  searchWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  input: {
    paddingVertical: 15,
    width: 275,
    paddingLeft: 15,
    backgroundColor: '#ffa5ab',
    borderRadius: 60,
    borderColor: '#a53860',
    borderWidth: 2,
    color: '#450920',
  },
  buttonWrapper: {
    width: 55,
    height: 55,
    backgroundColor: '#ffa5ab',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#a53860',
    borderWidth: 2,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 44,
    color: '#a53860',
  },
});