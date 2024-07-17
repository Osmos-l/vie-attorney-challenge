// MobX state management
import { Provider as MobxProvider } from 'mobx-react'
import mobxStore from '@/stores/AppStore'
// Theme
import ThemeProvider from '@/stores/providers/ThemeProvider'
import { NavBar } from '@/components/app/NavBar'
import { Box, Drawer } from '@mui/material'

// Global Styles

const App = ({ Component, pageProps }) => {
  return (
      <MobxProvider store={mobxStore}>
        <ThemeProvider>
          <NavBar />
          <Component {...pageProps} />
      </ThemeProvider>
    </MobxProvider>
  )
}

export default App
