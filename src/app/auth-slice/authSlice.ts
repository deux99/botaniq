// redux/exampleSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

interface authState {
    user: User | null;
    isAuthenticated: boolean;
}

const loadStateFromStorage = (): authState => {
    
    if (typeof window !== 'undefined') {
        const savedState = localStorage.getItem('auth');
        if (savedState) {
            return JSON.parse(savedState);
        }
    }
    return {
        user: null,
        isAuthenticated: false
    };
};

const initialState: authState = loadStateFromStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem('auth', JSON.stringify(state));
      },
      logout: (state) => {
        state.user = null;
        state.isAuthenticated = false;
        // Clear localStorage
        localStorage.removeItem('auth');
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;