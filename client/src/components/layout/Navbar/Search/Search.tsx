import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react'
import { FaFolderOpen } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { Iproject, IStoreProps, Iuser } from '../../../../types';

// Import Styling
import './Search.scss';

let Search = ({ usersStore, projectStore}: IStoreProps) => {

  const [searchInput, setSearchInput] = useState('');
  const [searchDisplay, setSearchDisplay] = useState(false);
  const [searchResults, setSearchResults] = useState({ projects: [], users: [] });

  const userLengthCondition = searchResults.users.length > searchResults.projects.length;

  useEffect(() => {
    usersStore.fetchUsers();
    projectStore.fetchProjects();
    
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
          <h3 className="result-heading">Results (Showing {userLengthCondition ? searchResults.users.slice(0,4).length : searchResults.projects.length === 0 && searchResults.users.length === 0 ? '0' : searchResults.projects.slice(0,4).length} of {userLengthCondition ? searchResults.users.length : searchResults.projects.length})</h3>
            {userLengthCondition ? 
              searchResults.users.slice(0,4).map((user: Iuser) => <NavLink className="result" to={`/profile/${user._id}`}><img src={`${process.env.PUBLIC_URL}/uploads/profile/${user.profileIcon}`} alt="Profile Icon" className="profile-pic" /><span className="name">{user.name}</span></NavLink>)
              : searchResults.projects.slice(0,4).map((project: Iproject) => <NavLink className="result" to={`/project/${project._id}`}><FaFolderOpen className="icon" /><span className="name">{project.name}</span></NavLink>)            
            }
          </>) : ''}
        </div>
      </div>
  )
}

Search = inject("usersStore", "projectStore")(observer(Search));

export default Search;
