const getTime = () => {
  const hours = new Date().getHours()
  let msg = ''
  if (hours < 10) {
    msg = '上午好'
  } else if (hours < 12) {
    msg = '中午好'
  } else if (hours < 18) {
    msg = '下午好'
  } else {
    msg = '晚上好'
  }
  return msg
}
export default getTime
