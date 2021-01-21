import React, { useEffect, useState } from 'react';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Import Icons
import { FaFolderOpen } from 'react-icons/fa';

// Import NavLink
import { NavLink } from 'react-router-dom';

// Import Types
import { Iproject, IProjectStore, Iuser, IUsersStore } from '../../../../types';

// Import Styling
import './Search.scss';

// Props Interface
interface PropsI {
  usersStore?: IUsersStore,
  projectStore?: IProjectStore
}

// Search Results Interface
interface ISearchResults {
  projects: Iproject[],
  users: Iuser[]
}

let Search = ({ usersStore, projectStore}: PropsI) => {

  // Define State
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchDisplay, setSearchDisplay] = useState<boolean>(false);
  const [searchResults, setSearchResults]  = useState<ISearchResults>({ projects: [], users: [] });

  // Check whether there are more users than projects
  const userLengthCondition = searchResults.users.length > searchResults.projects.length;

  useEffect(() => {

    // Fetch Users and Projects
    usersStore!.fetchUsers();
    projectStore!.fetchProjects();
    
    // Check if there is any input
    if (searchInput !== '') {

      setSearchDisplay(true);

      setSearchResults({ 
        users: usersStore!.users.filter((user: Iuser) => user.name.toLowerCase().startsWith(searchInput.toLowerCase())), 
        projects: projectStore!.projects.filter((project: Iproject) => project.name.toLowerCase().startsWith(searchInput.toLowerCase()))
      });

    } else {

      setSearchDisplay(false);

      setSearchResults({ projects: [], users: [] });

    }

  }, [searchInput, usersStore, projectStore]);

  return (
      <div className="search">
        <input type="text" className={`search-input ${searchDisplay ? 'expand' : ''}`} placeholder="Search" value={searchInput} onChange={e => setSearchInput(e.target.value)} />
        <div className={`search-results ${searchDisplay ? '' : 'hidden'}`}>
          {searchDisplay ? (<>
          <h3 className="result-heading">Results (Showing {userLengthCondition ? searchResults.users.slice(0,4).length : searchResults.projects.length === 0 && searchResults.users.length === 0 ? '0' : searchResults.projects.slice(0,4).length} of {userLengthCondition ? searchResults.users.length : searchResults.projects.length})</h3>
            {userLengthCondition ? 
              searchResults.users.slice(0,4).map((user: Iuser) => <NavLink key={user._id} className="result" to={`/profile/${user._id}`}><img src={`${process.env.PUBLIC_URL}/uploads/profile/${user.profileIcon}`} alt="Profile Icon" className="profile-pic" /><span className="name">{user.name}</span></NavLink>)
              : searchResults.projects.slice(0,4).map((project: Iproject) => <NavLink key={project._id} className="result" to={`/project/${project._id}`}><FaFolderOpen className="icon" /><span className="name">{project.name}</span></NavLink>)            
            }
          </>) : ''}
        </div>
      </div>
  )
}

Search = inject("usersStore", "projectStore")(observer(Search));

export default Search;
