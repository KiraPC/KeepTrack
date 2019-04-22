import uuid from 'uuid-js';
import React, { Component } from 'react';
import GenerateForm from 'react-native-form-builder';
import { AsyncStorage, View, StyleSheet, Button } from 'react-native';

import fields from '../config/formFields.json'

export default class TrakedItemModel extends Component {
    constructor(props) {
        super(props);
    }

    _formHandle(form) {
        this.form = form;
    }

    _onBack() {
        this.props.hideModal();
    }

    async _onSubmit() {
        const values = this.form.getValues();
        const id = uuid.randomUI40().toString();
        values.id = id;

        try {
            await AsyncStorage.setItem(id, JSON.stringify(values));
            this.props.insertNewItem(values);
            this.props.hideModal();
        } catch (error) {
            console.log('_onSubmit', error);
        }
    }

    render() {
        return <View style={{ flex: 1, backgroundColor: 'white' }}>
                <GenerateForm ref={this._formHandle.bind(this)} fields={fields} />
                <View style={{ paddingHorizontal: 10, bottom: 25 }}>
                    <Button title='Submit' onPress={this._onSubmit.bind(this)} />
                </View>
                <View style={{ paddingHorizontal: 10, bottom: 20 }}>
                    <Button title='Back' onPress={this._onBack.bind(this)} />
                </View>
            </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white'
    },
    content: {
        left: 5
    }
});
