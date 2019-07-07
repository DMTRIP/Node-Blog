CKEDITOR.replace('editor1');

// ckeditor textarea  post data

function CKupdate() {
  for (instance in CKEDITOR.instances) {
    CKEDITOR.instances[instance].updateElement();
    CKEDITOR.instances[instance].setData('');
  }
}

const postYes = document.querySelector('.publish-post');
const deleteYes = document.querySelector('.delete-yes');

// parse CKEDITOR data for to match mongoose post schema
class ParseData {
  title(data) {
    // checking if there is any <h1> <h2> etc tags
    const isTag = data.search('/<h.>/');
    if (isTag) {
      // choose tag with the smallest digit
      const smallest = Math.min.apply(null, data.match(/\d+/g));
      const firstIndex = data.indexOf(`<h${smallest}>`);
      const lastIndex = data.indexOf(`</h${smallest}>`);
      return data.slice(firstIndex + 4, lastIndex);
    }
  }

  postImage(data) {
    // take first image src address for main post page
    const src = data.match(/src="(.*?)\"/);
    return src ? src[1] : '';
  }
}
const parse = new ParseData();
// send data to server and clear textarea
postYes.addEventListener('click', async (e) => {
  // cancel submit stay on the page
  e.preventDefault();

  const data = CKEDITOR.instances.editor1.getData();
  console.log(data);
  const title = parse.title(data);
  // url
  const postImage = parse.postImage(data);
  // document.cookie = 'id=5d1e35c66449bd7317ca971d';
  // console.log(document.cookie);

  const res = await fetch('/post/create', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ title, postImage, body: data }),
  });

  if(res.status === 201) {
    alert('post was created');
    CKupdate();
  } else {
    alert('post was not created try again');
  }


});

// clear textarea
deleteYes.addEventListener('click', (e) => {
  e.preventDefault();
  CKupdate();
});
