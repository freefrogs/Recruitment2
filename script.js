document.addEventListener('DOMContentLoaded', () => {
  const writeQuestion = () => {
    const question = document.querySelector('.question');
    question.innerHTML = 'Czy lubisz kawę?';
    question.classList.add('typing');
  };
  writeQuestion();

  setTimeout(() => {
    const form = document.querySelector('form');
    form.classList.remove('hide');
  }, 2000);

  const sendMessage = (e) => {
    e.preventDefault();

    const inputs = [...document.querySelectorAll('input[type="radio"]')];
    const resultBox = document.querySelector('#result');

    resultBox.innerHTML = '<p class="response">waiting...</p>';

    let result = '';

    inputs.forEach(i => {
      if (i.checked) {
        result = i.defaultValue;
      }
    });

    const randomAnswer = Math.random();
    let url = 'https://jsonplaceholder.typicode.com';
    if (randomAnswer > 0.5) {
      url = 'https://jsonplaceholder.typicode.com/posts';
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        title: result,
        body: 'bar',
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(res => {
        let msg = '';
        if (res.status >= 400) {
          msg = `Coś poszło nie tak, kod odpowiedzi: ${res.status}`;
        } else {
          msg = `Twoja odpowiedź to: ${result}`;
        }
        resultBox.innerHTML = `<p class="response">${msg}</p>`;
      })
      .catch(err => console.error(err));
  };
  const answerForm = document.querySelector('.answerForm');
  answerForm.addEventListener('submit', sendMessage);
});
