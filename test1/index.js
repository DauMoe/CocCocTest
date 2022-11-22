/**
 * @WHAT_HAPPEN_IN_THIS_CODE
 * 
 * well, as mentioned in the question, we wil use IntersectionObserver API to make an 'Infinity Scroll'. What should we do now?
 *  - Step 1: make sure DOM is loaded. You can control everything to don't worry about 'undefined' value :v
 *  - Step 2: on the first render time, let's get last item. We will add an observer event to it
 *  - Step 3: define a callback for Observer. Let it know what should do if this item is visible (isIntersecting)
 *  - Step 4: inside this callback, if the last item margin top 100px (we can define it in the options object), render more and more item to scroll and un-sub listen event (unobserve)
 *  - Step 5: Let play
 * 
 * So my question: What happen if the browser doesn't support IntersectionObserver API like IE old man? Can we use traditional way to do that?
 * My idea is "using listener event to handle the last item position and render more item - a handmade IntersectionObserver API :)))"
 */

async function runApp() {
  const data = await getData();
  await renderDataBlocks(data);
}

function handmadeIntersectionObserver() {
  const lastItemFirstRender = document.getElementsByClassName("item")[last-1];
  const rect = lastItemFirstRender.getBoundingClientRect();
  const visibleInViewport = rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 100 && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  if (visibleInViewport) {
    runApp();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if ("IntersectionObserver" in window) {
    const lastItemFirstRender = document.getElementsByClassName("item")[last-1];
    const ob = new IntersectionObserver((entries, observer) => {
      entries.forEach(async entry => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          const data = await getData();
          await renderDataBlocks(data);
          observer.observe(document.getElementsByClassName("item")[last-1]);
        }
      })
    }, {
      rootMargin: "0px 0px -100px 0px"
    });
    ob.observe(lastItemFirstRender);
  } else {
    //Handmade API from here
    console.info("Browser not support IntersectionObserver. Using detect range instead");
    handmadeIntersectionObserver(); // Why is it here? Because getData() function generate random item and it can be not overflow-y so the scroll event will not be triggered => call the first time to execute this function if it not have enough item to overflow
    document.addEventListener("scroll", handmadeIntersectionObserver);
  }
});

// --------------------------
// do not change after this line
const app = document.getElementById("app");
async function renderDataBlocks(data) {
  data.forEach(text => {
    const block = document.createElement("div");
    block.classList.add("item");
    block.innerText = text;
    app.appendChild(block);
  });
}

let last = 0;
async function getData() {
  return Array(Math.floor(Math.random() * 30) + 1)
    .fill()
    .map(() => last++);
}
runApp();