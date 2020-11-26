import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';
import { ROLE } from '../constants';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
    };
  }

  componentDidMount() {
    const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    const messages = this.state.messages.concat(defaultMessage);

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);
  }

  handleSendMessage = (chatInput) => {
    const customerMessage = {role: ROLE.CUSTOMER, text: chatInput};

    if (this.checkInputIfCanBeAutoReplied(chatInput)) {
      const answerToReply = this.getAnswerToReply(chatInput);
      const messages = this.state.messages.concat([customerMessage, answerToReply]);
      this.setState({
        shop: shopData,
        messages
      })
    } else {
      const messages = this.state.messages.concat(customerMessage);
      this.setState({
        shop: shopData,
        messages
      })
    }
  }

  getAnswerToReply = (chatInput) => {
    const answerToReply = answersData.find((answer) => answer.tags.includes(chatInput));
    return answerToReply;
  }

  checkInputIfCanBeAutoReplied = (chatInput) => {
    return answersData.some((answer) => answer.tags.includes(chatInput));
  }

  render() {
    const { shop, messages } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput handleSendMessage={this.handleSendMessage} />
      </main>
    );
  }
}

export default Chat;
