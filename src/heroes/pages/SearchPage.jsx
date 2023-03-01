import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from "query-string"

import { useForm } from '../../hooks/useForm'
import {HeroCard} from '../components'
import { getHeroesByName } from '../helpers'

export const SearchPage = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const {q = "" } = queryString.parse(location.search)

  const heroes = getHeroesByName(q)

  const showSearch = (q.length === 0)
  const showError = (q.length > 0) && heroes.length === 0

  const {searchText, onInputChange} = useForm({
    searchText: q
  })

  const onSearchSubmit = (event) => {
    event.preventDefault()
    if (searchText.trim().length <= 1 ) return

    navigate(`?q=${searchText.toLowerCase().trim()}`)
  }

  const onClearSubmit = () => {
    if (searchText.length === undefined ) return
    navigate("/search")
  }

  return (
    <>
      <h1>Search Page</h1>
      <hr />
      
      <div className="row">

        <div className="col-5"> 
          <h4>Searching...</h4>
          <hr />
          <form onSubmit={onSearchSubmit}>
            <input 
                  type="text" 
                  placeholder='Search a Hero' 
                  className='form-control' 
                  name='searchText' 
                  autoComplete='off'
                  value={searchText}
                  onChange={onInputChange} 
            />
            <button className='btn btn-outline-primary mt-1' onClick={onClearSubmit}> 
              Search 
            </button>
          </form>
        </div>
        
        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {/*
            (q === "")
            ? <div className="alert alert-primary"> Search a Hero </div>
            : (heroes.length === 0) 
            &&  <div className="alert alert-danger"> No Results with { q } </div>
          */}

          <div 
              className="alert alert-primary animate__animated animate__fadeIn" 
              style={{display: showSearch ? " " : "none"}}
          > 
            Search a Hero 
          </div>

          <div 
              className="alert alert-danger animate__animated animate__fadeIn"  
              style={{display: showError ? " " : "none"}}
          > 
            No Results with { q } 
          </div>
           
          {
            heroes.map(hero => (
              <HeroCard key={hero.id} {...hero} />
            ))
          }
        </div>

      </div>


    </>
  )
}
