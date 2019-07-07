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
    return src[1];
  }
}

