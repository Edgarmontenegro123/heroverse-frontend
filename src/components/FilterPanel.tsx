import type {FilterPanelProps} from '../types'

export default function FilterPanel({filters, setFilters, t}: FilterPanelProps) {
    return (
        <div className='filter-panel'>
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
        </div>
    )
}