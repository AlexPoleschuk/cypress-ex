enum QuestionType {
    BASE_URL = "baseUrl",
}

const customContext = {
    activeChatId: "",
    activeQuestion: "",
};

function setActiveChatId(id) {
    customContext.activeChatId = id;
}

function setActiveQuestionType(message: QuestionType) {
    customContext.activeQuestion = message;
}

function getCustomContext() {
    return customContext;
}

export {
    getCustomContext,
    setActiveChatId,
    setActiveQuestionType,
    QuestionType,
};
