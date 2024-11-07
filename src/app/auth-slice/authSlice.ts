// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

interface AuthState {
    user: {
        uid: string;
        email: string | null;
        displayName: string | null;
        photoURL: string | null;
    } | null;
    isAuthenticated: boolean;
}

const loadStateFromStorage = (): AuthState => {
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

const initialState: AuthState = loadStateFromStorage();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            const { uid, email, displayName, photoURL } = action.payload;
            state.user = { uid, email, displayName, photoURL };
            state.isAuthenticated = true;
            if (typeof window !== 'undefined') {
                localStorage.setItem('auth', JSON.stringify(state));
            }
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('auth');
            }
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;