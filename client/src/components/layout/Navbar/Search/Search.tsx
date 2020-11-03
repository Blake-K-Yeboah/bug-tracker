import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Iproject, IStoreProps, Iuser } from '../../../../types';

// Import Styling
import './Search.scss';

let Search = ({ usersStore, projectStore}: IStoreProps) => {

  const [searchInput, setSearchInput] = useState('');
  const [searchDisplay, setSearchDisplay] = useState(false);
  const [searchResults, setSearchResults] = useState({ projects: [], users: [] });

  useEffect(() => {
    
    if (searchInput !== '') {
      setSearchDisplay(true);
      setSearchResults({ 
        users: usersStore.users.filter((user: Iuser) => user.name.toLowerCase().startsWith(searchInput.toLowerCase())), 
        projects: projectStore.projects.filter((project: Iproject) => project.name.toLowerCase().startsWith(searchInput.toLowerCase()))
      })
    } else {
      setSearchDisplay(false);
      setSearchResults({ projects: [], users: [] });
    }

  }, [searchInput, usersStore.users, projectStore.projects]);

  return (
      <div className="search">
        <input type="text" className={`search-input ${searchDisplay ? 'expand' : ''}`} placeholder="Search" value={searchInput} onChange={e => setSearchInput(e.target.value)} />
        <div className={`search-results ${searchDisplay ? '' : 'hidden'}`}>
          {searchDisplay ? (<>
            <h3 className="result-heading">Results ({searchResults.projects.length + searchResults.users.length})</h3>
            {searchResults.users.map((user: Iuser) => <NavLink className="result" to={`/profile/${user._id}`}>{user.name}</NavLink>)}
          </>) : ''}
        </div>
      </div>
  )
}

Search = inject("usersStore", "projectStore")(observer(Search));

export default Search;
