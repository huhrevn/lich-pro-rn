import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
} from 'react-native';

const worldClocks = [
    { city: 'Hà Nội', timezone: 'Asia/Ho_Chi_Minh', offset: 7 },
    { city: 'Tokyo', timezone: 'Asia/Tokyo', offset: 9 },
    { city: 'Seoul', timezone: 'Asia/Seoul', offset: 9 },
    { city: 'Singapore', timezone: 'Asia/Singapore', offset: 8 },
    { city: 'London', timezone: 'Europe/London', offset: 0 },
    { city: 'New York', timezone: 'America/New_York', offset: -5 },
    { city: 'Los Angeles', timezone: 'America/Los_Angeles', offset: -8 },
    { city: 'Sydney', timezone: 'Australia/Sydney', offset: 11 },
    { city: 'Paris', timezone: 'Europe/Paris', offset: 1 },
    { city: 'Berlin', timezone: 'Europe/Berlin', offset: 1 },
];

const WorldClockScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentTime] = useState(new Date());

    const getTimeForTimezone = (offset: number) => {
        const utc = currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;
        const cityTime = new Date(utc + 3600000 * offset);
        return cityTime;
    };

    const filteredClocks = worldClocks.filter(clock =>
        clock.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Giờ Thế Giới</Text>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm thành phố..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <ScrollView>
                {filteredClocks.map((clock, index) => {
                    const cityTime = getTimeForTimezone(clock.offset);
                    const isCurrentCity = clock.city === 'Hà Nội';

                    return (
                        <TouchableOpacity
                            key={index}
                            style={[styles.clockCard, isCurrentCity && styles.currentCity]}>
                            <View style={styles.clockInfo}>
                                <Text style={[styles.cityName, isCurrentCity && styles.currentCityText]}>
                                    {clock.city}
                                    {isCurrentCity && ' ★'}
                                </Text>
                                <Text style={styles.timezone}>GMT {clock.offset >= 0 ? '+' : ''}{clock.offset}</Text>
                            </View>
                            <Text style={[styles.time, isCurrentCity && styles.currentCityText]}>
                                {cityTime.toLocaleTimeString('vi-VN', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: 'white',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 16,
    },
    searchInput: {
        backgroundColor: '#f3f4f6',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    clockCard: {
        backgroundColor: 'white',
        margin: 16,
        marginTop: 8,
        padding: 16,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    currentCity: {
        backgroundColor: '#eff6ff',
        borderWidth: 2,
        borderColor: '#3b82f6',
    },
    clockInfo: {
        flex: 1,
    },
    cityName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
    },
    currentCityText: {
        color: '#3b82f6',
    },
    timezone: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 4,
    },
    time: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1f2937',
    },
});

export default WorldClockScreen;
