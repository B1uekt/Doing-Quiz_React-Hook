import CountDown from "./CountDown";

const RightContent = (props) => {

    const { dataQuiz } = props
    // console.log("check", dataQuiz)


    const onTimeUp = () => {
        props.handleFinish();
    }


    const getClassQuestion = (question) => {
        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find(a => a.isSelected === true)
            if (isAnswered) {
                return "question choosed"
            }
        }
        return "question";
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
                                onClick={() => props.setIndex(index)}
                                className={`${getClassQuestion(item)} ${props.index === index ? "clicked" : ""}`}
                            // className={getClassQuestion(item)}
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