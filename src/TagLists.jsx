import React from 'react';

const TagLists = ({item}) => {
    const {
        has_synonyms,
        is_moderator_only,
        is_required,
        count,
        name
    } = item || {};
    return (
        <div className='list-individual-container'>
            <div className='header'>{name}</div>
            <div className='row-details'>
                <label>Has Synonyms:</label>
                <span>{has_synonyms ? 'True' : 'False'}</span>
            </div>
            <div className='row-details'>
                <label>Is Moderator Only:</label>
                <span>{is_moderator_only ? 'True' : 'False'}</span>
            </div>
            <div className='row-details'>
                <label>Is Required:</label>
                <span>{is_required ? 'True': 'False'}</span>
            </div>
            <div className='row-details'>
                <label>Count:</label>
                <span>{count}</span>
            </div>
            {/* <div className='row-details'>
                <label>Name:</label>
                <span>{name}</span>
            </div> */}
        </div>
    )
}

export default TagLists;