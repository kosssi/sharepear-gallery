# sharepear-gallery-picture-size

![NPM Licence shield](https://img.shields.io/npm/l/sharepear-gallery-picture-size.svg)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Build Status](https://travis-ci.org/kosssi/sharepear-gallery-picture-size.svg?branch=master)](https://travis-ci.org/kosssi/sharepear-gallery-picture-size)

Calculate each picture size to build perfect gallery.

# How it work

Install it on your project:

    npm install --save sharepear-gallery-picture-size

Import it on your code:

    import { getPicturesSize } from sharepear-gallery-picture-size

Use it like that:

    const pictures = [
      { width: 1024, height: 1024 },
      { width: 512, height: 512 },
      { width: 512, height: 512 },
      { width: 256, height: 256 },
      { width: 256, height: 256 },
      { width: 256, height: 256 },
      { width: 256, height: 256 }
    ]
    const galleryWidth = 1024
    let picturesWithSize = getPicturesSize(pictures, galleryWidth)

# Thanks

Inspired by [Chromatic](http://www.chromatic.io/).

Thanks to [jtreitz](https://github.com/jtreitz) for writing [this article](https://medium.com/@jtreitz/the-algorithm-for-a-perfectly-balanced-photo-gallery-914c94a5d8af#.9nh1nys9y), I save it on `doc` folder.
