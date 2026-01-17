import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from 'react-native';

const GreetingsScreen = () => {
    const greetings = [
        { occasion: 'Sinh nhật', message: 'Chúc mừng sinh nhật! 🎂' },
        { occasion: 'Tết Nguyên Đán', message: 'Chúc mừng năm mới! 🎊' },
        { occasion: 'Giáng sinh', message: 'Merry Christmas! 🎄' },
        { occasion: 'Tết Trung thu', message: 'Chúc mừng Tết Trung thu! 🥮' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Lời chúc</Text>
            </View>

            <ScrollView style={styles.content}>
                {greetings.map((greeting, index) => (
                    <View key={index} style={styles.greetingCard}>
                        <Text style={styles.occasion}>{greeting.occasion}</Text>
                        <Text style={styles.message}>{greeting.message}</Text>
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
    greetingCard: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    occasion: {
        fontSize: 16,
        fontWeight: '600',
        color: '#5F6368',
        marginBottom: 8,
    },
    message: {
        fontSize: 20,
        color: '#1A1D1A',
        lineHeight: 28,
    },
});

export default GreetingsScreen;
