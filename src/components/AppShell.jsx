import { ArrowRight, CircleHelp, Droplet, House, Microscope, Split, X } from 'lucide-react'

export function AppHeader({ screen, onAbout, onNavigate }) {
  return (
    <header className="op-header">
      <a className="op-brand" href="#accueil" onClick={(event) => { event.preventDefault(); onNavigate('home') }} aria-label="O-Pure, Orléans Métropole, accueil">
        <span className="op-brand-mark"><img src="/logo_o_pure_vectoriel.svg" alt="" /></span>
        <span><small>ORLÉANS MÉTROPOLE</small></span>
      </a>
      <nav className="desktop-nav" aria-label="Navigation principale">
        <NavButton active={screen === 'home'} icon={House} label="Accueil" onClick={() => onNavigate('home')} />
        <NavButton active={screen === 'water'} icon={Droplet} label="Mon eau" onClick={() => onNavigate('water')} />
        <NavButton active={screen === 'treatment'} icon={Split} label="Comprendre" onClick={() => onNavigate('treatment')} />
      </nav>
      <button className="about-button" type="button" onClick={onAbout}><CircleHelp size={15} /><span>À propos du projet</span></button>
    </header>
  )
}

export function AppFooter() {
  return (
    <footer className="op-footer">
      <strong>Transparence O-Pure</strong>
      <span>Prototype de présentation · Maquette citoyenne</span>
      <span>Orléans Métropole</span>
    </footer>
  )
}

export function MobileNav({ screen, onNavigate }) {
  return (
    <nav className="mobile-nav" aria-label="Navigation principale">
      <NavButton active={screen === 'home'} icon={House} label="Accueil" onClick={() => onNavigate('home')} />
      <NavButton active={screen === 'water'} icon={Droplet} label="Mon eau" onClick={() => onNavigate('water')} />
      <NavButton active={screen === 'treatment'} icon={Split} label="Comprendre" onClick={() => onNavigate('treatment')} />
    </nav>
  )
}

function NavButton({ active, icon: Icon, label, onClick }) {
  return <button className={`nav-item${active ? ' active' : ''}`} type="button" aria-current={active ? 'page' : undefined} onClick={onClick}><Icon size={15} /><span>{label}</span></button>
}

export function AboutDialog({ onClose, onOpenTreatment }) {
  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="about-dialog" role="dialog" aria-modal="true" aria-labelledby="about-title">
        <button className="dialog-close" type="button" aria-label="Fermer" onClick={onClose}><X size={18} /></button>
        <span className="dialog-icon"><Microscope size={20} /></span>
        <p className="op-eyebrow">L’EAU, UN BIEN COMMUN</p>
        <h2 id="about-title">Les PFAS, de quoi parle-t-on ?</h2>
        <p>Les PFAS sont une famille de substances utilisées dans de nombreux produits. Certaines persistent longtemps dans l’environnement, d’où leur surnom de « polluants éternels ».</p>
        <p>Dans un parcours de traitement, séparer les PFAS de l’eau et traiter les résidus qui les concentrent sont deux étapes distinctes.</p>
        <button className="primary-button" type="button" onClick={onOpenTreatment}>Comprendre le parcours <ArrowRight size={15} /></button>
        <small>Prototype citoyen · Les données affichées sont fictives.</small>
      </section>
    </div>
  )
}