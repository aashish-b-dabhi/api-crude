import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Api = () => {

    let [data, setdata] = useState([])
    let [product, setproduct] = useState({})
    let [view, setview] = useState({})

    // get data
    let GetData = async () => {

        let result = await axios.get("http://localhost:3001/user")
        console.log(result);

        setdata(result.data)

    }

    // post data
    let AddData = async () => {

        let result = await axios.post("http://localhost:3001/user", product)
        console.log(result.data);

        setproduct([...product, result.data])

    }

    let handle = (e) => {

        setproduct({ ...product, [e.target.name]: e.target.value })

    }

    // delete
    let Delete = async (id) => {
        console.log(id);

        let result = await axios.delete(`http://localhost:3001/user/${id}`)
        console.log(result);

        setdata(data.filter((val) => val.id != id))

    }

    // update

    function Viewdata(user) {

        setview(user)

    }

    function handelview(e) {

        setview({ ...view, [e.target.name]: e.target.value })

    }

    function updateUser() {

        let result = axios.put(`http://localhost:3001/user/${view.id}`, view)
        console.log(result);

        setdata(
            data.map((val, index) => (val.id == result.data.id ? { ...view } : val))
        )

    }


    useEffect(() => {
        GetData()
    }, [])

    return (
        <>
            <div className="container-fluid mt-3">
                <label>First-Name : </label>
                <input type="text" name='firstname' onChange={handle} className='form-control border border-secondary'style={{width:"20%"}}/><br /><br />
                <label>Last-Name : </label>
                <input type="text" name='lastname' onChange={handle} className='form-control border border-secondary'style={{width:"20%"}}/><br /><br />
                <button className='btn btn-dark' onClick={AddData}>Add</button><br /><br />

                {data.map((val, index) => {
                    return (
                        <>
                            <h6>{val.id}</h6>
                            <h4>{val.firstname}</h4>
                            <h4>{val.lastname}</h4>
                            <button className='btn btn-outline-dark mb-4 me-2' onClick={() => Delete(val.id)}>Delete</button>
                            <button className='mb-4 btn btn-outline-dark' type="button" data-bs-toggle="modal" onClick={() => Viewdata(val)} data-bs-target="#exampleModal" data-bs-whatever="@mdo">View</button>

                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-body">
                                            <label>First-Name : </label>
                                            <input type="text" name='firstname' value={view.firstname} onChange={handelview} /><br /><br />
                                            <label>Last-Name : </label>
                                            <input type="text" name='lastname' value={view.lastname} onChange={handelview} /><br /><br />
                                            <button type="button" data-bs-dismiss="modal" onClick={updateUser} class="btn btn-dark">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default Api