import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

export default class TrakedItemModel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <TouchableOpacity style={styles.container}
            onPress={this.props.onPress}>
            <View>
                <Icon name='add-circle'
                    color='#00aced'
                    size={60} />
            </View>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    container: { 
        top: 520, 
        right: 25, 
        alignItems: 'flex-end', 
        position: 'absolute' 
    }
});
