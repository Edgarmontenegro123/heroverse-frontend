import type { SortField, SortDirection, SortState } from '../types'

interface ExtendedFilterPanelProps {
    filters: { publisher: string; alignment: string }
    setFilters: (filters: { publisher: string; alignment: string }) => void
    sort: SortState
    setSort: (sort: SortState) => void
    t: Record<string, string>
}

export default function FilterPanel({ filters, setFilters, sort, setSort, t }: ExtendedFilterPanelProps) {
    return (
        <div className='filter-panel-container'>
            <div className='filter-panel'>
                {/* --- Grupo de Filtros Originales --- */}
                <div className='filter-group'>
                    <select
                        value={filters.publisher}
                        onChange={(e) => setFilters({ ...filters, publisher: e.target.value })}
                        className='filter-select'
                    >
                        <option value=''>{t.allPublishers}</option>
                        <option value='Marvel Comics'>Marvel Comics</option>
                        <option value='DC Comics'>DC Comics</option>
                        <option value='Dark Horse Comics'>Dark Horse Comics</option>
                    </select>
                </div>
                <div className='filter-group'>
                    <select
                        value={filters.alignment}
                        onChange={(e) => setFilters({ ...filters, alignment: e.target.value })}
                        className='filter-select'
                    >
                        <option value=''>{t.allAlignments}</option>
                        <option value='good'>{t.good}</option>
                        <option value='bad'>{t.bad}</option>
                        <option value='neutral'>{t.neutral}</option>
                    </select>
                </div>

                {/* --- NUEVO: Grupo de Ordenamiento por Powerstats --- */}
                <div className='sort-panel'>
                    <select
                        value={sort.field}
                        onChange={(e) => setSort({ ...sort, field: e.target.value as SortField })}
                        className='sort-select'
                    >
                        <option value='none'>{t.sortByDefault || 'Sin Ordenar'}</option>
                        <option value='intelligence'>{t.intelligence || 'Inteligencia'}</option>
                        <option value='strength'>{t.strength || 'Fuerza'}</option>
                        <option value='speed'>{t.speed || 'Velocidad'}</option>
                        <option value='durability'>{t.durability || 'Resistencia'}</option>
                        <option value='power'>{t.power || 'Poder'}</option>
                        <option value='combat'>{t.combat || 'Combate'}</option>
                    </select>

                    {/* Selector de Dirección (Ascendente / Descendente) - Solo visible si hay un filtro seleccionado */}
                    {sort.field !== 'none' && (
                        <select
                            value={sort.direction}
                            onChange={(e) => setSort({ ...sort, direction: e.target.value as SortDirection })}
                            className='sort-select'
                        >
                            <option value='desc'>⬇ {t.sortDesc || 'Mayor a Menor'}</option>
                            <option value='asc'>⬆ {t.sortAsc || 'Menor a Mayor'}</option>
                        </select>
                    )}
                </div>
            </div>

            {/* Leyenda visual de colores arriba */}
            <div className='alignment-legend'>
                <div className='legend-item'><span className='dot good'></span>{t.good}</div>
                <div className='legend-item'><span className='dot bad'></span>{t.bad}</div>
                <div className='legend-item'><span className='dot neutral'></span>{t.neutral}</div>
            </div>
        </div>
    )
}