/* eslint-env mocha */
import assert from 'assert'
import getPicturesSize from '../sharepear-gallery-picture-size'

describe('Sharepear Gallery Picture Size', () => {
  describe('getPicturesSize', () => {
    it('should return an array', () => {
      assert.deepEqual(getPicturesSize(['test'], 0).pictures, ['test'])
    })
  })
})
