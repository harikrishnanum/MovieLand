import { useState } from 'react';
import './App.css'
import MovieCard from './MovieCard';
import SearchIcon from './search.svg'

const OMDB_API = `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}`

const App = () => {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  const searchMovies = async (title) => {
    setLoading(true)
    const res = await fetch(`${OMDB_API}&s=${title}`);
    const data = await res.json();
    setMovies(data.Search);
    setLoading(false)
  }
  return (
    <>
      <div className='app'>
        <h1>MovieLand</h1>
        <div className='search'>
          <input
            type="text"
            placeholder='Search for movies...'
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value) }}
            onKeyDown={(e) => { e.key === 'Enter' && searchMovies(searchTerm) }}
          />
          <img
            src={SearchIcon}
            alt="Search Icon"
            onClick={() => { searchMovies(searchTerm) }}
          />
        </div>
        {
          loading ? (
            <dir className='empty'>
              <h2>Loading...</h2>
            </dir>
          ) :
            movies?.length > 0 ?
              <div className='container'>
                {movies.map(movie => <MovieCard movie={movie} />)}
              </div> : (
                <div className='empty'>
                  <h2>No movies found</h2>
                </div>
              )
        }
      </div>
    </>
  )
}

export default App