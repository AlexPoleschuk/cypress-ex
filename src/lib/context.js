const QuestionType = {
    AUTH_DATA: "authDataQuestion",
    BASE_URL: "baseUrlQuestion",
};

const customContext = {
    activeChatId: "",
    activeQuestion: "",
};

function setActiveChatId(id) {
    customContext.activeChatId = id;
}

function setActiveQuestionType(message) {
    customContext.activeQuestion = message;
}

function getCustomContext() {
    return customContext;
}

function clearContext() {
    customContext.activeChatId = "";
    customContext.activeQuestion = "";
}

export {
    clearContext,
    getCustomContext,
    setActiveChatId,
    setActiveQuestionType,
    QuestionType,
};
