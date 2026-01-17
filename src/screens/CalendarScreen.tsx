import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
} from 'react-native';

const CalendarScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Lịch</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.placeholder}>Màn hình lịch đang được phát triển</Text>
                <Text style={styles.info}>Sẽ hiển thị lịch tháng và sự kiện</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8FA',
    },
    header: {
        padding: 20,
        backgroundColor: '#0866ff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    placeholder: {
        fontSize: 18,
        color: '#1A1D1A',
        marginBottom: 8,
    },
    info: {
        fontSize: 14,
        color: '#5F6368',
    },
});

export default CalendarScreen;
