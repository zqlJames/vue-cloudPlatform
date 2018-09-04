/**
 * 生成n位随机正整数
 */

/**
 * @param n 正整数
 */
function getRandomNumber (n = 32) {
  let arr = []
  for (let i = 0; i < n; i++) {
    let randomItem = 0
    while (randomItem === 0) {
      randomItem = Math.floor(Math.random() * 10)
    }
    arr[i] = Math.floor(Math.random() * 10)
  }
  return Number(arr.join(''))
}

export default {
  getRandomNumber
}
