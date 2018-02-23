//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import DateHelper from '../helper/Date';

// create a component
class DateBarItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            now: props.now.getUTCDate(),
            date: props.date.item.date,
        }
    }
    componentWillReceiveProps(props) {
        this.setState({ now: props.now.getUTCDate() });
    }
    isSelect() {
        if (this.state.now == this.state.date.getUTCDate()) {
            const style = { color: 'black' };
            return style;
        }
    }
    setDate() {
        this.props.setDate(this.state.date)
    }
    render() {
        return (
            <TouchableOpacity onPress={() => this.setDate()}>
                <View
                    style={styles.perDay}
                    collapsable={false}
                    ref="perDay">
                    <Text style={[styles.daySmInt, this.isSelect()]}>{this.state.date.getDate()}</Text>
                    <Text style={[styles.daySmString, this.isSelect()]}>{DateHelper.getDayName(this.state.date, false)}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    perDay: {
        width: 42,
        display: 'flex',
        flexDirection: 'column',
    },
    daySmInt: {
        color: '#C75F46',
        fontSize: 18,
        textAlign: 'center'
    },
    daySmString: {
        color: '#C75F46',
        fontSize: 14,
        textAlign: 'center'
    },
});

//make this component available to the app
export default DateBarItem;
