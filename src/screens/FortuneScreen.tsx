import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

const FortuneScreen = () => {
    const fortunes = [
        { title: 'Tử vi', icon: '⭐', description: 'Xem tử vi hàng ngày' },
        { title: 'Bói bài Tarot', icon: '🃏', description: 'Rút bài Tarot' },
        { title: 'Quẻ Kinh Dịch', icon: '☯️', description: 'Xem quẻ Kinh Dịch' },
        { title: 'Xem ngày tốt xấu', icon: '📅', description: 'Chọn ngày làm việc' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Xem bói</Text>
            </View>

            <ScrollView style={styles.content}>
                {fortunes.map((fortune, index) => (
                    <TouchableOpacity key={index} style={styles.fortuneCard}>
                        <Text style={styles.icon}>{fortune.icon}</Text>
                        <View style={styles.info}>
                            <Text style={styles.fortuneTitle}>{fortune.title}</Text>
                            <Text style={styles.description}>{fortune.description}</Text>
                        </View>
                    </TouchableOpacity>
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
    fortuneCard: {
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
    icon: {
        fontSize: 40,
        marginRight: 16,
    },
    info: {
        flex: 1,
    },
    fortuneTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1D1A',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#5F6368',
    },
});

export default FortuneScreen;
