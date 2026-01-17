import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// --- CONFIGURATION ---
const GOOGLE_CALENDAR_API = 'https://www.googleapis.com/calendar/v3';

// Storage Keys
const STORAGE_KEYS = {
    ACCESS_TOKEN: '@google_access_token',
    USER_PROFILE: '@app_profile',
};

// Google Event Colors (same as web)
export const GOOGLE_EVENT_COLORS: Record<string, string> = {
    '1': '#a4bdfc', // Lavender
    '2': '#7ae7bf', // Sage
    '3': '#dbadff', // Grape
    '4': '#ff887c', // Flamingo
    '5': '#fbd75b', // Banana
    '6': '#ffb878', // Tangerine
    '7': '#46d6db', // Peacock
    '8': '#e1e1e1', // Graphite
    '9': '#5484ed', // Blueberry
    '10': '#51b749', // Basil
    '11': '#dc2127', // Tomato
};

export interface UserProfile {
    name: string;
    avatar: string;
    email?: string;
}

export interface CalendarEventInput {
    summary: string;
    description?: string;
    startDateTime: Date;
    endDateTime: Date;
    isAllDay?: boolean;
    recurrence?: string[];
    colorId?: string;
    transparency?: 'opaque' | 'transparent';
    visibility?: 'default' | 'public' | 'private';
    calendarId?: string;
}

/**
 * Initialize Google Sign-In
 * Call this once when app starts
 */
export const initializeGoogleSignIn = async (): Promise<void> => {
    try {
        GoogleSignin.configure({
            scopes: [
                'https://www.googleapis.com/auth/calendar.events',
                'https://www.googleapis.com/auth/calendar.readonly',
                'https://www.googleapis.com/auth/userinfo.profile',
            ],
            webClientId:
                '458962328580-uh714vq6c2c3oo1oms3nae292ig2auan.apps.googleusercontent.com',
            offlineAccess: true,
            forceCodeForRefreshToken: true,
        });
        console.log('✅ Google Sign-In configured');
    } catch (error) {
        console.error('❌ Google Sign-In configuration error:', error);
    }
};

/**
 * Handle user sign-in
 */
export const handleAuthClick = async (): Promise<void> => {
    try {
        await GoogleSignin.hasPlayServices();
        await GoogleSignin.signIn();

        // Get tokens
        const tokens = await GoogleSignin.getTokens();

        // Store access token
        await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);

        console.log('✅ User signed in successfully');
    } catch (error: any) {
        console.error('❌ Sign-in error:', error);
        throw error;
    }
};

/**
 * Handle user sign-out
 */
export const handleSignoutClick = async (): Promise<void> => {
    try {
        await GoogleSignin.signOut();
        await AsyncStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        await AsyncStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
        console.log('✅ User signed out');
    } catch (error) {
        console.error('❌ Sign-out error:', error);
    }
};

/**
 * Get user profile
 */
export const getUserProfile = async (): Promise<UserProfile | null> => {
    try {
        // Get current user from Google Sign-In
        const userInfo = await GoogleSignin.getCurrentUser();

        if (!userInfo || !userInfo.user) {
            return null;
        }

        const profile: UserProfile = {
            name: userInfo.user.name || 'User',
            avatar: userInfo.user.photo || 'https://i.pravatar.cc/150?img=68',
            email: userInfo.user.email,
        };

        // Cache profile
        await AsyncStorage.setItem(
            STORAGE_KEYS.USER_PROFILE,
            JSON.stringify(profile)
        );

        return profile;
    } catch (error) {
        console.error('❌ Error getting user profile:', error);

        // Try to return cached profile
        const cached = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
        if (cached) {
            return JSON.parse(cached);
        }

        return null;
    }
};

/**
 * Get access token (with auto-refresh if needed)
 */
const getAccessToken = async (): Promise<string | null> => {
    try {
        // Get fresh tokens
        const tokens = await GoogleSignin.getTokens();

        // Store fresh token
        await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);

        return tokens.accessToken;
    } catch (error) {
        console.error('❌ Error getting access token:', error);

        // Try cached token as fallback
        return await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    }
};

/**
 * Helper to build event resource for Google Calendar API
 */
const buildEventResource = (event: CalendarEventInput) => {
    const resource: any = {
        summary: event.summary,
        description: event.description || '',
    };

    const getLocalDateString = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    if (event.isAllDay) {
        const startStr = getLocalDateString(event.startDateTime);
        const endDateObj = new Date(event.endDateTime);
        endDateObj.setDate(endDateObj.getDate() + 1);
        const endStr = getLocalDateString(endDateObj);

        resource.start = { date: startStr };
        resource.end = { date: endStr };
    } else {
        resource.start = {
            dateTime: event.startDateTime.toISOString(),
            timeZone: 'Asia/Ho_Chi_Minh',
        };
        resource.end = {
            dateTime: event.endDateTime.toISOString(),
            timeZone: 'Asia/Ho_Chi_Minh',
        };
    }

    if (event.recurrence && event.recurrence.length > 0) {
        resource.recurrence = event.recurrence;
    }

    if (event.colorId) resource.colorId = event.colorId;
    if (event.transparency) resource.transparency = event.transparency;
    if (event.visibility) resource.visibility = event.visibility;

    return resource;
};

