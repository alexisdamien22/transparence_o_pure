import {
  ArrowRight, Atom, CircleAlert, CircleMinus, Check, ExternalLink,
  FlaskConical, MapPin, Microscope, ShieldCheck, Split, TriangleAlert,
} from 'lucide-react'
import { indicators } from '../data/demo.js'

const indicatorIcons = {
  good: Check,
  quantified: CircleMinus,
  watch: TriangleAlert,
  exceedance: CircleAlert,
}

const gaugeCenter = { x: 115, y: 112 }
const gaugeRadius = 94
const gaugeSegments = [
  { id: 'green', start: 182, end: 222 },
  { id: 'yellow', start: 228, end: 268 },
  { id: 'orange', start: 272, end: 312 },
  { id: 'red', start: 318, end: 358 },
]
const gaugeAngles = { good: 202, quantified: 248, watch: 292, exceedance: 338 }

function gaugePoint(angle) {
  const radians = angle * Math.PI / 180
  return {
    x: gaugeCenter.x + gaugeRadius * Math.cos(radians),
    y: gaugeCenter.y + gaugeRadius * Math.sin(radians),
  }
}

function gaugeArc(start, end) {
  const from = gaugePoint(start)
  const to = gaugePoint(end)
  return `M ${from.x} ${from.y} A ${gaugeRadius} ${gaugeRadius} 0 0 1 ${to.x} ${to.y}`
}

function WaterScreen({ area, onEdit, onOpenTreatment, onAbout }) {
  const status = indicators.find((item) => item.id === area.status) ?? indicators[0]
  const isDanger = area.status === 'exceedance'
  const StateIcon = indicatorIcons[status.id]
  const marker = gaugePoint(gaugeAngles[status.id] ?? gaugeAngles.good)

  return (
    <div className="screen-content water-screen">
      <div className="screen-heading">
        <div><h1>Mon eau, près de chez moi</h1><p className="area-line"><MapPin size={14} /> Secteur de démonstration <span className="area-name">· {area.name}</span><button type="button" onClick={onEdit}>Modifier</button></p></div>
        <span className="demo-badge heading-badge"><FlaskConical size={13} /> Données fictives · Démonstration</span>
      </div>

      <div className="water-layout">
        <section className={`indicator-card state-${area.status}`} aria-labelledby="indicator-title">
          <p className="card-kicker">INDICATEUR PFAS</p>
          <div className="indicator-grid">
            <div className="gauge-column">
              <div className="gauge-visual">
                <svg viewBox="0 0 230 140" role="img" aria-label={`Niveau illustratif : ${status.label}`}>
                  {gaugeSegments.map(({ id, start, end }) => <path key={id} className={`arc arc-${id}`} d={gaugeArc(start, end)} />)}
                  <circle className="gauge-marker" cx={marker.x} cy={marker.y} r="5" />
                </svg>
                <span className="gauge-center"><StateIcon size={22} /></span>
                <span className="gauge-caption">Niveau illustré · sans valeur mesurée</span>
              </div>
              <h2 id="indicator-title">{isDanger ? 'Dépassement sanitaire simulé' : status.label}</h2>
            </div>
            <div className="indicator-legend"><h3>Les quatre repères</h3>{indicators.map(({ id, label }) => { const Icon = indicatorIcons[id]; return <div className={`indicator-row${area.status === id ? ' selected' : ''}`} key={id}><span className={`indicator-icon icon-${id}`}><Icon size={13} /></span><span>{label}</span>{area.status === id && <small>ICI</small>}</div> })}</div>
          </div>
          <p className="indicator-description">{isDanger ? 'Ce scénario fictif illustre un état d’alerte. Il ne décrit pas la situation réelle de votre eau.' : area.status === 'good' ? 'Dans ce scénario fictif, aucun PFAS n’est quantifié. Cela ne signifie pas une absence absolue ni une garantie de potabilité.' : 'Ce scénario fictif illustre la présence de PFAS dans un échantillon, sans mesure ni seuil sanitaire associé.'}</p>
          <p className="indicator-footnote">Repères illustratifs. Aucune concentration ni aucun seuil sanitaire n’est fourni.</p>
        </section>

        <aside className="water-aside">
          {isDanger && <section className="alert-callout"><div className="callout-heading"><TriangleAlert size={17} /><h2>S’informer auprès des autorités</h2></div><p>Consultez les consignes officielles des autorités compétentes. Ce prototype ne délivre aucun conseil sanitaire.</p><button className="primary-button" type="button" onClick={onAbout}><ExternalLink size={14} /> Consulter les consignes officielles</button></section>}
          <section className="info-card"><div className="info-card-heading"><Microscope size={15} /><h2>Les PFAS, c’est quoi ?</h2></div><p>Une famille de substances utilisées dans de nombreux produits. Certaines persistent longtemps dans l’environnement, d’où le nom de « polluants éternels ».</p><strong>Les séparer de l’eau et traiter les résidus sont deux étapes distinctes.</strong></section>
          <button className="treatment-link" type="button" onClick={onOpenTreatment}><span><Split size={16} /><span><strong>Comment traiter les PFAS ?</strong><small>Du captage au traitement des résidus</small></span></span><ArrowRight size={16} /></button>
        </aside>
      </div>
      <p className="analysis-note">Aucune analyse réelle ni date de prélèvement n’est disponible dans cette démonstration.</p>
    </div>
  )
}

export default WaterScreen