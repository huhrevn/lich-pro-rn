import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import lunisolar from 'lunisolar';

const ConverterScreen = () => {
    const [solarDate, setSolarDate] = useState(new Date());
    const [day, setDay] = useState(solarDate.getDate().toString());
    const [month, setMonth] = useState((solarDate.getMonth() + 1).toString());
    const [year, setYear] = useState(solarDate.getFullYear().toString());

    const convertToLunar = () => {
        try {
            const d = lunisolar(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
            return {
                day: d.lunar.day,
                month: d.lunar.month,
                year: d.lunar.year,
                yearName: d.format('YYYY年'),
            };
        } catch {
            return null;
        }
    };

    const lunarResult = convertToLunar();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Đổi lịch</Text>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>📅 Ngày dương lịch</Text>

                    <View style={styles.inputRow}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Ngày</Text>
                            <TextInput
                                style={styles.input}
                                value={day}
                                onChangeText={setDay}
                                keyboardType="number-pad"
                                maxLength={2}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Tháng</Text>
                            <TextInput
                                style={styles.input}
                                value={month}
                                onChangeText={setMonth}
                                keyboardType="number-pad"
                                maxLength={2}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Năm</Text>
                            <TextInput
                                style={styles.input}
                                value={year}
                                onChangeText={setYear}
                                keyboardType="number-pad"
                                maxLength={4}
                            />
                        </View>
                    </View>
                </View>

                {lunarResult && (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>🌙 Ngày âm lịch</Text>
                        <Text style={styles.resultText}>
                            Ngày {lunarResult.day} tháng {lunarResult.month} năm {lunarResult.year}
                        </Text>
                        <Text style={styles.yearName}>{lunarResult.yearName}</Text>
                    </View>
                )}

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Hôm nay</Text>
                </TouchableOpacity>
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
    card: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
        color: '#1A1D1A',
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputGroup: {
        flex: 1,
        marginHorizontal: 4,
    },
    label: {
        fontSize: 14,
        color: '#5F6368',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#F7F8FA',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    resultText: {
        fontSize: 18,
        color: '#1A1D1A',
        marginBottom: 8,
    },
    yearName: {
        fontSize: 16,
        color: '#5F6368',
    },
    button: {
        backgroundColor: '#0866ff',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ConverterScreen;
