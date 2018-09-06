const updated_at = document.getElementsByClassName("updated_at")[0].innerHTML

function makeDate(dateStr) {
  const res = []
  const dateArr = dateStr.split(" ");
  res.push(dateArr[1], dateArr[2], dateArr[3])
  return res.join(" ");
}

console.log("makeDate: ", makeDate(updated_at))

const createdOn = document.getElementById("created-on")
var element = document.createElement('span');
element.innerHTML = makeDate(updated_at)

createdOn.appendChild(element)