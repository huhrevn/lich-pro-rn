import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
} from 'react-native';

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.header}>
                    <Text style={styles.title}>Lịch Mood</Text>
                    <Text style={styles.subtitle}>Trang chủ</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>📅 Hôm nay</Text>
                    <Text style={styles.date}>17 tháng 1, 2026</Text>
                    <Text style={styles.lunarDate}>Ngày 18 tháng 12 năm Ất Tỵ</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>⏰ Giờ hoàng đạo</Text>
                    <Text style={styles.info}>Tý (23:00 - 01:00)</Text>
                    <Text style={styles.info}>Mão (05:00 - 07:00)</Text>
                    <Text style={styles.info}>Ngọ (11:00 - 13:00)</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>📝 Sự kiện hôm nay</Text>
                    <Text style={styles.info}>Chưa có sự kiện</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8FA',
    },
    scrollView: {
        flex: 1,
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
    subtitle: {
        fontSize: 16,
        color: '#FFFFFF',
        marginTop: 4,
    },
    card: {
        backgroundColor: '#FFFFFF',
        margin: 16,
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        color: '#1A1D1A',
    },
    date: {
        fontSize: 16,
        color: '#1A1D1A',
        marginBottom: 4,
    },
    lunarDate: {
        fontSize: 14,
        color: '#5F6368',
    },
    info: {
        fontSize: 14,
        color: '#5F6368',
        marginBottom: 4,
    },
});

export default HomeScreen;
