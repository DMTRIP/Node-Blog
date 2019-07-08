const submit = document.querySelector('.form-submit');

submit.addEventListener('click', async (e) => {

  const captcha = grecaptcha.getResponse();
  console.log(captcha);

  if (captcha == '') e.preventDefault();

  const res = await fetch('/user/sign-up-re-captcha', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ captcha }),
  });

  const data = await res.json();

  if (!data.success) {
    e.preventDefault();
  }

});
