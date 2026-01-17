// Firebase React Native Configuration
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

/**
 * Firebase is auto-initialized via native modules
 * No need to manually call initializeApp() in React Native
 * 
 * Configuration is loaded from:
 * - iOS: GoogleService-Info.plist
 * - Android: google-services.json
 */

// Export Firebase auth instance
export { auth };

// Export Google Sign-In for convenience
export { GoogleSignin };

// Helper: Sign in with Google and link to Firebase
export const signInWithGoogle = async () => {
  try {
    // Check if device supports Google Play Services
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Get user info from Google - returns { data: { user, idToken }, type: 'success' }
    const signInResult = await GoogleSignin.signIn();

    // Extract idToken from result
    const idToken = signInResult.data?.idToken;

    if (!idToken) {
      throw new Error('No ID token received from Google Sign-In');
    }

    // Create Firebase credential
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign in to Firebase with the credential
    const userCredential = await auth().signInWithCredential(googleCredential);

    console.log('✅ Signed in with Firebase:', userCredential.user.email);
    return userCredential.user;
  } catch (error: any) {
    console.error('❌ Firebase Google Sign-In error:', error);
    throw error;
  }
};

// Helper: Sign out from both Google and Firebase
export const signOut = async () => {
  try {
    await GoogleSignin.signOut();
    await auth().signOut();
    console.log('✅ Signed out from Firebase');
  } catch (error) {
    console.error('❌ Sign out error:', error);
    throw error;
  }
};

// Helper: Get current Firebase user
export const getCurrentUser = () => {
  return auth().currentUser;
};

// Helper: Listen to auth state changes
export const onAuthStateChanged = (callback: (user: any) => void) => {
  return auth().onAuthStateChanged(callback);
};

