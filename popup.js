const tabs = await chrome.tabs.query({
  // url: [
  //   "https://developer.chrome.com/docs/webstore/*",
  //   "https://developer.chrome.com/docs/extensions/*",
  //   "https://github.com/*"
  // ],
  // title: "New Tab"
	status:"unloaded"
});
const storage = chrome.storage.local;
const test = { key: true }
storage.set(test).then(() => {
  console.log("Value is set to " + test.key);
});

storage.get(["key"]).then((result) => {
  console.log("Value currently is " + result.key);
});

const collator = new Intl.Collator();
tabs.sort((a, b) => collator.compare(a.title, b.title));

const template = document.getElementById("li_template");
const elements = new Set();
for (const tab of tabs) {
  const element = template.content.firstElementChild.cloneNode(true);

  const url = JSON.stringify(tab.url)
  const date = JSON.stringify(new Date());
  const desc = tab.title;	
  const store = {date: date, desc, desc}
  storage.set({[url]: store}).then(()=> console.log(store, "set data"))

  storage.get(url).then(res => console.log("Getting data", res[url]))
	
  const title = tab.title.split("-")[0].trim();
  const pathname = new URL(tab.url).pathname.slice("/docs".length);
  
  element.querySelector(".title").textContent = title;
  element.querySelector(".pathname").textContent = pathname;
  element.querySelector("a").addEventListener("click", async () => {
    // need to focus window as well as the active tab
    await chrome.tabs.update(tab.id, { active: true });
    await chrome.windows.update(tab.windowId, { focused: true });
  });

  elements.add(element);
}

document.querySelector("ul").append(...elements);


const button = document.querySelector("button");
button.addEventListener("click", async () => {
  const tabIds = tabs.map(({ id }) => id);
  const group = await chrome.tabs.group({ tabIds });
  await chrome.tabGroups.update(group, { title: "DOCS" });
});
