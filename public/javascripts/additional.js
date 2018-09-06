const updated_at = document.getElementsByClassName("updated_at")[0].innerHTML

function makeDate(dateStr) {
  const res = []
  const dateArr = dateStr.split(" ");
  res.push(dateArr[1], dateArr[2], dateArr[3])
  return res.join(" ");
}

console.log("makeDate: ", makeDate(updated_at))

document.getElementById("created-on")

document.getElementsByClassName("make-date").innerHTML = makeDate(updated_at);

