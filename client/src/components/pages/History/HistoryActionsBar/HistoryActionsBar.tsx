import React, { useEffect } from 'react'

// Import Style
import './HistoryActionsBar.scss';

// Import Types
import { IChangeStore } from '../../../../types';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Props Interface
interface PropsI {
    changeStore?: IChangeStore
}

let HistoryActionsBar = ({ changeStore }: PropsI) => {

    useEffect(() => {
        changeStore!.fetchChanges();
    }, [changeStore]);

    const sortByHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        changeStore!.changeSort(e.target.value);
    }

    return (
        <div className="history-actions-bar">
            
            <label htmlFor="sort-select">Sort By</label>

            <select className="sort-select" id="sort-select" value={changeStore!.changesSort} onChange={sortByHandler}>

                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>

            </select>
            
        </div>
    )

}

// Inject Store
HistoryActionsBar = inject('changeStore')(observer(HistoryActionsBar));

export default HistoryActionsBar
