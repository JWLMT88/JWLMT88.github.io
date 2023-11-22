// JavaScript for collapsing questions
// JavaScript for collapsing questions
const questions = document.querySelectorAll('.question');

questions.forEach((question) => {
    const header = question.querySelector('.question-header');

    header.addEventListener('click', () => {
        question.classList.toggle('active');
    });
});
