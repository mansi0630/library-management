import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCbtemmUOwkv1hEoHKD9t2jGWcR2WL5hxA",
  authDomain: "libero-library.firebaseapp.com",
  projectId: "libero-library",
  storageBucket: "libero-library.firebasestorage.app",
  messagingSenderId: "45270163480",
  appId: "1:45270163480:web:70a3bc87a29ac383dfa36d"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)