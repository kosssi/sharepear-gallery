import LinearPartitioning from 'linear-partitioning'

/**
 * Get Perfect Picture Height
 */
function getPerfectHeight (width) {
  return Math.round(width / 2 * 100) / 100
}

/**
 * Set for each picture the ratio
 */
function setPicturesRatio (pictures) {
  for (let picture of pictures) {
    picture.ratio = picture.width / picture.height
  }

  return pictures;
}

/**
 * Get summed width
 */
function getSummedWidth (pictures, perfectHeight) {
  let summedWidth = 0

  for (let picture of pictures) {
    summedWidth += picture.ratio * perfectHeight
  }

  return summedWidth
}

/**
 * Get partitions
 */
function getPartitions (pictures, summedWidth, galleryWidth) {
  const rows = Math.round(summedWidth / galleryWidth)

  const weights = pictures.map((picture) => {
    return parseInt(picture.ratio * 100)
  })

  return LinearPartitioning(weights, rows)
}

/**
 * Get pictures size
 */
function getPicturesSize (pictures, galleryWidth) {
  let picturesWithSize = JSON.parse(JSON.stringify(pictures)) // clone pictures
  picturesWithSize = setPicturesRatio(picturesWithSize)

  const perfectHeight = getPerfectHeight(galleryWidth)
  const summedWidth = getSummedWidth(picturesWithSize, perfectHeight)
  const partitions = getPartitions(picturesWithSize, summedWidth, galleryWidth)

  let indexStart = 0
  partitions.forEach((row) => {
    let indexEnd = indexStart + row.length
    const summedRatios = picturesWithSize.filter((picture, index) => {
      return index >= indexStart && index < indexEnd
    }).reduce((sum, picture) => {
      sum += picture.ratio
      return sum
    }, 0)

    for (let i = indexStart; i < indexEnd; i++) {
      var picture = picturesWithSize[i]
      picture.calculatedWidth =
        Math.round(galleryWidth / summedRatios * picture.ratio * 100) / 100
      picture.calculatedHeight =
        Math.round(galleryWidth / summedRatios * 100) / 100
    }

    indexStart = indexEnd
  })

  return {
    pictures: picturesWithSize,
    galleryWidth: galleryWidth,
    perfectHeight: perfectHeight,
    partitions: partitions
  }
}

export default getPicturesSize
