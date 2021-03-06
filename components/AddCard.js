import React, { Component } from 'react';
import { StyleSheet, 
    Text,
    TextInput, 
    KeyboardAvoidingView, 
    TouchableOpacity } from 'react-native';
import { addCardToDeck } from '../utils/api';
import { connect } from 'react-redux';
import { addCard } from '../actions';
import {purple} from '../utils/colors';

class AddCard extends Component {
  state = {
    question: '',
    answer: '',
    errorMessage:false
  }
    
  handleSubmit = () => {
    if(this.state.question && this.state.answer){

    const { deck } = this.props.navigation.state.params
    // Save to redux store
    this.props.dispatch(addCard(
      deck, this.state
    ))
    
    // Save to DB
    addCardToDeck(deck, this.state)
    
    // Navigate back to list.
    this.props.navigation.goBack()
    
    // Clear question and answer for next card.
    this.setState(() => ({
      question: '',
      answer: ''
    })) 
    this.setState({errorMessage:false})   
  }else{
    this.setState({errorMessage:true})
  }
}
  
  handleQuestionTextChange = (textValue) => {
    this.setState(() => ({ question: textValue }))
  }

  handleAnswerTextChange = (textValue) => {
    this.setState(() => ({ answer: textValue }))
  }  
    
  render() {
    const { question, answer } = this.state
    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.container}>
        <Text style={styles.title}>What is the title of your new card?</Text>
        <TextInput
          style={styles.input}
          value={question}
          placeholder='Question'
          onChangeText={this.handleQuestionTextChange}
        />
        <TextInput
          style={styles.input}
          value={answer}
          placeholder='Answer'
          onChangeText={this.handleAnswerTextChange}
        />  
        <TouchableOpacity 
          style={styles.button}
          onPress={this.handleSubmit} >
          <Text style={styles.buttonText}>Save Card</Text>
        </TouchableOpacity>
        <Text style={styles.errorMessage}>{this.state.errorMessage===true? "You cannot create blank card" : ''} </Text>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12
  },
  title: {
  
    margin: 12,
    fontSize: 16
  },
  errorMessage: {
    marginTop:5,
    textAlign: 'center',
    fontSize: 14
  },
  button: {
    margin: 12,
    fontSize: 14,
    backgroundColor: purple,
    padding: 12,
    alignItems: 'center',
    borderRadius: 3,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2
  }, 
  buttonText: {
    color: '#FFFFFF'
  },
  input: {
    height: 44,
    padding: 12,
    margin: 12,
    borderColor: '#292477'
  }
})

export default connect()(AddCard)