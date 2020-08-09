import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App'; 

const Profile = () => {
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(UserContext)
    useEffect(() => {
        fetch('/mypost', {
            headers: {
                "Authorization": "Bearer " +localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setData(result.myposts)
            })
    }, [])
    return (
        <div className="profile">
            <div style={{
                display: "flex",
                justifyContent : "space-around",
                margin: "18px 0px",
                borderBottom:"1px solid grey"
            }}>
                <div>
                    <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                        src="https://images.unsplash.com/flagged/photo-1578848151039-b8916d7c1c34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                     />
                 </div>
                <div>
                    <h4>{state?state.name:"loading"}</h4>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "108%"

                        }}>
                        <h6>{data.length} posts</h6>
                        <h6>40 followers</h6>
                        <h6>40 following</h6>

                    </div>
                </div>
            </div>
            <div className="gallery">
                {
                    data.map(item=> {
                        return (
                            <img className="item" key={item._id} src={item.photo} alt={item.title} />
                        )
                    })
                }                
            </div>
        </div>
    )
}
export default Profile