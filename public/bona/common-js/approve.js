// APPROVE POST //

const publicBtn = [...document.querySelectorAll('.public-btn')];

console.log(publicBtn);

publicBtn.map((e) => {
  e.addEventListener('click', async function (e) {
    console.log(1);
    const id = this.parentElement.getAttribute('id');
    const res = await fetch(`/blog/for-approve/post/${id}/public`, { method: 'POST' });
    console.log(res);
    if (res.status !== 200) return;
    this.parentElement.parentElement.style.display = 'none';
    console.log(this.parentElement.parentElement.parentElement);
  });
});
