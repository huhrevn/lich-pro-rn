import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { useEvents } from '../contexts/EventContext';
import lunisolar from 'lunisolar';

const CalendarScreen = () => {
    const { events } = useEvents();
    const [currentDate, setCurrentDate] = useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const getDayEvents = (day: number) => {
        const date = new Date(year, month, day);
        return events.filter(event => {
            const eventDate = new Date(event.start?.dateTime || event.start?.date);
            return eventDate.toDateString() === date.toDateString();
        });
    };

    const renderCalendarGrid = () => {
        const days = [];
        const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

        // Week day headers
        weekDays.forEach(day => {
            days.push(
                <View key={`header-${day}`} style={styles.dayHeader}>
                    <Text style={styles.dayHeaderText}>{day}</Text>
                </View>
            );
        });

        // Empty cells before first day
        for (let i = 0; i < startDay; i++) {
            days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
        }

        // Days of month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const lunar = lunisolar(date);
            const dayEvents = getDayEvents(day);
            const isToday = date.toDateString() === new Date().toDateString();

            days.push(
                <TouchableOpacity
                    key={`day-${day}`}
                    style={[styles.dayCell, isToday && styles.todayCell]}>
                    <Text style={[styles.solarDate, isToday && styles.todayText]}>
                        {day}
                    </Text>
                    <Text style={styles.lunarDate}>
                        {lunar.lunar.day}/{lunar.lunar.month}
                    </Text>
                    {dayEvents.length > 0 && (
                        <View style={styles.eventDots}>
                            {dayEvents.slice(0, 3).map((_, idx) => (
                                <View key={idx} style={styles.eventDot} />
                            ))}
                        </View>
                    )}
                </TouchableOpacity>
            );
        }

        return days;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={prevMonth} style={styles.navButton}>
                    <Text style={styles.navButtonText}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.monthTitle}>
                    Tháng {month + 1}, {year}
                </Text>
                <TouchableOpacity onPress={nextMonth} style={styles.navButton}>
                    <Text style={styles.navButtonText}>›</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.calendar}>{renderCalendarGrid()}</View>

            <ScrollView style={styles.eventsList}>
                <Text style={styles.eventsTitle}>Sự kiện tháng này</Text>
                {events
                    .filter(event => {
                        const eventDate = new Date(event.start?.dateTime || event.start?.date);
                        return (
                            eventDate.getMonth() === month && eventDate.getFullYear() === year
                        );
                    })
                    .sort(
                        (a, b) =>
                            new Date(a.start?.dateTime || a.start?.date).getTime() -
                            new Date(b.start?.dateTime || b.start?.date).getTime()
                    )
                    .map((event, index) => {
                        const eventDate = new Date(event.start?.dateTime || event.start?.date);
                        return (
                            <View key={event.id || index} style={styles.eventItem}>
                                <View
                                    style={[
                                        styles.eventDotLarge,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
    },
    navButton: {
        padding: 8,
    },
    navButtonText: {
        fontSize: 32,
        color: '#3b82f6',
        fontWeight: 'bold',
    },
    monthTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    calendar: {
        backgroundColor: 'white',
        padding: 8,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dayHeader: {
        width: '14.28%',
        padding: 8,
        alignItems: 'center',
    },
    dayHeaderText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6b7280',
    },
    dayCell: {
        width: '14.28%',
        aspectRatio: 1,
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#f3f4f6',
    },
    todayCell: {
        backgroundColor: '#eff6ff',
        borderColor: '#3b82f6',
    },
    solarDate: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
    },
    todayText: {
        color: '#3b82f6',
    },
    lunarDate: {
        fontSize: 10,
        color: '#9ca3af',
    },
    eventDots: {
        flexDirection: 'row',
        marginTop: 2,
    },
    eventDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#10b981',
        marginHorizontal: 1,
    },
    eventsList: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 8,
        padding: 16,
    },
    eventsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 16,
    },
    eventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    eventDotLarge: {
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

export default CalendarScreen;
