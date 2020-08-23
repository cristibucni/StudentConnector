export const QUIZ_TYPES = {
    MULTIPLE_CHOICES_UNIQUE_VALID: 'multiple choices unique valid',
    MULTIPLE_CHOICES_MULTIPLE_VALID: 'multiple choices multiple valid',
    USER_INPUT: 'user input',
};

export const QUIZ_CONFIG = [
    {
        title: 'Sacrifices',
        questions: [
            {
                id: 0,
                type: QUIZ_TYPES.MULTIPLE_CHOICES_UNIQUE_VALID,
                title: 'Do you?',
                answerOptions: ['No', 'Yes'],
                answer: 'Yes',
            },
            {
                id: 1,
                type: QUIZ_TYPES.MULTIPLE_CHOICES_MULTIPLE_VALID,
                title: 'Do you really?',
                answerOptions: ['yes', 'no'],
                answer: ['no'],
            },
            {
                id: 2,
                type: QUIZ_TYPES.MULTIPLE_CHOICES_MULTIPLE_VALID,
                title: 'Intrebare buna',
                answerOptions: ['ha', 'he'],
                answer: ['ha', 'he'],
            },
        ],
    },
    {
        title: 'Sad lief',
        questions: [
            {
                id: 3,
                type: QUIZ_TYPES.USER_INPUT,
                title: 'Who shot ya?',
                answerOptions: '',
                answer: 'Biggie Smalls',
            },
            {
                id: 4,
                type: QUIZ_TYPES.MULTIPLE_CHOICES_UNIQUE_VALID,
                title: 'Who is better?',
                answerOptions: ['you', 'still you'],
                answer: 'you',
            },
        ],
    },
    {
        title: 'Totomeda',
        questions: [
            {
                id: 5,
                type: QUIZ_TYPES.USER_INPUT,
                title: 'Cine suntem?',
                answerOptions: '',
                answer: 'augh augh',
            },
            {
                id: 6,
                type: QUIZ_TYPES.MULTIPLE_CHOICES_UNIQUE_VALID,
                title: 'Coca?',
                answerOptions: ['cola', 'ina'],
                answer: 'ina',
            },
            {
                id: 7,
                type: QUIZ_TYPES.USER_INPUT,
                title: 'Eu nu strivesc corola de minuni a?',
                answerOptions: '',
                answer: 'lumii',
            },
        ],
    },
    {
        title: 'Microsoft',
        questions: [
            {
                id: 8,
                type: QUIZ_TYPES.USER_INPUT,
                title: 'Ce faci?',
                answerOptions: '',
                answer: 'nimic',
            },
            {
                id: 9,
                type: QUIZ_TYPES.MULTIPLE_CHOICES_UNIQUE_VALID,
                title: 'French Montana?',
                answerOptions: ['Hotel Bathroom', 'Trippin'],
                answer: 'Hotel Bathroom',
            },
            {
                id: 10,
                type: QUIZ_TYPES.USER_INPUT,
                title: 'Smart?',
                answerOptions: '',
                answer: 'water',
            },
        ],
    },
    {
        title: 'Astea sunt toate multiple',
        questions: [
            {
                id: 11,
                type: QUIZ_TYPES.MULTIPLE_CHOICES_MULTIPLE_VALID,
                title: 'Pai de ce?',
                answerOptions: ['D-aia', 'Ne d-aia'],
                answer: ['D-aia', 'Ne d-aia'],
            },
            {
                id: 12,
                type: QUIZ_TYPES.MULTIPLE_CHOICES_MULTIPLE_VALID,
                title: 'De ce are bug?',
                answerOptions: ['Nu', 'Da'],
                answer: ['Nu'],
            },
            {
                id: 13,
                type: QUIZ_TYPES.MULTIPLE_CHOICES_MULTIPLE_VALID,
                title: 'De ce nu are bug',
                answerOptions: ['a', 'b'],
                answer: ['b'],
            },
            {
                id: 14,
                type: QUIZ_TYPES.MULTIPLE_CHOICES_MULTIPLE_VALID,
                title: 'Unfair quiz?',
                answerOptions: ['Yes', 'Definitely'],
                answer: ['Yes', 'Definitely'],
            },
        ],
    },
];

export const QUIZ_POINTS = {
    CORRECT_ANSWER: 1,
    INCORRECT_ANSWER: 0,
};
