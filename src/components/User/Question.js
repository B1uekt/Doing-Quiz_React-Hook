import _ from 'lodash'
import { useState } from 'react';
import Lightbox from "react-awesome-lightbox";
const Question = (props) => {
    const { data, index } = props;
    const [isPreviewImage, setIsPreviewImage] = useState(false);


    if (_.isEmpty(data)) {
        return (<></>)
    }
    const handleHandleCheckBox = (event, aId, qId) => {
        // console.log('check: ', event.target.checked)
        // console.log('data props: ', aId, qId)
        props.handleCheckBox(aId, qId)
    }
    return (
        <>
            {data.image ? <div className='q-image'>
                <span style={{ cursor: 'pointer' }} onClick={() => setIsPreviewImage(true)}><img alt="" src={`data:image/jpeg;base64,${data.image}`}></img></span>
            </div>
                : <div className='q-image'>
                </div>
            }
            <div className='question'>
                Question {+index + 1}: {data.questionDesciption} ?
            </div>

            <div className='answer'>
                {data.answers && data.answers.length &&
                    data.answers.map((a, index) => {
                        return (
                            <div key={`answer-${index}`} className='a-child'>
                                <div className="form-check" >
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="flexCheckDefault"
                                        checked={a.isSelected}
                                        onChange={(event) => handleHandleCheckBox(event, a.id, data.questionId)}
                                    />
                                    <label className="form-check-label" >
                                        {a.description}
                                    </label>
                                </div>

                            </div>
                        )
                    }
                    )
                }
                {
                    isPreviewImage === true && <Lightbox image={`data:image/jpeg;base64,${data.image}`} title="Question Image" onClose={() => setIsPreviewImage(false)}></Lightbox>
                }
            </div >
        </>
    )
}
export default Question