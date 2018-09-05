const updated_at = document.getElementsByClassName("updated_at")[0].innerHTML

function makeDate(dateStr) {
  const res = []
  const dateArr = dateStr.split(" ");
  res.push(dateArr[1], dateArr[2], dateArr[3])
  return res.join(" ");
}

console.log("makeDate: ", makeDate(updated_at))

document.getElementById("created-on")


// var parent = document.getElementById('parent');
// var firstChild = document.getElementById('first-child');
// var pTag = document.createElement('p');
// var text = document.createTextNode('This text is created dynamically');

// pTag.appenChild(text);
// parent.insertBefore(pTag, firstChild);


