import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from 'react-native';

const WorldClockScreen = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const timezones = [
        { name: 'Hà Nội', offset: 7, flag: '🇻🇳' },
        { name: 'Tokyo', offset: 9, flag: '🇯🇵' },
        { name: 'London', offset: 0, flag: '🇬🇧' },
        { name: 'New York', offset: -5, flag: '🇺🇸' },
        { name: 'Sydney', offset: 11, flag: '🇦🇺' },
    ];

    const getTimeForTimezone = (offset: number) => {
        const utc = time.getTime() + (time.getTimezoneOffset() * 60000);
        const newTime = new Date(utc + (3600000 * offset));
        return newTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Đồng hồ thế giới</Text>
            </View>

            <ScrollView style={styles.content}>
                {timezones.map((tz, index) => (
                    <View key={index} style={styles.clockCard}>
                        <Text style={styles.flag}>{tz.flag}</Text>
                        <View style={styles.info}>
                            <Text style={styles.cityName}>{tz.name}</Text>
                            <Text style={styles.time}>{getTimeForTimezone(tz.offset)}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
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
        padding: 16,
    },
    clockCard: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    flag: {
        fontSize: 32,
        marginRight: 16,
    },
    info: {
        flex: 1,
    },
    cityName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1D1A',
        marginBottom: 4,
    },
    time: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0866ff',
    },
});

export default WorldClockScreen;
