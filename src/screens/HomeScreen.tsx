import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    RefreshControl,
    Image,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useEvents } from '../contexts/EventContext';
import lunisolar from 'lunisolar';

const HomeScreen = () => {
    const { user, login } = useAuth();
    const { events, refreshEvents, loading } = useEvents();
    const [currentTime, setCurrentTime] = React.useState(new Date());

    React.useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const lunar = lunisolar(currentTime);
    const todayEvents = events.filter(event => {
        const eventDate = new Date(event.start?.dateTime || event.start?.date);
        return eventDate.toDateString() === currentTime.toDateString();
    });

    if (!user) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loginContainer}>
                    <Text style={styles.title}>LỊCH PRO</Text>
                    <Text style={styles.subtitle}>Lịch Âm Dương & Sự kiện</Text>
                    <TouchableOpacity style={styles.loginButton} onPress={login}>
                        <Text style={styles.loginButtonText}>Đăng nhập Google</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={refreshEvents} />
                }>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Xin chào, {user.name}</Text>
                        <Text style={styles.dateText}>
                            {currentTime.toLocaleDateString('vi-VN', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </Text>
                    </View>
                    <Image source={{ uri: user.avatar }} style={styles.avatar} />
                </View>

                {/* Time */}
                <View style={styles.timeCard}>
                    <Text style={styles.timeText}>
                        {currentTime.toLocaleTimeString('vi-VN', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                        })}
                    </Text>
                </View>

                {/* Lunar Calendar */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Âm Lịch</Text>
                    <View style={styles.lunarInfo}>
                        <Text style={styles.lunarDate}>
                            Ngày {lunar.lunar.day}/{lunar.lunar.month}
                        </Text>
                        <Text style={styles.lunarYear}>Năm {lunar.lunar.year}</Text>
                        {/* @ts-ignore */}
                        <Text style={styles.canChi}>
                            {lunar.char8?.year} - {lunar.char8?.month} - {lunar.char8?.day}
                        </Text>
                    </View>
                </View>

                {/* Today's Events */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Sự kiện hôm nay ({todayEvents.length})</Text>
                    {todayEvents.length === 0 ? (
                        <Text style={styles.noEvents}>Không có sự kiện</Text>
                    ) : (
                        todayEvents.map((event, index) => (
                            <View key={event.id || index} style={styles.eventItem}>
                                <View
                                    style={[
                                        styles.eventDot,
                                        { backgroundColor: event.backgroundColor || '#10b981' },
                                    ]}
                                />
                                <View style={styles.eventContent}>
                                    <Text style={styles.eventTitle}>{event.summary}</Text>
                                    {event.start?.dateTime && (
                                        <Text style={styles.eventTime}>
                                            {new Date(event.start.dateTime).toLocaleTimeString('vi-VN', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        ))
                    )}
                </View>

                {/* Upcoming Events */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Sự kiện sắp tới</Text>
                    {events
                        .filter(e => {
                            const eventDate = new Date(e.start?.dateTime || e.start?.date);
                            return eventDate > currentTime;
                        })
                        .slice(0, 5)
                        .map((event, index) => {
                            const eventDate = new Date(event.start?.dateTime || event.start?.date);
                            return (
                                <View key={event.id || index} style={styles.eventItem}>
                                    <View
                                        style={[
                                            styles.eventDot,
                                            { backgroundColor: event.backgroundColor || '#10b981' },
                                        ]}
                                    />
                                    <View style={styles.eventContent}>
                                        <Text style={styles.eventTitle}>{event.summary}</Text>
                                        <Text style={styles.eventTime}>
                                            {eventDate.toLocaleDateString('vi-VN')}
                                            {event.start?.dateTime &&
                                                ' - ' +
                                                eventDate.toLocaleTimeString('vi-VN', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                        </Text>
                                    </View>
                                </View>
                            );
                        })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6b7280',
        marginBottom: 40,
    },
    loginButton: {
        backgroundColor: '#3b82f6',
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 12,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    dateText: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 4,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    timeCard: {
        backgroundColor: '#3b82f6',
        margin: 16,
        padding: 24,
        borderRadius: 16,
        alignItems: 'center',
    },
    timeText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'white',
    },
    card: {
        backgroundColor: 'white',
        margin: 16,
        marginTop: 0,
        padding: 16,
        borderRadius: 12,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 16,
    },
    lunarInfo: {
        alignItems: 'center',
    },
    lunarDate: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#3b82f6',
    },
    lunarYear: {
        fontSize: 18,
        color: '#6b7280',
        marginTop: 8,
    },
    canChi: {
        fontSize: 14,
        color: '#9ca3af',
        marginTop: 4,
    },
    noEvents: {
        color: '#9ca3af',
        fontStyle: 'italic',
        textAlign: 'center',
        paddingVertical: 16,
    },
    eventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    eventDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 12,
    },
    eventContent: {
        flex: 1,
    },
    eventTitle: {
        fontSize: 15,
        color: '#1f2937',
        fontWeight: '500',
    },
    eventTime: {
        fontSize: 13,
        color: '#6b7280',
        marginTop: 2,
    },
});

export default HomeScreen;
