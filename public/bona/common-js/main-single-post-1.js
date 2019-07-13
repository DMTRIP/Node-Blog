const submit = document.querySelector('.post-comment');
const commentHtmlArr = [];

// quick display comment with fetch without reload
submit.addEventListener('click', async (e) => {
  e.preventDefault();

  const massage = document.querySelector('.text-area-messge').value;
  const massageInput = document.querySelector('.text-area-messge');
  //
  const postId = massageInput.getAttribute('id');
  const authorId = massageInput.getAttribute('authorId');
  console.log(postId);
  if (massage !== '') {
    const res = await fetch('/blog/post/comment/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ massage, id: postId }),
    });
    const data = await res.json();
    const commentId = data.comment;


    if (res.status === 201) {
      // place for append comment
      const commentArea = document.querySelector('.new-comment');

      // post's author
      const userRes = await fetch(`/blog/user/${authorId}`);
      const Author = await userRes.json();
      const { name } = Author.user;

      const commentRes = await fetch(`/blog/post/comment/${commentId}`);
      const comment = await commentRes.json();

      // date create of comment
      const { created } = comment.comment;





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

						</div> </div>`;

      div.innerHTML = template;

      commentHtmlArr.push(div);
      const div2 = document.createElement('div');
      console.log(commentHtmlArr.length);
      commentArea.innerHTML = '';
      commentHtmlArr.reverse();

      commentHtmlArr.map((e) => {
        commentArea.appendChild(e);
      });
    }
  } else {
    alert('comment was not added try again');
  }
});

// more comments btn
const moreComments = document.querySelector('.more-comment-btn');

moreComments.addEventListener('click', async e => {
  const massageInput = document.querySelector('.text-area-messge');
  const postId = massageInput.getAttribute('id');
  const appendPlace = document.querySelector('.comment-loading');
  const commentRes = await fetch(`/blog/post/${postId}/comment/page/1`);
  const comment = await commentRes.json();
  console.log(comment);
  if(comment.page.length === 0) return;


  comment.page.map((e) => {
    const div = document.createElement('div');
    const template = `<div class="commnets-area new-comment ">
                            <div class="comment temp-comment">

							<div class="post-info">

								<div class="left-area">
									<a class="avatar" href="#"><img src="${e.authorAvatar}" alt="Profile Image"></a>
								</div>

								<div class="middle-area">
									<a class="name" href="#"><b>${e.authorName}</b></a>
									<h6 class="date">${e.created}</h6>
								</div>

							</div><!-- post-info -->

							<p>${e.massage}</p>

						</div> 
                     </div>`;

    div.innerHTML = template;
    // hide more-comment-btn
    document.querySelector('.more-comment-btn').style.display = 'none';
    appendPlace.appendChild(div);
  });
  const p = document.createElement('p');
  p.innerHTML = `<b> VIEW MORE COMMENTS </b>`;
  p.classList.add('more-comment-btn');
  appendPlace.appendChild(p);






});