//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, AsyncStorage, FlatList, ScrollView, Touc, TouchableNativeFeedback, ActivityIndicator } from 'react-native';
import Add from './Add';
import TodoItem from '../Components/TodoItem';
import Helper from '../helper/Array';
import DateHelper from '../helper/Date';
import Modal from 'react-native-modal';
import EditModal from '../Components/EditModal';
import DateBarItem from '../Components/DateBarItem';
import _ from '../helper/Language';

// create a component
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addModalVis: false,
            editModalVis: false,
            editId: null,
            data: [],
            date: new Date(),
            loading: true
        }
    }
    componentDidMount() {
        this.updateData(true);
        this.returnCalendar();
    }
    openModal() {
        this.setState({ addModalVis: true });
    }
    closeModal() {
        this.setState({ addModalVis: false });
        this.updateData();
    }
    updateData(first = false) {
        AsyncStorage.getItem('list').then(snapshot => {
            if (snapshot === null) {
                this.setState({loading:false})
                return;
            }
            const data = JSON.parse(snapshot);
            const nowDate = DateHelper.getDate(this.state.date);
            const val = Helper.sortDate(data, nowDate);
            this.setState({ data: val, loading: false })
            if (first) {
                setTimeout(() => {
                    const x = this.state.date.getUTCDate() * 30;
                    this.scroll.scrollTo({ x, y: 1, animated: false });
                }, 500)
            }
        })
    }
    deleteTodo(id) {
        Helper.delete(this.state.data, id);
        const newData = JSON.stringify(this.state.data);
        AsyncStorage.setItem('list', newData);
        this.updateData();
    }
    changeState(id) {
        const { data } = this.state;
        const index = Helper.find(data, id);
        const oldState = Number(data[index].state);
        let newState;
        switch (oldState) {
            case 0:
                newState = 1;
                break;
            case 1:
                newState = 2;
                break;
            case 2:
                newState = 0;
                break;
        }
        data[index].state = newState;
        const asynPushData = JSON.stringify(data);
        AsyncStorage.setItem('list', asynPushData);
        this.updateData();
    }
    editTodo(id) {
        this.setState({ editId: id, editModalVis: true })
    }
    returnCalendar() {
        let array = Array();
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const lastDay = new Date(year, month + 1, 0).getUTCDate();
        for (let i = 0; i < lastDay; i++) {
            var tomorrow = new Date(year, month, 1);
            tomorrow.setDate(tomorrow.getDate() + i);
            array.push({ date: tomorrow });
        }
        this.setState({ array })
    }
    changeDate(date) {
        this.setState({ date })
        const index = date.getUTCDate();
        let x = index * 12;
        if (index > 7)
            x = index * 25;
        if (index > 13)
            x = index * 30
        if (index > 18)
            x = index * 35
        this.scroll.scrollTo({ x, y: 1, animated: true });
        this.updateData()
    }
    goHome() {
        this.setState({ date: new Date() })
        this.updateData()
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#ee7659"
                />
                <View style={styles.top}>
                    <View style={styles.currentDate}>
                        <TouchableNativeFeedback onPress={() => this.goHome()}>
                            <Text style={styles.dayNumber}>{this.state.date.getDate()}</Text>
                        </TouchableNativeFeedback>
                        <View style={styles.month}>
                            <Text style={styles.dayString}>{DateHelper.getMonthName(DateHelper.getDate(this.state.date)).split(' ')[1]}</Text>
                            <Text style={styles.dayString}>{DateHelper.getDayName(this.state.date)} 2017</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.openModal()}>
                            <Text style={styles.addItem}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.lineString}>
                        {this.state.data.length > 1 ? _('tooWork') : this.state.data.length === 1 ? _('letsDone') : _('noWork')}
                    </Text>
                    <ScrollView style={styles.calendar} horizontal={true} showsHorizontalScrollIndicator={false} ref={ref => this.scroll = ref} >
                        <FlatList
                            data={this.state.array}
                            extraData={this.state}
                            renderItem={(item) => <DateBarItem date={item} now={this.state.date} setDate={(date) => this.changeDate(date)} />}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal={true}
                        />
                    </ScrollView>
                </View>
                {this.state.loading ? <ActivityIndicator size={50} /> :
                    <ScrollView style={styles.bottom}>
                        {this.state.data.length > 0 ? <Text style={styles.h1}>{_('toDo')}</Text> :
                            <Text style={styles.nothing}>{this.state.date.getDate()} {DateHelper.getMonthName(DateHelper.getDate(this.state.date)).split(' ')[1]} {_('daysNoWork')}</Text>
                        }
                        <FlatList
                            data={this.state.data}
                            renderItem={({ item }) => <TodoItem item={item} editTodo={(id) => this.editTodo(id)} deleteTodo={(id) => this.deleteTodo(id)} changeState={(id) => this.changeState(id)} />}
                            keyExtractor={(item, index) => item.id.toString()}
                        />
                    </ScrollView>}
                <Modal
                    isVisible={this.state.addModalVis}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    avoidKeyboard={false}
                    transparent={true}
                    onBackButtonPress={() => this.setState({ addModalVis: false })}
                    onBackdropPress={() => this.setState({ addModalVis: false })}
                    onSwipe={() => this.setState({ addModalVis: false })}
                    swipeDirection="down"
                >
                    <Add closeModal={() => this.closeModal()} visible={this.state.addModalVis} />
                </Modal>
                <Modal
                    isVisible={this.state.editModalVis}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    avoidKeyboard={false}
                    transparent={true}
                    onBackButtonPress={() => this.setState({ editModalVis: false })}
                    onBackdropPress={() => this.setState({ editModalVis: false })}
                    onSwipe={() => this.setState({ editModalVis: false })}
                    swipeDirection="down"
                >
                    <EditModal updateData={() => this.updateData()} closeModal={() => this.setState({ editModalVis: false })} visible={this.state.editModalVis} id={this.state.editId} />
                </Modal>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ee7659',
    },
    top: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 10,
        marginLeft: 30,
        elevation: 2,
    },
    currentDate: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    dayNumber: {
        fontFamily: 'Effra',
        fontSize: 52,
        fontWeight: '400',
        color: 'white',
        flexGrow: 1
    },
    month: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 15,
        flexGrow: 8
    },
    dayString: {
        fontFamily: 'Effra',
        fontSize: 16,
        fontWeight: '400',
        color: '#FFFEFE'
    },
    addItem: {
        backgroundColor: 'white',
        color: '#f27455',
        fontSize: 30,
        marginTop: 15,
        marginRight: 25,
        textAlign: 'center',
        width: 48,
        height: 48,
        borderRadius: 29,
        textAlignVertical: 'center',
        elevation: 2,
    },
    lineString: {
        color: 'white',
        marginTop: 5,
        marginBottom: 15,
        fontSize: 14
    },
    calendar: {
        flexDirection: 'row',
        marginLeft: -10,
        marginBottom: 30
    },
    bottom: {
        backgroundColor: 'white',
        flex: 1
    },
    h1: {
        fontSize: 24,
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 20,
        fontWeight: '600',
        color: '#202824'
    },
    nothing: {
        fontSize: 18,
        padding: 20,
        textAlign: 'center'
    }
});

//make this component available to the app
export default Home;
