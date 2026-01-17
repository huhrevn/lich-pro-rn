import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Switch,
    Image,
    Alert,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const SettingsScreen = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        Alert.alert('Đăng xuất', 'Bạn có chắc muốn đăng xuất?', [
            { text: 'Hủy', style: 'cancel' },
            {
                text: 'Đăng xuất',
                style: 'destructive',
                onPress: logout,
            },
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* User Profile */}
                {user && (
                    <View style={styles.profileCard}>
                        <Image source={{ uri: user.avatar }} style={styles.avatar} />
                        <Text style={styles.userName}>{user.name}</Text>
                        {user.email && <Text style={styles.userEmail}>{user.email}</Text>}
                    </View>
                )}

                {/* Settings Sections */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Giao diện</Text>

                    <View style={styles.settingItem}>
                        <Text style={styles.settingLabel}>Chế độ tối</Text>
                        <Switch
                            value={theme === 'dark'}
                            onValueChange={toggleTheme}
                            trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
                            thumbColor={theme === 'dark' ? '#fff' : '#f3f4f6'}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Lịch</Text>

                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingLabel}>Đồng bộ Google Calendar</Text>
                        <Text style={styles.settingValue}>Tự động</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingLabel}>Múi giờ</Text>
                        <Text style={styles.settingValue}>GMT+7</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Thông báo</Text>

                    <View style={styles.settingItem}>
                        <Text style={styles.settingLabel}>Nhắc nhở sự kiện</Text>
                        <Switch
                            value={true}
                            trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
                            thumbColor={'#fff'}
                        />
                    </View>

                    <View style={styles.settingItem}>
                        <Text style={styles.settingLabel}>Ngày lễ, Tết</Text>
                        <Switch
                            value={true}
                            trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
                            thumbColor={'#fff'}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ứng dụng</Text>

                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingLabel}>Phiên bản</Text>
                        <Text style={styles.settingValue}>1.0.0</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingLabel}>Điều khoản dịch vụ</Text>
                        <Text style={styles.settingArrow}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingLabel}>Chính sách bảo mật</Text>
                        <Text style={styles.settingArrow}>›</Text>
                    </TouchableOpacity>
                </View>

                {user && (
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutText}>Đăng xuất</Text>
                    </TouchableOpacity>
                )}

                <Text style={styles.footer}>Made with ❤️ in Vietnam</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    profileCard: {
        backgroundColor: 'white',
        padding: 24,
        alignItems: 'center',
        marginBottom: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 12,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    userEmail: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 4,
    },
    section: {
        backgroundColor: 'white',
        marginBottom: 16,
        paddingVertical: 8,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#6b7280',
        textTransform: 'uppercase',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    settingLabel: {
        fontSize: 16,
        color: '#1f2937',
    },
    settingValue: {
        fontSize: 16,
        color: '#6b7280',
    },
    settingArrow: {
        fontSize: 24,
        color: '#d1d5db',
    },
    logoutButton: {
        backgroundColor: '#ef4444',
        margin: 16,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    logoutText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        textAlign: 'center',
        color: '#9ca3af',
        fontSize: 12,
        paddingVertical: 24,
    },
});

export default SettingsScreen;
