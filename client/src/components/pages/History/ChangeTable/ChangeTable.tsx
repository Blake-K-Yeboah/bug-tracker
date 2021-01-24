import React from 'react'

// Import Styling
import './ChangeTable.scss';

// Import Types
import { IChangeStore } from '../../../../types';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Props Interface
interface PropsI {
    changeStore?: IChangeStore
}

let ChangeTable = ({ changeStore }: PropsI) => {

    const changeCount = changeStore!.changeCount;

    return (
        <div className="change-table-container">

            <h2 className="heading">Table of Changes ({changeCount} total)</h2>

            {changeCount === 0 ? <p style={{marginLeft: '1.75em'}}>No Changes</p>
            : <table className="change-table">
                
                <thead>
                    <tr className="head-row">
                        <th className="t-head">
                            Change
                        </th>
                        <th className="t-head">
                            Date
                        </th>
                    </tr>
                </thead>

            </table>}
        </div>
    )
}

ChangeTable = inject('changeStore')(observer(ChangeTable));

export default ChangeTable
