import React from 'react';
import Card from './card.js';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView,
  FlatList,
  StyleSheet,
  Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

const equalWidth =  (width / 2 ) 

export default class Container extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      resultsList: [],
      isMore: true,
      searchQuery: '',
      shouldDisplay: false
    }
    this.query = '';
    this.page = 1;
  }

  fetchData = (query, page) => {
    return new Promise((resolve, reject) => {
      var client = '90384-754ed-8aaec-9ded2-e8f47-4bca2';
      var secret = '9b549-fcf99-2e1db-9cf72-f4e98-40467';
      var authorization = 'Basic ' + window.btoa(client + ':' + secret);
      var final = [];
      return fetch(`https://api.shutterstock.com/v2/images/search?query=${query}&page=${page}`, {  
        method: 'GET',
        headers: {
          Authorization: authorization
        },
      }).then(function(response){ 
         return response.json();   
      })
      .then(function(data){ 
         data['data'].map((item, key) => {
            final.push(item['assets']['preview']['url']);
          })
        // console.log('sent to newResults = ', final);

        resolve(final);
      });
    })
    
  }

  _keyExtractor = (item, index) => index;


  renderRowItem = (itemData, index) => {
    return (
        <Image style={{ height: 150,  width : equalWidth}} source={{uri: itemData['item']}} resizeMode='cover' key={index}/>
    )
  }

  loadMore = () => {
    this.setState({
      shouldDisplay: true
    })
    // console.log('here in load more');
    var array = this.state.resultsList;
    this.page++;
    var newResults;
    var that = this;

    this.fetchData(this.query, this.page).then(function(response){
      newResults = response;
      // console.log('received in newResults = ', newResults);

      
      newResults.map(function(item, i){
        array.push(item);
      })    

      that.setState({
        resultsList: array,
        shouldDisplay: false
      })
    })

    
    // this.setState({
    //   resultsList: array
    // })

    // console.log('gashjdagdjasdkjahdkadadsadasdaddsadasdasdasda');
  }

  buttonClicked = () => {
    this.setState({
      resultsList: [],
      shouldDisplay: true
    })
    this.query = this.state.searchQuery;
    // console.log('hmmm', this.query);
    var that = this;
    this.page = 1;
    this.fetchData(this.query, this.page).then(function(response){
      var newResults = response;
      // console.log('newResults', newResults);
      // console.log('setState newResults', that.state.resultsList);
      that.setState({
        resultsList: newResults,
        shouldDisplay: false
      })
    })
  }

  componentDidMount(){
    // this.getMoviesFromApiAsync(1);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <TextInput 
            style={styles.input}
            placeholder="Search for image"
            onChangeText={(text) => this.setState({searchQuery:text})}
            underlineColorAndroid= 'transparent'
          />      
          <TouchableOpacity style={styles.buttonContainer} onPress={this.buttonClicked}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
          {
            this.state.resultsList && 
            <FlatList
              numColumns={2}
              data={this.state.resultsList}
              keyExtractor={this._keyExtractor}
              renderItem={this.renderRowItem}
              onEndReached={this.loadMore}
            />
          }
          {this.state.shouldDisplay && <ActivityIndicator size="large" color="#0000ff" />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
  },

   buttonContainer: {
    backgroundColor: '#5c6ac4',
    paddingVertical: 15
  }, 

  buttonText: {
    textAlign: 'center',
    color: 'rgb(255,255,255)'
  },

  input: {
    height: 50,
    paddingHorizontal: 5,
    borderWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    borderColor: '#AFB0BD',
    marginBottom: 5,
    backgroundColor: '#fff'
  },
  formContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: 'stretch'
  },

});
