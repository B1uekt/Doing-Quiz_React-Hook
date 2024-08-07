import { useEffect, useState } from 'react';
import { BiSolidFolderPlus } from "react-icons/bi"
import { useSelector } from 'react-redux'
import { postUpdateProfile } from '../../services/UserServices';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import _ from 'lodash';
const UserInfor = (props) => {
    const { handleClose } = props
    const account = useSelector(state => state.user.account)
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [role, setRole] = useState('')
    const [img, setImg] = useState('')
    const [previewImg, setPreviewImg] = useState('')

    useEffect(() => {
        if (account && !_.isEmpty(account)) {
            setEmail(account.email)
            setUserName(account.username)
            setRole(account.role)
            setImg(account.image)
            setPreviewImg(`data:image/jpeg;base64,${account.image}`)
        }
    }, [account])

    const handleChangeImg = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImg(URL.createObjectURL(event.target.files[0]))
            setImg(event.target.files[0])
        }
        else {
            setPreviewImg("")
        }
    }

    const handleUpdateProfile = async () => {
        let res = await postUpdateProfile(userName, img)
        if (res && res.EC === 0) {
            handleClose()
            toast.success(res.EM)
        }
    }
    return (
        <>
            <form className="row g-3 profile">
                <div className="col-md-4">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={userName}
                        onChange={(event) => setUserName(event.target.value)} />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Email</label>
                    <input
                        disabled
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Role</label>
                    <input
                        disabled
                        type="role"
                        className="form-control"
                        value={role}
                        onChange={(event) => setRole(event.target.value)} />
                </div>
                <div className="col-md-4">
                    <label className='label-upload d-flex' htmlFor='labelUpload'>
                        <BiSolidFolderPlus /> Upload File Image
                    </label>
                    <input onChange={(event) => handleChangeImg(event)} hidden id='labelUpload' type="file"></input>
                </div>
                <div className='col-md-12 preview-img'>
                    {previewImg ?
                        <img alt="" src={previewImg} />
                        :
                        <span>Preview Image</span>
                    }
                </div>
            </form>
            <div className='btn-action d-flex justify-content-end'>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleUpdateProfile()}>
                    Save Changes
                </Button>
            </div>
        </>
    )
}
export default UserInfor