import ReactPaginate from "react-paginate"
import { useTranslation } from 'react-i18next';

const TableUserPaginate = (props) => {
    const { t } = useTranslation();
    const { listUser, pageCount, currentPage, setCurrentPage } = props


    const handlePageClick = (event) => {

        props.fetchListUserWithPaginate(+event.selected + 1)

        console.log(`User requested page number ${event.selected + 1}`);
        setCurrentPage(event.selected + 1)
    };

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">{t('Admin.Manage-Users.Username')}</th>
                        <th scope="col">Email</th>
                        <th scope="col">{t('Admin.Manage-Users.Role')}</th>
                        <th scope="col">{t('Admin.Manage-Users.Action')}</th>
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
                                        <button className="btn btn-secondary" onClick={() => props.handleViewBtn(item)}>{t('Admin.Manage-Users.View')}</button>
                                        <button className="btn btn-warning mx-3" onClick={() => props.handleEditBtn(item)}>{t('Admin.Manage-Users.Update')}</button>
                                        <button className="btn btn-danger" onClick={() => props.handleDeleteBtn(item)}>{t('Admin.Manage-Users.Delete')}</button>
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
            <div className="d-flex justify-content-center">
                <ReactPaginate

                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< Previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={currentPage - 1}
                />
            </div>
        </>
    )
}

export default TableUserPaginate;