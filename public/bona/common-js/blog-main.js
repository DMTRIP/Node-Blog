const load = document.querySelector('.load-more-btn');
const addPostArea = document.querySelector('.add-post');
let pageCount = 1;
load.addEventListener('click', async (e) => {
  const res = await fetch(`/user/:id/post/page${pageCount}`);

  if (res.status !== 200) return;
  pageCount++;

  const data = await res.json();
  const { page } = data;
  console.log(page);

  page.map((e) => {
    const div = document.createElement('div');
    const template = `<div class="card h-100">
                       <div class="single-post post-style-1">

                        <div class="blog-image"><img src="${e.preview}" alt="Blog Image"></div>

                        <a class="avatar" href="#"><img src="${e.authorAvatar}" alt="Profile Image"></a>

                        <div class="blog-info">

                         <h4 class="title"><a href="/blog/post/${e._id}"><b>${e.title}</b></a></h4>

                         <ul class="post-footer">
                          <li><a href="#"><i class="ion-heart"></i>57</a></li>
                          <li><a href="#"><i class="ion-chatbubble"></i>${e.comments.length}</a></li>
                          <li><a href="#"><i class="ion-eye"></i>e.views</a></li>
                         </ul>

                        </div><!-- blog-info -->
                       </div><!-- single-post -->
                      </div><!-- card --><!-- col-lg-4 col-md-6 -->`;
    div.classList.add('col-lg-4');
    div.classList.add('col-md-6');
    div.innerHTML = template;
    addPostArea.appendChild(div);
  });

});
