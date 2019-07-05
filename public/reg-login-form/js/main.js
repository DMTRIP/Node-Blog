window.addEventListener('load', () => {
  const name = document.querySelector('#name');
  const email = document.querySelector('#email');
  const pass = document.querySelector('#pass');
  const rePass = document.querySelector('#rePass');

  // собирает значения валадации инпутов
  const canSubmin = new Map();
  // display validation status for input
  const validDisplay = (res, e, name) => {
    if (res === null) {
      e.style.borderColor = 'red';
      e.previousElementSibling.style.top = '28%';
      e.nextElementSibling.style.visibility = 'visible';
    } else {
      canSubmin.set(name, true);
      e.style.borderColor = '#999';
      e.nextElementSibling.style.visibility = 'hidden';
    }
  };

  name.addEventListener('change', function (e) {
    const regex = /^[\w'\-,.][^0-9_!¡?÷?¿\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    const res = e.target.value.match(regex);
    validDisplay(res, this, 'name');
  });
  email.addEventListener('change', function (e) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const res = e.target.value.match(regex);
    validDisplay(res, this, 'email');
  });
  let inputPass;
  pass.addEventListener('change', function (e) {
    inputPass = e.target.value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,100})/;
    const res = e.target.value.match(regex);
    validDisplay(res, this, 'pass');
  });
  rePass.addEventListener('change', function (e) {
    const regex = /^[\w'\-,.][^0-9_!¡?÷?¿\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    const res = e.target.value === inputPass ? true : null;
    validDisplay(res, this, 'rePass');
  });

  const submit = document.querySelector('.form-submit');
  submit.addEventListener('click', async (e) => {
    if (canSubmin.size !== 4) e.preventDefault();

    const captcha = grecaptcha.getResponse();
    console.log(captcha);
    if (captcha.length == 0) {
      e.preventDefault();
    }

    const res = await fetch('/user/sign-up-re-captcha', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ captcha }),
    });
    const data = await res.json();
    // display err text Please complete the Captcha
    const captchaFailed = document.querySelector('.captcha-failed');

    if (!data.success) {
      e.preventDefault();
      captchaFailed.style.visibility = 'visible';
    } else {
      captchaFailed.style.visibility = 'hidden';
    }
  });

});
