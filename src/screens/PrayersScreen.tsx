import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';

const prayers = [
    {
        title: 'Kinh Phật Đản Sinh',
        content: 'Nam mô Bổn sư Thích ca Mâu ni Phật...',
    },
    {
        title: 'Lời nguyện sáng',
        content: 'Xin cho con được bình an trong ngày mới...',
    },
    {
        title: 'Lời cảm ơn',
        content: 'Con xin tri ân những điều tốt đẹp...',
    },
    {
        title: 'Cầu an cho gia đình',
        content: 'Xin cho gia đình luôn sum vầy hạnh phúc...',
    },
];

const PrayersScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Lời Nguyện</Text>
                <Text style={styles.subtitle}>Các lời cầu nguyện & kinh văn</Text>
            </View>

            <ScrollView>
                {prayers.map((prayer, index) => (
                    <TouchableOpacity key={index} style={styles.card}>
                        <Text style={styles.prayerTitle}>{prayer.title}</Text>
                        <Text style={styles.prayerContent}>{prayer.content}</Text>
                    </TouchableOpacity>
                ))}
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
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    subtitle: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 4,
    },
    card: {
        backgroundColor: 'white',
        margin: 16,
        marginTop: 8,
        padding: 16,
        borderRadius: 12,
    },
    prayerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 12,
    },
    prayerContent: {
        fontSize: 16,
        color: '#4b5563',
        lineHeight: 24,
    },
});

export default PrayersScreen;
