const assert = require('power-assert');
const posthtml = require('../posthtml');

const case1 = undefined;
const case2 = {
  resolution: false,
  responsive: false
};

describe('common', () => {

  it(`Not use.`, () => {
    const html = `<img src="path/to/filename.png">`;
    const correct = `<img src="path/to/filename.png">`;

    const res = posthtml(html, case1);

    assert.equal(res, correct);
  });

  it(`Query.`, () => {
    const html = `<img src="path/to/filename@2x.png?foo=bar">`;
    const correct = `<img src="path/to/filename.png?foo=bar" srcset="path/to/filename@2x.png?foo=bar 2x">`;

    assert.equal(posthtml(html, case1), correct);
  });

  it(`Multi line check.`, () => {
    const html = `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
</head>
<body>
<img src="notuse.jpg" alt="">
<img src="path/query@2x.jpg?foo=bar" alt="">
<figure>
    <img src="path/to/noext" srcset="1x, 2x, 3x" alt="">
</figure>
<div>
    <img src="path/to/noext?foo=bar" srcset="1x, 2x, 3x" alt="">
</div>
</body>
</html>`;
    const correct = `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
</head>
<body>
<img src="notuse.jpg" alt="">
<img src="path/query.jpg?foo=bar" alt="" srcset="path/query@2x.jpg?foo=bar 2x">
<figure>
    <img src="path/to/noext" srcset="path/to/noext@2x 2x,path/to/noext@3x 3x" alt="">
</figure>
<div>
    <img src="path/to/noext?foo=bar" srcset="path/to/noext@2x?foo=bar 2x,path/to/noext@3x?foo=bar 3x" alt="">
</div>
</body>
</html>`;

    assert.equal(posthtml(html, case1), correct);
  });

  it(`Not Change. has srcset. img`, () => {
    const html = `<img src="path/to/filename.png" srcset="2x">`;
    const correct = html;

    const res = posthtml(html, case2);

    assert.equal(res, correct);
  });

  it(`Not Change. has srcset. source`, () => {
    const html = `<picture>
<source media="large" srcset="1x, 2x, 3x">
  <source media="medium" srcset="1x, 2x, 3x">
<img src="path/to/filename.png" srcset="2x">
</picture>`;
    const correct = html;

    const res = posthtml(html, case2);

    assert.equal(res, correct);
  });

  it(`Not Change. has not srcset. img`, () => {
    const html = `<img src="path/to/filename@2x.png">`;
    const correct = html;

    const res = posthtml(html, case2);

    assert.equal(res, correct);
  });

  it(`Not Change. has not srcset. source`, () => {
    const html = `<picture>
<source media="large" src="path/to/filename@3x.png">
  <source media="medium" src="path/to/filename@3x.png">
<img src="path/to/filename@2x.png">
</picture>`;
    const correct = html;

    const res = posthtml(html, case2);

    assert.equal(res, correct);
  });

});
