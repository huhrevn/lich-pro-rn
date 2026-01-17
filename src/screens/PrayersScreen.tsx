import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

const prayers = [
    { id: '1', title: 'Kinh Phật Giáo', content: 'Nam mô A Di Đà Phật...' },
    { id: '2', title: 'Kinh Thiên Chúa Giáo', content: 'Lạy Cha chúng con ở trên trời...' },
    { id: '3', title: 'Lời cầu nguyện', content: 'Xin ban phước lành...' },
];

const PrayersScreen = () => {
    const [selectedPrayer, setSelectedPrayer] = useState<string | null>(null);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Kinh cầu</Text>
            </View>

            <ScrollView style={styles.content}>
                {prayers.map((prayer) => (
                    <TouchableOpacity
                        key={prayer.id}
                        style={styles.prayerCard}
                        onPress={() => setSelectedPrayer(selectedPrayer === prayer.id ? null : prayer.id)}
                    >
                        <Text style={styles.prayerTitle}>🙏 {prayer.title}</Text>
                        {selectedPrayer === prayer.id && (
                            <Text style={styles.prayerContent}>{prayer.content}</Text>
                        )}
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
    prayerCard: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    prayerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1D1A',
    },
    prayerContent: {
        fontSize: 16,
        color: '#5F6368',
        marginTop: 12,
        lineHeight: 24,
    },
});

export default PrayersScreen;
