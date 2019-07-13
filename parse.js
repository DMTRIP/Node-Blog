// Class which has all parse method

class Parse {
   date() {
    // takes this date format Sat Jul 13 2019 16:00:33 GMT+0300 (Eastern European Summer Time)
    // from Date().toLocaleString('en-US', { hour12: false })
    // and return Sat Jul 13 2019 16:00:33
    // this date uses for posts, comments, likes and users
    const date = Date().toLocaleString('en-US', { hour12: false });
    const firstIndex = date.indexOf('GMT');
    return date.slice(0, firstIndex);
  }
}

module.exports = new Parse();