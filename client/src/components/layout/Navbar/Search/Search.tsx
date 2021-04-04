import React, { useEffect, useState } from 'react';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Import Icons
import { FaFolderOpen } from 'react-icons/fa';

// Import NavLink
import { NavLink } from 'react-router-dom';

// Import Types
import { IAuthStore, Iproject, IProjectStore, Iuser, IUsersStore } from '../../../../types';

// Import Styling
import './Search.scss';

// Props Interface
interface PropsI {
  usersStore?: IUsersStore,
  projectStore?: IProjectStore,
  authStore?: IAuthStore
}

// Search Results Interface
interface ISearchResults {
  projects: Iproject[],
  users: Iuser[]
}

// Individual Search Result Interface
interface IResult {
  type: string,
  user?: Iuser,
  project?: Iproject
}

let Search = ({ usersStore, projectStore, authStore}: PropsI) => {

  // Define State
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchDisplay, setSearchDisplay] = useState<boolean>(false);
  const [searchResults, setSearchResults]  = useState<ISearchResults>({ projects: [], users: [] });

  useEffect(() => {

    // Fetch Users and Projects
    usersStore!.fetchUsers();
    projectStore!.fetchProjects();
    
    // Check if there is any input
    if (searchInput !== '') {

      // Show Search Results 
      setSearchDisplay(true);

      // Set Search Results
      setSearchResults({ 
        users: usersStore!.users.filter((user: Iuser) => user.name.toLowerCase().startsWith(searchInput.toLowerCase())), 
        projects: projectStore!.projects.filter((project: Iproject) => project.name.toLowerCase().startsWith(searchInput.toLowerCase()) && (project.usersList.includes(authStore!.user.id) || project.owner === authStore?.user.id))
      });

    } else {

      setSearchDisplay(false);

      setSearchResults({ projects: [], users: [] });

    }

  }, [searchInput, usersStore, projectStore, authStore]);

  // Combine users and projects into one array to be displayed together
  const combinedSearchResults = [...searchResults.users.map(user => ({ type: 'user', user })), ...searchResults.projects.map(project => ({ type: 'project', project }))]

  return (
      <div className="search">
        <input type="text" className={`search-input ${searchDisplay ? 'expand' : ''}`} placeholder="Search" value={searchInput} onChange={e => setSearchInput(e.target.value)} />
        <div className={`search-results ${searchDisplay ? '' : 'hidden'}`}>
          {searchDisplay ? (<>
          <h3 className="result-heading">Results (Showing {combinedSearchResults.slice(0,4).length} of {combinedSearchResults.length})</h3>
            {combinedSearchResults.slice(0, 4).map((result: IResult) => {
              if (result.type === "user") {
                const user = result.user;
                return <NavLink key={user!._id} className="result" to={`/profile/${user!._id}`}><img src={`${process.env.PUBLIC_URL}/uploads/profile/${user!.profileIcon}`} alt="Profile Icon" className="profile-pic" /><span className="name">{user!.name}</span></NavLink>
              } else {
                const project = result.project;
                return <NavLink key={project!._id} className="result" to={`/project/${project!._id}`}><FaFolderOpen className="icon" /><span className="name">{project!.name}</span></NavLink>
              }
            })}
          </>) : ''}
        </div>
      </div>
  )
}

// Injects Stores
Search = inject("usersStore", "projectStore", "authStore")(observer(Search));

export default Search;
