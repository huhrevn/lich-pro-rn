import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';

const greetings = [
    { occasion: 'Tết Nguyên Đán', template: 'Chúc mừng năm mới! Vạn sự như ý!' },
    { occasion: 'Sinh nhật', template: 'Chúc mừng sinh nhật! Tuổi mới vạn sự như ý!' },
    { occasion: 'Đám cưới', template: 'Chúc mừng hạnh phúc! Trăm năm hạnh phúc!' },
    { occasion: 'Khai trương', template: 'Chúc mừng khai trương! Vạn sự như ý!' },
    { occasion: 'Tốt nghiệp', template: 'Chúc mừng tốt nghiệp! Thành công rực rỡ!' },
    { occasion: 'Thăng chức', template: 'Chúc mừng thăng chức! Sự nghiệp thăng tiến!' },
];

const GreetingsScreen = () => {
    const handleCopy = (text: string) => {
        console.log('Copied:', text);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Lời Chúc</Text>
                <Text style={styles.subtitle}>Mẫu lời chúc cho các dịp đặc biệt</Text>
            </View>

            <ScrollView>
                {greetings.map((item, index) => (
                    <View key={index} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.occasion}>{item.occasion}</Text>
                            <TouchableOpacity
                                onPress={() => handleCopy(item.template)}
                                style={styles.copyButton}>
                                <Text style={styles.copyButtonText}>Sao chép</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.template}>{item.template}</Text>
                    </View>
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
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    occasion: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
    },
    copyButton: {
        backgroundColor: '#3b82f6',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    copyButtonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
    template: {
        fontSize: 16,
        color: '#4b5563',
        lineHeight: 24,
    },
});

export default GreetingsScreen;
