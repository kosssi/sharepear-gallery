# sharepear-gallery

![NPM Licence shield](https://img.shields.io/npm/l/sharepear-gallery.svg)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Build Status](https://travis-ci.org/kosssi/sharepear-gallery.svg?branch=master)](https://travis-ci.org/kosssi/sharepear-gallery)

Calculate each picture size to build ideal gallery.

# How it work

Install it on your project:

    npm install --save sharepear-gallery

Import it on your code:

    import { getPicturesSize } from sharepear-gallery

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
    const windowHeight = 768
    let sharepearGallery = getPicturesSize(pictures, galleryWidth, windowHeight)

    console.log(sharepearGallery)

It display:

    {
        galleryWidth: 1024
        idealPictureHeight: 384
        partitions: [[100, 100], [100, 100], [100, 100, 100]]
        pictures: [
            { idealHeight: 512, idealWidth: 512, height: 1024, ratio: 1, width: 1024 },
            { idealHeight: 512, idealWidth: 512, height: 512, ratio: 1, width: 512 },
            { idealHeight: 512, idealWidth: 512, height: 512, ratio: 1, width: 512 },
            { idealHeight: 512, idealWidth: 512, height: 256, ratio: 1, width: 256 },
            { idealHeight: 512, idealWidth: 512, height: 256, ratio: 1, width: 256 },
            { idealHeight: 512, idealWidth: 512, height: 256, ratio: 1, width: 256 },
            { idealHeight: 512, idealWidth: 512, height: 256, ratio: 1, width: 256 },
        ]
    }

# Thanks

Inspired by [Chromatic](http://www.chromatic.io/).

Thanks to [jtreitz](https://github.com/jtreitz) for writing [this article](https://medium.com/@jtreitz/the-algorithm-for-a-perfectly-balanced-photo-gallery-914c94a5d8af#.9nh1nys9y), I save it on `doc` folder.