/**
 * List upcoming calendar events
 */
export const listUpcomingEvents = async (
    maxResults: number = 2500
): Promise<any[]> => {
    try {
        const token = await getAccessToken();

        if (!token) {
            console.warn('⚠️ No access token available');
            return [];
        }

        // Get time range: 1 month ago -> 1 year ahead
        const now = new Date();
        const timeMin = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            1
        ).toISOString();
        const timeMax = new Date(
            now.getFullYear() + 1,
            now.getMonth(),
            1
        ).toISOString();

        const response = await axios.get(
            `${GOOGLE_CALENDAR_API}/calendars/primary/events`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    timeMin,
                    timeMax,
                    maxResults,
                    singleEvents: true,
                    orderBy: 'startTime',
                },
            }
        );

        return response.data.items || [];
    } catch (error: any) {
        console.error(
            '❌ Error fetching events:',
            error.response?.data || error.message
        );
        return [];
    }
};

/**
 * Add event to calendar
 */
export const addEventToCalendar = async (
    event: CalendarEventInput
): Promise<any> => {
    try {
        const token = await getAccessToken();

        if (!token) {
            throw new Error('No access token available');
        }

        const calendarId = event.calendarId || 'primary';
        const eventResource = buildEventResource(event);

        const response = await axios.post(
            `${GOOGLE_CALENDAR_API}/calendars/${calendarId}/events`,
            eventResource,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('✅ Event created:', response.data.id);
        return response.data;
    } catch (error: any) {
        console.error(
            '❌ Error creating event:',
            error.response?.data || error.message
        );
        throw error;
    }
};

/**
 * Update event
 */
export const updateEvent = async (
    calendarId: string,
    eventId: string,
    event: CalendarEventInput
): Promise<any> => {
    try {
        const token = await getAccessToken();

        if (!token) {
            throw new Error('No access token available');
        }

        const eventResource = buildEventResource(event);

        const response = await axios.put(
            `${GOOGLE_CALENDAR_API}/calendars/${calendarId || 'primary'}/events/${eventId}`,
            eventResource,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('✅ Event updated:', response.data.id);
        return response.data;
    } catch (error: any) {
        console.error(
            '❌ Error updating event:',
            error.response?.data || error.message
        );
        throw error;
    }
};

/**
 * Delete event
 */
export const deleteEvent = async (
    calendarId: string,
    eventId: string
): Promise<void> => {
    try {
        const token = await getAccessToken();

        if (!token) {
            throw new Error('No access token available');
        }

        await axios.delete(
            `${GOOGLE_CALENDAR_API}/calendars/${calendarId || 'primary'}/events/${eventId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log('✅ Event deleted');
    } catch (error: any) {
        console.error(
            '❌ Error deleting event:',
            error.response?.data || error.message
        );
        throw error;
    }
};

/**
 * List user's calendars
 */
export const listCalendars = async (): Promise<any[]> => {
    try {
        const token = await getAccessToken();

        if (!token) {
            console.warn('⚠️ No access token available');
            return [];
        }

        const response = await axios.get(
            `${GOOGLE_CALENDAR_API}/users/me/calendarList`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data.items || [];
    } catch (error: any) {
        console.error(
            '❌ Error fetching calendars:',
            error.response?.data || error.message
        );
        return [];
    }
};

/**
 * Get event color hex code from colorId
 */
export const getEventColor = (colorId?: string): string => {
    return (colorId && GOOGLE_EVENT_COLORS[colorId]) || '#10b981';
};

/**
 * Get primary calendar color
 */
export const getPrimaryCalendarColor = async (): Promise<string> => {
    try {
        const calendars = await listCalendars();
        const primary = calendars.find((c: any) => c.primary);
        return primary?.backgroundColor || '#039be5';
    } catch (error) {
        console.error('❌ Error getting primary calendar color:', error);
        return '#039be5';
    }
};

/**
 * Mock function for sync settings compatibility
 */
export const fetchMockCalendars = async (): Promise<
    Array<{ id: string; summary: string; primary?: boolean; color: string }>
> => {
    const calendars = await listCalendars();
    return calendars.map((cal: any) => ({
        id: cal.id,
        summary: cal.summary,
        primary: cal.primary,
        color: cal.backgroundColor || '#0866ff',
    }));
};

// Legacy compatibility exports
export const initializeGapiClient = initializeGoogleSignIn;
export const initializeGisClient = async () => Promise.resolve();
export const setGoogleToken = async (token: string) => {
    await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
};
