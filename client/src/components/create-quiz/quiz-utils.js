export const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
        e.target.blur();
    }
};

export const ERRORS_INFO = {
    NO_TITLE: 'Titlul este obligatoriu.',
    ANSWER_OPTION_MISSING: 'Răspuns lipsă.',
    LESS_THAN_4_ANSWER_OPTIONS: 'Patru variante de răspuns sunt obligatorii.',
    NO_UNIQUE_ANSWER: 'Trebuie să selectați o variantă de răspuns corectă.',
    NO_MULTIPLE_ANSWER: 'Trebuie să selectați cel puțin o variantă de răspuns corectă.',
    NO_USER_INPUT_ANSWER: 'Trebuie să introuceți răspunul corect',
    DUPLICATE_ANSWER_OPTION: 'Toate variantele trebuie să fie diferite',
    NO_QUESTIONS: 'Trebuie să introduceți cel putin o întrebare.',
    NO_CATEGORIES: 'Trebuie să introduceți cel puțin o categorie.',
    ANSWER_OPTION_WHITE_SPACE: 'Spațiile goale nu sunt permise',
};

export const FIELDS = {
    TITLE: 'title',
    DESCRIPTION: 'description',
    ANSWER_OPTION: 'answerOption',
    ANSWER: 'answer',
    CORRECT_ANSWER_SELECTOR: 'correctAnswerSelector',
    TYPE_SELECTOR: 'type',
};

export const OPTION_EMPTY = '';
