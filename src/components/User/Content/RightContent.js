import CountDown from "./CountDown";

const RightContent = (props) => {
    const { dataQuiz } = props
    // console.log("check", dataQuiz)
    const handleChooseQuestion = (index) => {
        props.setIndex(index);
    }

    const onTimeUp = () => {
        props.handleFinish();
    }

    return (
        <>
            <div className="main-timer">
                <CountDown
                    onTimeUp={onTimeUp} />
            </div>
            <div className="main-questions d-flex">
                {dataQuiz && dataQuiz.length > 0 && (
                    <>
                        {dataQuiz.map((item, index) => (
                            <div
                                key={`question-${index + 1}`}
                                onClick={() => handleChooseQuestion(index)}
                                className={props.index === index ? "question choose" : "question"}
                            >
                                <span>{index + 1}</span>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </>
    )
}
export default RightContent