const submit = document.querySelector('.post-comment');
const commentArr = [];

submit.addEventListener('click', async (e) => {
  e.preventDefault();

  const massage = document.querySelector('.text-area-messge').value;
  const massageInput = document.querySelector('.text-area-messge');
  //
  const id = massageInput.getAttribute('id');
  console.log(id);
  if (massage !== '') {
    const res = await fetch('/post/comment', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ massage, id }),
    });


    if (res.status === 200) {
      // place for append comment
      const commentArea = document.querySelector('.new-comment');
      // user's id
      const { author } = await res.json();
      // post's author
      const userRes = await fetch(`/user/one/${author}`);
      const Author = await userRes.json();
      const { name } = Author.user;

      const commentRes = await fetch(`/post/comment/last/${id}`);
      const comment = await commentRes.json();
      // date create of comment
      const { created } = comment.comment;
      console.log(comment.comment);


      const div = document.createElement('div');
      console.log(Author.user);
      const auhtorAvatar = '/uploads/default-images/profiledefault.png';

      const template = `
     <div class="commnets-area new-comment ">

 <div class="comment temp-comment">

							<div class="post-info">

								<div class="left-area">
									<a class="avatar" href="#"><img src="${auhtorAvatar}" alt="Profile Image"></a>
								</div>

								<div class="middle-area">
									<a class="name" href="#"><b>${name}</b></a>
									<h6 class="date">${created}</h6>
								</div>

							</div><!-- post-info -->

							<p>${massage}</p>

						</div> 
                 </div>
`;

      div.innerHTML = template;

      commentArr.push(div);
      const div2 = document.createElement('div');
      console.log(commentArr.length);
      commentArea.innerHTML = '';
      commentArr.reverse();
      commentArr.map((e) => {
        commentArea.appendChild(e);
      });
    }
  } else {
    alert('comment was not added try again');
  }

});
