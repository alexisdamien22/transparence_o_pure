export const sectors = [
    { name: 'Orléans Centre', address: 'Place du Martroi, Orléans', latitude: 47.902, longitude: 1.909, status: 'good' },
    { name: 'Orléans La Source', address: 'Avenue de la Bolière, Orléans', latitude: 47.833, longitude: 1.936, status: 'quantified' },
    { name: 'Fleury-les-Aubrais', address: 'Place de la République, Fleury-les-Aubrais', latitude: 47.932, longitude: 1.918, status: 'watch' },
    { name: 'Olivet', address: 'Rue du Général de Gaulle, Olivet', latitude: 47.861, longitude: 1.901, status: 'exceedance' },
]

export const indicators = [
    { id: 'good', label: 'Aucun PFAS quantifié' },
    { id: 'quantified', label: 'PFAS quantifiés' },
    { id: 'watch', label: 'Vigilance renforcée' },
    { id: 'exceedance', label: 'Dépassement sanitaire' },
]

export function searchSectors(query) {
    const term = query.trim().toLocaleLowerCase('fr')
    if (!term) return sectors
    return sectors.filter((sector) => `${sector.name} ${sector.address}`.toLocaleLowerCase('fr').includes(term))
}

export function findSectorAtLocation(latitude, longitude) {
    const insideDemoBounds = latitude >= 47.77 && latitude <= 48.02 && longitude >= 1.70 && longitude <= 2.12
    if (!insideDemoBounds) return null

    return sectors.reduce((closest, candidate) => {
        const distance = (sector) => (latitude - sector.latitude) ** 2 + ((longitude - sector.longitude) * Math.cos(latitude * Math.PI / 180)) ** 2
        return distance(candidate) < distance(closest) ? candidate : closest
    })
}