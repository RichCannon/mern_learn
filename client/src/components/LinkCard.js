import React, {useState} from "react";

export const LinkCard = ({clicks,link}) => {


    return (
        <div style={styles.cont}>
            <div>
                <b>{`Original link:`}</b>
                <a target={'_blank'} rel={'noopener noreferrer'}
                   href={link.from}>{link.from}</a>
            </div>
            <div>
                <b>{`Short link: `}</b>
                <a target={'_blank'} rel={'noopener noreferrer'}
                   href={link.to}>{link.to} </a>
            </div>
            <div><b>{`Date:`}</b> {`${new Date(link.date)}`} </div>
            <div><b>{`Clicks counter: `}</b>{link.clicks}</div>
        </div>
    )
}

const styles = {
    cont: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: '2rem'
    }
}
