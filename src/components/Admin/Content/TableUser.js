

const TableUser = (props) => {
    const { listUser } = props
    return (
        <div>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>


                </thead>
                <tbody>
                    {listUser && listUser.length > 0
                        &&
                        listUser.map((item, index) => {
                            return (
                                <tr key={`table-user-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className="btn btn-secondary">View</button>
                                        <button className="btn btn-warning mx-3" onClick={() => props.handleEditBtn(item)}>Update</button>
                                        <button className="btn btn-danger" onClick={() => props.handleDeleteBtn(item)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listUser && listUser.length === 0
                        && <tr>
                            <td colSpan={4}>Not Found Data</td>
                        </tr>}

                </tbody>
            </table>
        </div>
    )
}

export default TableUser;