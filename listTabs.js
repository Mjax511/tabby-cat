let tabs = await chrome.storage.local.get('allTabs');
tabs = tabs.allTabs

const wrapper = document.createElement('div')
document.querySelector('body').appendChild(wrapper)
for(let i = 0; i < tabs.length; i++){
  const date = await chrome.storage.local.get(JSON.stringify(tabs[i].url));
  console.log('local storage',date)
  const liURL = document.createElement('div');
  const liTitle = document.createElement('div');
  const liDate = document.createElement('div');
  wrapper.appendChild(liURL)
  wrapper.appendChild(liTitle)
  wrapper.appendChild(liDate)
  liURL.innerText = tabs[i].url;
  liTitle.innerText = tabs[i].title;
  liDate.innerText = date[JSON.stringify(tabs[i].url)];
}
