import { FaSearch } from 'react-icons/fa'
import type { SearchBarProps } from '../types'

export default function SearchBar({ search, setSearch, t }: SearchBarProps) {
    return (
        <div className='search-section'>
            <div className='search-box'>
                <FaSearch className='search-icon' />
                <input
                    type='text'
                    placeholder={t.searchPlaceholder}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>
    )
}