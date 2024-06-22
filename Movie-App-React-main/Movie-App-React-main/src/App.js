import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import React, {useEffect, useState} from 'react';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

function App() {
  const [movies, setMovies]= useState([]);
  const [searchValue, setSearchValue]= useState(''); 
  const [favourites, setFavourites] = useState([]);

    const getMovieRequest =async ()=>{
        const url =`http://www.omdbapi.com/?s=${searchValue}&apikey=44d5a140`;

        const response = await fetch(url);

        const responseJson = await response.json();

        if(responseJson.Search)
        {
            setMovies(responseJson.Search);
        }
        
    };

    useEffect(()=>{
        getMovieRequest(searchValue);
    },[searchValue]);

    const addFavouriteMovie =(movie)=>{
      const newFavouriteList =[...favourites, movie];
      setFavourites(newFavouriteList);
    };

    const removeFavouriteMovie =(movie)=>{

      const newFavouriteList = favourites.filter(
        (favourite)=>favourite.imdbId !== movie.imdbId
        );
        setFavourites(newFavouriteList);
    };


  return (
    <div className='container-fluid  movie-app'>
    <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
    </div>
    <div className='row'>
        
        <MovieList
        movies={movies} 
        handleFavouritesClick={addFavouriteMovie} 
        favouriteComponent={AddFavourites} />
       
        
     </div >

     <div className='row d-flex align-items-center mt-4 mb-4'>
      <MovieListHeading heading='Favourites' />
     </div>
     <div className='row'>
        
        <MovieList 
        movies={favourites} 
        handleFavouritesClick={removeFavouriteMovie} 
        favouriteComponent={RemoveFavourites} />
       
        
     </div>
     </div>
  );
};

export default App;
