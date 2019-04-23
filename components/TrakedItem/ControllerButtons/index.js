import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Icon } from 'react-native-elements'
import * as Progress from 'react-native-progress';

export default class ControllerButtons extends Component {
    constructor(props) {
        super(props);
        this.total = this.props.total;

        this.state = {
            current: this.props.current || 0,
            progress: (this.props.current / this.total)
        }
    }

    sum(state) {
        const current = state.current + 1;
        this.props.updateItem(current);
        return {
            current,
            progress: current / this.total
        };
    }

    subtraction(state) {
        const current = state.current - 1;
        this.props.updateItem(current);
        return {
            current,
            progress: current / this.total
        };
    }

    _onPressIcon(fn) {
        this.setState(
            (prevState) => (fn(prevState))
        );
    }

    render() {
        return <View>
            <View style={styles.container}>
                <Icon
                    name='remove-circle'
                    color='#FF6600'
                    underlayColor='#FFCC66'
                    onPress={() => { this._onPressIcon(this.subtraction.bind(this)) }}
                />
                <Text style={styles.content}>
                    {this.state.current} of {this.total}
                </Text>
                <Icon
                    name='add-circle'
                    color='#FF6600'
                    underlayColor='#FFCC66'
                    onPress={() => { this._onPressIcon(this.sum.bind(this)) }}
                />
            </View>
            <Progress.Bar style={styles.bar}
                progress={this.state.progress || 0}
                color='#FF6600'
                width={350} 
                height={10} />
        </View>
    }
}

const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row',
        marginTop: 10,
        alignSelf: 'center'
    },
    content: {
        marginRight: 10,
        marginLeft: 10,
        top: 3
    },
    bar: {
        marginTop: 10,
        marginBottom: 10
    }
});
