import React from 'react'

import classnames from 'classnames'

const TextToDo = ({id, title, author, done}) => {

    const stylesText = classnames('col-3', 'row', {
        'text-muted font-italic' : done,
        'line-through' : done
    });

    return (<div id="wrapper" className="container">
        <form>
            <div className="row" bgcolor="white" >
                <span className="col-1">{id}</span>
                <span className={stylesText}>{title}</span>
                <span className="col-2 row">{author}</span>
                <span className="col-2 row">{done ? 'Yes' : 'No'}</span>
            </div>
        </form>
    </div>)
}

export default TextToDo