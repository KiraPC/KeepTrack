import { View } from 'react-native';
import Modal from 'react-native-modal';
import React, { Component } from 'react';

import NewItemButton from './NewItemButton';
import NewItemForm from './NewItemForm';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalVisible: false
        }
    }

    _hideModal() {
        this.setState({
            isModalVisible: false
        });
    }

    _showModal() {
        this.setState({
            isModalVisible: true
        });
    }

    render() {
        return (
            <View>
                <NewItemButton
                    onPress={this._showModal.bind(this)}
                />
                <Modal
                    isVisible={this.state.isModalVisible}>
                    <NewItemForm
                        onItemCreated={this.props.onItemCreated}
                        hideModal={this._hideModal.bind(this)}
                    />
                </Modal>
            </View>
        );
    }
};