import { ArrowRight, Droplet, FlaskConical, Info, LocateFixed, MapPin, Search, ShieldCheck, X } from 'lucide-react'

function HomeScreen({ locateMe, notice, onAbout, onChangeQuery, onChooseSector, onConsult, onFocus, query, searching, suggestions }) {
  return (
    <div className="home-layout">
      <section className="home-story">
        <div className="home-copy">
          <p className="op-eyebrow">L’EAU, UN BIEN COMMUN</p>
          <h1>Votre eau,<br />en toute clarté.</h1>
          <p className="home-lede">Un regard local sur les PFAS pour mieux comprendre l’eau de votre quotidien.</p>
        </div>
        <img className="loire-illustration" src="/loire-orleans.svg" alt="Illustration des bords de Loire à Orléans" />
        <button className="learn-banner" type="button" onClick={onAbout}>
          <Info size={17} /><span><strong>Les PFAS, de quoi parle-t-on ?</strong><small>Comprendre les enjeux et le traitement</small></span><ArrowRight size={18} />
        </button>
      </section>

      <aside className="location-column">
        <section className="location-card">
          <div className="location-title"><MapPin size={20} /><h2>Où habitez-vous ?</h2></div>
          <p className="location-intro">Renseignez une adresse sur le territoire d’Orléans Métropole.</p>
          <form className="address-form" onSubmit={onConsult}>
            <label htmlFor="address-search">Votre adresse</label>
            <div className="address-wrap">
              <div className="address-input"><Search size={15} /><input id="address-search" autoComplete="off" onChange={(event) => onChangeQuery(event.target.value)} onFocus={onFocus} placeholder="Saisir votre adresse" value={query} /><button aria-label="Effacer l’adresse" className={query ? 'clear-address visible' : 'clear-address'} type="button" onClick={() => onChangeQuery('')}><X size={14} /></button></div>
              {searching && <div className="address-suggestions">{suggestions.length ? suggestions.map((sector) => <button key={sector.name} type="button" onPointerDown={(event) => { event.preventDefault(); onChooseSector(sector) }}><MapPin size={14} /><span><strong>{sector.name}</strong><small>{sector.address}</small></span></button>) : <p>Aucun secteur de démonstration correspondant.</p>}</div>}
            </div>
            <button className="primary-button" type="submit"><ArrowRight size={16} /> Consulter mon eau</button>
          </form>
          <div className="or-divider"><span>ou</span></div>
          <button className="geolocate-button" type="button" onClick={locateMe}><LocateFixed size={15} /> Me géolocaliser</button>
          <p className="location-privacy"><ShieldCheck size={13} /> La localisation est un choix. Vous pouvez aussi saisir votre adresse.</p>
          {notice && <p className="form-notice" role="status">{notice}</p>}
        </section>
        <div className="demo-disclosure"><span className="demo-badge"><FlaskConical size={13} /> Données fictives · Démonstration</span><p>Prototype de présentation. Les adresses et la géolocalisation utilisent des secteurs de démonstration.</p></div>
      </aside>
    </div>
  )
}

export default HomeScreen