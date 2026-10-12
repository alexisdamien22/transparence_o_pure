import { useMemo, useState } from 'react'
import { findSectorAtLocation, searchSectors, sectors } from './data/demo.js'
import { AboutDialog, AppFooter, AppHeader, MobileNav } from './components/AppShell.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import TreatmentScreen from './screens/TreatmentScreen.jsx'
import WaterScreen from './screens/WaterScreen.jsx'

function App() {
  const [screen, setScreen] = useState('home')
  const [area, setArea] = useState(sectors[0])
  const [query, setQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const [notice, setNotice] = useState('')
  const [aboutOpen, setAboutOpen] = useState(false)

  const suggestions = useMemo(() => searchSectors(query), [query])

  function chooseSector(sector) {
    setArea(sector)
    setQuery(sector.name)
    setSearching(false)
    setNotice('')
  }

  function consultWater(event) {
    event.preventDefault()
    if (!suggestions.length) {
      setNotice('Aucun secteur de démonstration correspondant. Essayez Orléans, Olivet ou Fleury-les-Aubrais.')
      return
    }
    chooseSector(suggestions[0])
    setScreen('water')
  }

  function locateMe() {
    if (!navigator.geolocation) {
      setNotice('La géolocalisation n’est pas disponible sur cet appareil.')
      return
    }
    setNotice('Recherche de votre secteur…')
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const nearest = findSectorAtLocation(coords.latitude, coords.longitude)
        if (!nearest) {
          setNotice('Votre position semble hors de la zone de démonstration d’Orléans Métropole.')
          return
        }
        chooseSector(nearest)
        setScreen('water')
      },
      () => setNotice('Position indisponible. Vous pouvez saisir une adresse à la place.'),
      { enableHighAccuracy: false, timeout: 9000, maximumAge: 60000 },
    )
  }

  function navigate(nextScreen) {
    setScreen(nextScreen)
    setNotice('')
    if (nextScreen === 'home') setSearching(false)
  }

  return (
    <div className="op-app">
      <AppHeader screen={screen} onAbout={() => setAboutOpen(true)} onNavigate={navigate} />
      <main className="op-main">
        {screen === 'home' && (
          <HomeScreen
            locateMe={locateMe}
            notice={notice}
            onAbout={() => setAboutOpen(true)}
            onChangeQuery={(value) => { setQuery(value); setSearching(true); setNotice('') }}
            onChooseSector={chooseSector}
            onConsult={consultWater}
            onFocus={() => setSearching(true)}
            query={query}
            searching={searching}
            suggestions={suggestions}
          />
        )}
        {screen === 'water' && <WaterScreen area={area} onEdit={() => navigate('home')} onOpenTreatment={() => navigate('treatment')} onAbout={() => setAboutOpen(true)} />}
        {screen === 'treatment' && <TreatmentScreen onBack={() => navigate('water')} />}
      </main>
      <AppFooter />
      <MobileNav screen={screen} onNavigate={navigate} />
      {aboutOpen && <AboutDialog onClose={() => setAboutOpen(false)} onOpenTreatment={() => { setAboutOpen(false); navigate('treatment') }} />}
    </div>
  )
}

export default App