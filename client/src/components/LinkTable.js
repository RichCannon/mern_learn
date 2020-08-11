import React from "react";
import {Link} from "react-router-dom";

export const LinkTable = ({links}) => {
    let ind = 0;
    return (
        <table>
            <thead>
            <tr>
                <th>#</th>
                <th>Original link</th>
                <th>Short link</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {links.map(link => {return (
                <tr>
                    <td>{++ind}</td>
                    <td>{link.from}</td>
                    <td>{link.to}</td>
                    <td><Link to={`/detail/${link._id}`}>Open</Link></td>
                </tr>
            )})}
            </tbody>
        </table>
    )
}
