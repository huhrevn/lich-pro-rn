import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';

const JournalScreen = () => {
    const [entries, setEntries] = useState<Array<{ id: string, date: string, content: string }>>([]);
    const [newEntry, setNewEntry] = useState('');

    const addEntry = () => {
        if (newEntry.trim()) {
            const entry = {
                id: Date.now().toString(),
                date: new Date().toLocaleDateString('vi-VN'),
                content: newEntry,
            };
            setEntries([entry, ...entries]);
            setNewEntry('');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Nhật ký</Text>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.inputCard}>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Viết nhật ký hôm nay..."
                        value={newEntry}
                        onChangeText={setNewEntry}
                        multiline
                        numberOfLines={4}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={addEntry}>
                        <Text style={styles.addButtonText}>Thêm</Text>
                    </TouchableOpacity>
                </View>

                {entries.map((entry) => (
                    <View key={entry.id} style={styles.entryCard}>
                        <Text style={styles.entryDate}>{entry.date}</Text>
                        <Text style={styles.entryContent}>{entry.content}</Text>
                    </View>
                ))}

                {entries.length === 0 && (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>📝</Text>
                        <Text style={styles.emptyMessage}>Chưa có nhật ký nào</Text>
                    </View>
                )}
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
    inputCard: {
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
    textArea: {
        backgroundColor: '#F7F8FA',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        minHeight: 100,
        textAlignVertical: 'top',
    },
    addButton: {
        backgroundColor: '#0866ff',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 12,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    entryCard: {
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
    entryDate: {
        fontSize: 14,
        color: '#5F6368',
        marginBottom: 8,
    },
    entryContent: {
        fontSize: 16,
        color: '#1A1D1A',
        lineHeight: 24,
    },
    emptyState: {
        alignItems: 'center',
        marginTop: 60,
    },
    emptyText: {
        fontSize: 48,
        marginBottom: 16,
    },
    emptyMessage: {
        fontSize: 16,
        color: '#5F6368',
    },
});

export default JournalScreen;
