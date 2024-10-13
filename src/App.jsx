import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'
import { Provider } from 'react-redux'
import store from './store'
import AuthProvider from './components/AuthProvider'

export default function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<AuthPage />} path='/login' />
            <Route element={<AuthPage />} path='*' />
            <Route element={<ProfilePage />} path='/profile' />

          </Routes>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  )
}
