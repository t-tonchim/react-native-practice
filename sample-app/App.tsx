import React, { useState, useEffect, Suspense } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, FlatList, Linking, ActivityIndicator } from 'react-native';
import axios from 'axios'

export default function App() {
  return (
    <View style={styles.container}>
      <SearchForm />
    </View>
  );
}

const SearchForm = (props) => {
  const [keyword, setKeyword] = useState('')
  const [postKeyword, setPostKeyword] = useState('')

  return (
    <View style={styles.searchFormContainer}>
      <TextInput placeholder="検索ワード" onChangeText={setKeyword} />
      <TouchableHighlight onPress={() => { console.log(keyword); setPostKeyword(keyword) }}>
        <Text>検索</Text>
      </TouchableHighlight>
      <PostList postKeyword={postKeyword} />
    </View>
  )
}

type Post = {
  title: string,
  url: string
}

type PostProps = {
  posts: Post[]
}

const PostList = ({ postKeyword }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (postKeyword) {
      axios.get(`https://qiita.com/api/v2/items?query=${postKeyword}&page=1&per_page=10`)
        .then(res => setPosts(res.data))
    }
  }, [postKeyword])

  console.log(`title ${posts[0]?.title}`)
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) =>
        <View>
          <Text onPress={() => Linking.openURL(item.url)}>{item.title}</Text>
        </View>
      }
    />

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchFormContainer: {
    flex: 1,
    width: '100%',
    top: 200,
  },
});
