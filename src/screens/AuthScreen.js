import React, { useEffect } from 'react';
import { View, Text, Button } from 'native-base';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const AuthScreen = ({ navigation }) => {
  useEffect(() => {
    // Check if the user is already signed in.
    const user = auth().currentUser;
    if (user) {
      // Navigate to the Home screen if the user is already signed in.
      navigation.replace('Home');
    }
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      // Configure GoogleSignin
      GoogleSignin.configure({
        webClientId: 'YOUR_WEB_CLIENT_ID', // Replace with your web client ID
        offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        scopes: ['profile', 'email'], // what API you want to access on behalf of the user, default is email and profile
      });

      // Start the Google Sign-In process
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      // Get the Google Sign-In ID token
      const idToken = userInfo.idToken;

      // Sign in to Firebase with the Google ID token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);

      // Navigate to the Home screen after successful sign-in
      navigation.replace('Home');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('Google Sign-In Cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Google Sign-In in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google Play Services not available');
      } else {
        console.log('Unknown Google Sign-In Error', error);
      }
    }
  };

  return (
    <View>
      <Text>NEET Flashcards App</Text>
      <Button onPress={handleGoogleSignIn}>
        <Text>Sign in with Google</Text>
      </Button>
    </View>
  );
};

export default AuthScreen;
