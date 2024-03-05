const container = document.querySelector(".container");
let source;
container.addEventListener("dragstart", (e) => {
  console.log(e.target.dataset.effect);
  e.dataTransfer.effectAllowed = e.target.dataset.effect;
  source = e.target;
});

container.addEventListener("dragover", (e) => {
  // console.log('dragover',e.target);
  e.preventDefault();
});

container.addEventListener("dragenter", (e) => {
  clearBg();
  const dropNode = getDropNode(e.target);
  if (dropNode && dropNode.dataset.drop === e.dataTransfer.effectAllowed) {
    e.target.classList.add("over-bg");
  }
  e.preventDefault();
});

container.addEventListener("drop", (e) => {
  clearBg();
  const dropNode = getDropNode(e.target);
  if (dropNode && dropNode.dataset.drop === e.dataTransfer.effectAllowed) {
		console.log("可以放置",dropNode.dataset);
    if (dropNode.dataset.drop === "copy") {
      console.log("可以拷贝");
			dropNode.innerHTML= ''
      const clone = source.cloneNode(true);
			clone.dataset.effect = "move"
      dropNode.appendChild(clone);
    } else {
			source.remove()
		}
  }
});

function getDropNode(node) {
  while (node) {
    console.log(node.dataset);
    if (node && node.dataset && node.dataset.drop) {
      return node;
    }
    node = node.parentNode;
  }
}

function clearBg() {
  document.querySelectorAll(".over-bg").forEach((node) => {
    node.classList.remove("over-bg");
  });
}
