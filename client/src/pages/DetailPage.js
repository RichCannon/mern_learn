import React, {useCallback, useContext, useEffect, useState} from "react";
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {LinkCard} from "../components/LinkCard";

export const DetailPage = (props) => {
    const {token} = useContext(AuthContext)
    const [link, setLink] = useState(null)
    const {request, isLoading} = useHttp();
    const linkId = useParams().id

    const getLink = useCallback(async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                authorization: `Bearer ${token}`
            })
            setLink(fetched)

        }
        catch (e) {}
    }, [linkId,token,request])

    useEffect(()=>{
        getLink()
    },[getLink])


    if(isLoading) {
        return <Loader/>
    }
    return (
        <div>
            {link && <LinkCard link={link}/>}
        </div>
    )
}

