import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import { MyHeader } from '../components/MyHeader';
import firebase from 'firebase';
import db from '../config';

export default class RequestScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            book_name: "",
            reasonToRequest: "",
            username: firebase.auth().currentUser.email
        }
    }

    createUniqueId = () => {
        return (
            Math.random().toString(36).substring(7)
        )
    }

    addRequest = (bookName, reasonToRequest) => {
        var userID = this.state.username;
        var randomRequestID = this.createUniqueId();
        db.collection("book-requests").add({
            username: userID,
            book_name: book_name,
            reasonToRequest: reasonToRequest,
            requestID: randomRequestID
        })
        this.setState({ book_name: "", reasonToRequest: "" });
        return Alert.alert("Book request successful");
    }

    render() {
        return (
            <View style={styles.container}>
                <MyHeader title="Book Request" />
                <KeyboardAvoidingView>
                    <TextInput style={styles.input} placeholder="Enter Book Name" onChangeText={(text) => { this.setState({ book_name: text }) }} />
                    <TextInput style={styles.input} placeholder="Why do you need the book?" multiline={true} onChangeText={(text) => { this.setState({ reasonToRequest: text }) }} />
                    <TouchableOpacity style={styles.button} >
                        <Text>Request</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    input: {
        borderColor: "#000",
        borderWidth: 1.3,
        width: 130,
        height: 30,
        paddingLeft: 15,
        color: "#000"
    }
})