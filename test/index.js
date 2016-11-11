/* eslint-env mocha */
import assert from 'assert'
import { getPicturesSize } from '../src/index'

let galleryWidth = 1024
let screenHeight = 768
let picture = [
  { width: 2048, height: 1024 }
]

describe('Sharepear Gallery Picture Size', () => {
  describe('getPicturesSize pictures', () => {
    it('should return an object with pictures key', () => {
      assert.ok(getPicturesSize(picture, galleryWidth, screenHeight).pictures)
    })
  })

  describe('getPicturesSize galleryWidth', () => {
    it('should return an object with galleryWidth key', () => {
      let gallery = getPicturesSize(picture, galleryWidth, screenHeight)
      assert.equal(gallery.galleryWidth, galleryWidth)
    })
  })

  describe('getPicturesSize idealHeight', () => {
    let gallery = getPicturesSize(picture, galleryWidth, 1000 / 3)

    it('should return an object with idealHeight key', () => {
      assert.ok(gallery.idealHeight)
    })

    it('should return idealHeight with width / 2 arround', () => {
      assert.equal(gallery.idealHeight, 166.67)
    })
  })

  describe('getPicturesSize pictures ratio', () => {
    const picturesRatio = [
      { width: 1, height: 1, ratio: 1 },
      { width: 2, height: 3, ratio: 0.6666666666666666 },
      { width: 3, height: 2, ratio: 1.5 },
      { width: 3, height: 4, ratio: 0.75 },
      { width: 5, height: 3, ratio: 1.6666666666666667 },
      { width: 5, height: 4, ratio: 1.25 },
      { width: 8, height: 5, ratio: 1.6 },
      { width: 16, height: 9, ratio: 1.7777777777777777 }
    ]
    const gallery = getPicturesSize(picturesRatio, galleryWidth)

    it('should return an object with picture.ratio key', () => {
      for (let i = 0; i < picturesRatio.length; i++) {
        assert.equal(picturesRatio[i].ratio, gallery.pictures[i].ratio)
      }
    })
  })
})
