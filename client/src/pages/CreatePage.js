import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from 'react-router-dom'

export const CreatePage = (props) => {
    const history = useHistory()
    const [link, setLink] = useState('')
    const {request} = useHttp()
    const auth = useContext(AuthContext)

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async e => {
        if (e.key === 'Enter') {
            try {
                const data = await request('api/link/generate', 'POST',
                    {from: link},
                    {authorization: `Bearer ${auth.token}`}
                )
                history.push(`detail/${data.link._id}`)

            } catch (e) {
                console.log(e);
            }
        }
    }

    return (
        <>
            <div className={'row'}>
                <div className="col s8 offset-s2">
                    <div className="input-field">
                        <input
                            placeholder={'Enter link'}
                            type={'text'}
                            id={'link'}
                            onChange={e => setLink(e.target.value)}
                            value={link}
                            onKeyPress={pressHandler}
                        />
                        <label>{'Create link'}</label>
                    </div>
                </div>
            </div>
            <Counter/>
        </>
    )
}


const Counter = () => {
    const {count, increase, decrease} = useCounter()

    return (<>
            <div>Count: {count}</div>
            <button onClick={increase}>+</button>
            <button onClick={decrease}>-</button>
        </>
    )
}

const useCounter = () => {
    const [count, setCount] = useState(0)

    const increase = useCallback(() => {
        console.log('increase')
        setCount(c => c+1)
    }, [])

    const decrease = useCallback(() => {
        console.log('decrease')
        setCount(null)
    }, [])


    return {count, increase, decrease}
}

