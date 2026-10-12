import { ArrowLeft, ArrowRight, Atom, Droplet, Filter, Info, MoveUpRight, Split, Waves } from 'lucide-react'

function TreatmentScreen({ onBack }) {
  return (
    <div className="screen-content treatment-screen">
      <div className="screen-heading treatment-heading">
        <div><p className="op-eyebrow">COMPRENDRE POUR AGIR</p><h1>De l’eau captée aux PFAS séparés</h1><p>Deux parcours à distinguer : celui de l’eau et celui des résidus qui concentrent les PFAS.</p></div>
        <span className="project-badge"><Split size={13} /> Schéma de principe · Projet présenté</span>
      </div>

      <div className="process-flow">
        <div className="process-stage"><StepCard number="01" title="Captage" description="Prélever l’eau dans une ressource naturelle." icon={Waves} /><ArrowRight className="flow-arrow" size={21} /></div>
        <div className="process-stage"><StepCard number="02" title="Traitement de l’eau" description="Préparer l’eau avec des étapes de traitement adaptées." icon={Filter} /><ArrowRight className="flow-arrow" size={21} /></div>
        <div className="process-stage"><StepCard number="03" title="Séparation / capture" description="Séparer les PFAS de l’eau et les concentrer dans des résidus." icon={MoveUpRight} /></div>
      </div>

      <div className="branch-connector" aria-hidden="true">
        <svg viewBox="0 0 100 42" preserveAspectRatio="none">
          <path className="branch-water" d="M 75.35 14 H 24.65 V 39" />
          <path className="branch-water-head" d="M 21.15 35.5 L 24.65 39 L 28.15 35.5" />
          <path className="branch-residue" d="M 84.5 0 V 14 H 75.35 V 39" />
          <path className="branch-residue-head" d="M 71.85 35.5 L 75.35 39 L 78.85 35.5" />
        </svg>
      </div>
      <div className="outcome-grid">
        <section className="outcome-card water-outcome"><span className="outcome-icon"><Droplet size={20} /></span><div><p className="card-kicker">EAU</p><h2>Contrôler et distribuer</h2><p>Contrôler la qualité de l’eau avant sa distribution. Cette voie reste distincte du traitement des résidus.</p></div></section>
        <section className="outcome-card residue-outcome"><span className="outcome-icon"><Atom size={20} /></span><div><p className="card-kicker">RÉSIDUS</p><h2>Traiter les résidus</h2><p>Orienter les résidus vers la destruction des PFAS par la solution d’ArianeGroup.</p><span className="project-caption">Voie envisagée · Projet présenté</span></div></section>
      </div>
      <div className="method-caveat"><Info size={17} /><p>Les performances ne sont pas documentées ici et aucune destruction intégrale n’est garantie.</p></div>
      <button className="back-water-button" type="button" onClick={onBack}><ArrowLeft size={15} /> Revenir à mon eau</button>
    </div>
  )
}

function StepCard({ number, title, description, icon: Icon }) {
  return <article className="process-card"><span className="process-icon"><Icon size={21} /></span><span className="process-number">{number}</span><h2>{title}</h2><p>{description}</p></article>
}

export default TreatmentScreen