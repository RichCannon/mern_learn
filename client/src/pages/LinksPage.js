import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {LinkTable} from "../components/LinkTable";

export const LinksPage = (props) => {
    const {token} = useContext(AuthContext)
    const {request, isLoading} = useHttp()
    const [links, setLinks] = useState()
    const getLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link/', 'GET', null, {
                authorization: `Bearer ${token}`
            })

            setLinks(fetched)
        } catch (e) {
        }
    }, [request, token])

    useEffect(() => {
        getLinks()
    }, [getLinks])

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div>
            {links && <LinkTable links={links}/>}
        </div>
    )
}
