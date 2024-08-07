
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { FaRegEyeSlash, FaEye } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { postChangePassword } from '../../services/UserServices';
const ChangePassword = (props) => {
    const { handleClose } = props
    const [currentPwd, setCurrentPwd] = useState('')
    const [newPwd, setNewPwd] = useState('')
    const [confirmPwd, setConfirmPwd] = useState('')
    const [isShowCurrentPassword, setShowCurrentPassword] = useState(false)
    const [isShowNewPassword, setShowNewPassword] = useState(false)
    const [isShowConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleChangePwd = async () => {
        if (!currentPwd || currentPwd.trim().length === 0) {
            toast.error("Invalid Current Password")
            return;
        }
        if (!newPwd || newPwd.trim().length === 0) {
            toast.error("Invalid New Password")
            return;
        }
        if (!confirmPwd || confirmPwd.trim().length === 0) {
            toast.error("Invalid Confirm Password")
            return;
        }
        if (newPwd !== confirmPwd) {
            toast.error("Confirm Password Is Wrong")
            return;
        }
        let res = await postChangePassword(currentPwd, newPwd)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            handleClose()
        }
        else {
            toast.error(res.EM)
        }
    }


    return (
        <form className="row g-3 change-pwd">
            <div className="col-md-6 pass-group">
                <label className="form-label">Current Password</label>
                <input
                    type={isShowCurrentPassword ? 'text' : 'password'}
                    className="form-control"
                    value={currentPwd}
                    onChange={(event) => setCurrentPwd(event.target.value)}
                />
                {isShowCurrentPassword ?
                    <span className='icons-eye' onClick={() => setShowCurrentPassword(false)}><FaEye /></span>
                    :
                    <span className='icons-eye' onClick={() => setShowCurrentPassword(true)}><FaRegEyeSlash /></span>
                }
            </div>
            <div className="col-md-6 pass-group">
                <label className="form-label">New Password</label>
                <input
                    type={isShowNewPassword ? 'text' : 'password'}
                    className="form-control"
                    value={newPwd}
                    onChange={(event) => setNewPwd(event.target.value)}
                />
                {isShowNewPassword ?
                    <span className='icons-eye' onClick={() => setShowNewPassword(false)}><FaEye /></span>
                    :
                    <span className='icons-eye' onClick={() => setShowNewPassword(true)}><FaRegEyeSlash /></span>
                }
            </div>
            <div className="col-md-6 pass-group">
                <label className="form-label">Confirm Password</label>
                <input
                    type={isShowConfirmPassword ? 'text' : 'password'}
                    className="form-control"
                    value={confirmPwd}
                    onChange={(event) => setConfirmPwd(event.target.value)}
                />
                {isShowConfirmPassword ?
                    <span className='icons-eye' onClick={() => setShowConfirmPassword(false)}><FaEye /></span>
                    :
                    <span className='icons-eye' onClick={() => setShowConfirmPassword(true)}><FaRegEyeSlash /></span>
                }
            </div>
            <div className='btn-action d-flex justify-content-end'>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleChangePwd()}>
                    Save Changes
                </Button>
            </div>
        </form>
    )
}

export default ChangePassword