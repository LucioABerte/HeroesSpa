import React, { useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getHeroById } from '../helpers'

export const HeroPage = () => {

  const navigate = useNavigate()

  const { id }= useParams()

  const hero = useMemo( () => getHeroById( id ), [id] )

  const onNavigateBack = () => {
    navigate(-1)
  }

  if( !hero ) {
    return <Navigate to="/marvel" />
  }
 
  return (
    <div className="row mt-5">
      <div className="col-4">
        <img 
            src={`/${ id }.jpg`} 
            alt={hero.superhero}
            className="img-thumbnail animate__animated animate__fadeInLeft" />
      </div>

      <div className="col-8 animate__animated animate__fadeInRight">
        <h3>{hero.superhero}</h3>
        <ul className="list-group  list-group-flush">
          <li className="list-group-item"><b>Alter Ego:</b> {hero.alter_ego} </li>
          <li className="list-group-item"><b>Publisher:</b> {hero.publisher} </li>
          <li className="list-group-item"><b>First Appereance:</b> {hero.first_appearance} </li>
        </ul>

        <h5 className='mt-3'> Characters</h5>
        <p>{hero.characters}</p>

        <button 
              className='btn btn-outline-primary w-25'
              onClick={onNavigateBack}
        >Return</button>
      </div>
    </div>
    
  )
}

