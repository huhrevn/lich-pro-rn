import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/contexts/AuthContext';
import { EventProvider } from './src/contexts/EventContext';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <EventProvider>
        <AppNavigator />
      </EventProvider>
    </AuthProvider>
  );
}

export default App;
