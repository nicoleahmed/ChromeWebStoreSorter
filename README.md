# ChromeWebStoreSorter
Built on the work of [MarshaIIs](https://github.com/MarshaIIs) and [ugur1yildiz](https://github.com/ugur1yildiz)

A javascript snippet to sort Chrome Web Store extensions or themes by number of ratings.
Best used when there are many similar extensions with lots of ratings. Doesn't work so well with there are few extensions or they don't have many ratings as you will get lots of irrelevant extensions brought to the top of your search. 

Search as usual and then apply a filter for extensions or themes. Apply the sorter as outlined below. The script has a built in check & fix in case you forget to filter for extensions.

# Why
Google doesn't make it easy to find the most popular or well established extensions. 
There is also a lot of malware about on the Web Store that may not get taken down for months. It can be hard to find what you're looking for. I was looking for established pdfJS extension but had to install about 6 other extensions first which were all very similar. This is a security risk - [more on malicious extensions](https://github.com/nicoleahmed/malicious-extensions-list).

I did some [analysis](https://github.com/nicoleahmed/ChromeWebStoreSorter/blob/main/Analyses.md) on the search ranking results for [adblockers](https://github.com/nicoleahmed/ChromeWebStoreSorter/blob/main/Adblocker.csv), [vpns](https://github.com/nicoleahmed/ChromeWebStoreSorter/blob/main/vpn.csv) and [guitar](https://github.com/nicoleahmed/ChromeWebStoreSorter/blob/main/guitar.csv) extensions (see more [detail here](https://github.com/nicoleahmed/ChromeWebStoreSorter/blob/main/ExtensionSortingAnalysis.xlsx)).

- The Google search ranking is not entirely intuitive
- You might have to scroll through 10 or 15 pages to see some of the most popular and well thought of ad-blockers and vpns
- Conversely extensions with little reputation will be put in the top of the search
- Its well documented now that simply being featured on the Chrome Store or having lots of users doesn't meant that there is no malware in an extension. 

With this work in mind, I have set up this script to retrieve around 200 results for sorting - this is the sweet spot for congested searches (lots and lots of extensions). This will bring up the most popular but deeply hidden extensions (like uBlock origin) and still keep the top 20 results relevant.

# How

## Bookmarklet
When you are on your search page (preferably filtered), click a button on your bookmark bar to initiate the sort.

- ctrl shift b brings up the bookmark bar
- right click and select add page
- give the button a meaningful name like SortChromeStore
- copy the code below and paste into the URL section

[File here ](https://github.com/nicoleahmed/ChromeWebStoreSorter/blob/main/bookmarklet.js)

**Code**
```
javascript:(function()%7Basync function main()%7Bconsole.clear()%3Btry%7Bawait validateUrl()%3Bvar e%3Dconfirm("Start sorting%3F")%3Bconsole.clear()%7Dcatch(e)%7Breturn%7De%26%26(blurPage(!0)%2CsortWebstore())%7Dasync function stop(e)%7Bstop%3D!0%2CblurPage(!1)%2Cwindow.scrollTo(0%2C0)%2C"auto"%3D%3D%3D!e%26%26console.info("%25cThe script was force stopped%5Cn%25cDid something go wrong%3F %3A("%2C"color%3A orange%3B font-weight%3A bold%3B font-size%3A 130%25%3B"%2C"")%7Dasync function blurPage(e)%7Blet o%3D"html %7B filter%3A blur(5px)%3B %7D"%3Bif(e)%7Blet e%3Ddocument.createElement("style")%3Be.textContent%3Do%2Cdocument.head.appendChild(e)%7Delse document.head.querySelectorAll("style").forEach((e%3D>%7Be.textContent.includes(o)%26%26e.remove()%7D))%7Dasync function validateUrl()%7Bconst e%3D"chrome.google.com"%2Co%3D"webstore%2Fsearch"%2Ct%3D"extensions"%2Cn%3Dwindow.location.hostname.toLowerCase()%2Cr%3Dwindow.location.pathname.toLowerCase()%2C%5Bl%2Ci%2Cs%5D%3Dr.split("%2F").slice(1)%2Ca%3D%60%24%7Bl%7D%2F%24%7Bi%7D%60%2Cc%3Dwindow.location.search.toLowerCase()%2Cg%3Dnew URLSearchParams(c)%2Cd%3Dg.get("_category")%3F%3F""%2Ch%3Dg.get("hl")%3F%3F""%3Bif(n!%3D%3De)throw console.error(%60%25cError not in Chrome Web Store!%5Cn%25cSite should be "%24%7Be%7D"%60%2C"color%3Aorange%3B font-size%3A 130%25%3B font-weight%3A bold"%2C"")%3Bif(a!%3D%3Do)throw console.error(%60%25cError not searching Chrome Web Store!%5Cn%25cPath should be "%2F%24%7Bo%7D%2F..."%60%2C"color%3Aorange%3B font-size%3A 130%25%3B font-weight%3A bold"%2C"")%3Bif(c!%3D%3D%60%3F_category%3D%24%7Bt%7D%60%26%26c!%3D%3D%60%3Fhl%3D%24%7Bh%7D%26_category%3D%24%7Bt%7D%60)%7Bif(console.warn(%60%25cError search not filtered to "%24%7Bt%7D" !%5Cn%25cRecommend searching for "%24%7Bt%7D".%60%2C"color%3Aorange%3B font-size%3A 130%25%3B font-weight%3A bold"%2C"")%2Cconfirm(%60ERROR!%5Cn%24%7Bt%3D%3D%3Dd%3F"Search seems broken."%3A%60Recommend searching for %24%7Bt%7D.%60%7D%5CnWant to search in %24%7Bt%7D%3F%60))%7Bconsole.clear()%2Cconsole.info("%25cAttempting to fix search...%25c%5CnRemember to %25crestart Sorting%25c after the page loads"%2C"color%3Aorange%3B font-size%3A 130%25%3B font-weight%3A bold"%2C""%2C"font-weight%3A bold%3B color%3A skyblue%3B border-bottom%3A solid skyblue 2px"%2C"")%2Cawait new Promise((e%3D>setTimeout(e%2C2500)))%3Bconst e%3D%60https%3A%2F%2F%24%7Bn%7D%24%7Br%7D%3F_category%3D%24%7Bt%7D%60%3Btry%7Bconsole.info("%25cSuccess!%5Cn%25cTaking you to search for extensions now."%2C"color%3Alimegreen%3B font-size%3A 130%25%3B font-weight%3A bold"%2C"")%2Cawait new Promise((e%3D>setTimeout(e%2C1500)))%2Cwindow.location.assign(e)%7Dcatch(e)%7Bthrow console.clear()%2Cconsole.error("%25cFatal error!%5Cn%25cSorry search fix failed.%5Cn"%2C"color%3Aorange%3B font-size%3A 130%25%3B font-weight%3A bold"%2C"")%2Ce%7D%7Delse console.info("%25cContinuing sort!%5Cn%25cSearching without filtering for extensions."%2C"color%3Aorange%3B font-size%3A 130%25%3B font-weight%3A bold"%2C"")%7Delse console.info("%25cSuccess!%5Cn%25cURL is valid."%2C"color%3Alimegreen%3B font-size%3A 130%25%3B font-weight%3A bold"%2C"")%3Breturn new Promise((e%3D>%7BsetTimeout((()%3D>%7Be("success")%7D)%2C800)%7D))%7Dfunction sortWebstore(e%3D2)%7Bconsole.info("%25cSorting search results!%5Cn%25cThis might take a moment. Be right back."%2C"font-size%3A 130%25%3B font-weight%3A bold%3B color%3A skyblue%3B"%2C"")%3Blet o%2Ct%3D0%2Cn%3D0%2Cr%3D0%2Cl%3D!1%3B!function e(r)%7Bt%2B%2B%2Cdocument.querySelectorAll("div.h-a-Hd-mb.a-Hd-mb")%5B0%5D.scrollIntoView()%3Blet i%3Ddocument.querySelectorAll(".a-d-na.a-d.webstore-test-wall-tile.a-d-zc.Xd.dd")%3Bo%3Di.length%2Cn!%3Do%26%26(n%3Do)%3Bif(t>r%7C%7Cl)return t%3D0%2Cn%3D0%2Cl%3D!1%2Ci%5Bo-1%5D.scrollIntoView(!1)%2Cvoid function()%7Blet e%3Ddocument.querySelectorAll(".a-d-na.a-d.webstore-test-wall-tile.a-d-zc.Xd.dd")%2Co%3DArray.from(e)%2Ct%3D%5B%7B%7D%5D%3Btry%7Bo.forEach((e%3D>%7BitemTitle%3De.querySelector("div.a-na-d-w").textContent.toString()%2CorderingNum%3De.attributes.hasOwnProperty("index")%3FNumber(e.attributes.index.value.toString().replace(%2F%2C%2Fg%2C""))%3A0%2Crating_str%3De.getElementsByClassName("nAtiRe").length>0%3FNumber(e.getElementsByClassName("nAtiRe")%5B0%5D.textContent.toString().replace(%2F%2C%2Fg%2C"")).toString()%3A"Not voted"%2Ct.push(%7BOrder%3AorderingNum%2CTitle%3AitemTitle%2CRating%3Arating_str%7D)%7D))%7Dcatch(e)%7Bthrow console.error(e)%7Do.sort(((e%2Co)%3D>%7Blet t%3De.getElementsByClassName("nAtiRe").length>0%3FNumber(e.getElementsByClassName("nAtiRe")%5B0%5D.textContent.toString().replace(%2F%2C%2Fg%2C""))%3A0%3Breturn(o.getElementsByClassName("nAtiRe").length>0%3FNumber(o.getElementsByClassName("nAtiRe")%5B0%5D.textContent.toString().replace(%2F%2C%2Fg%2C""))%3A0)-t%7D))%3Blet n%3Ddocument.querySelectorAll('.h-a-x > %5Brole%3D"grid"%5D > %5Brole%3D"row"%5D')%2Cr%3DArray.from(n)%3Bfor(let e%3D0%3Be<r.length%3Be%2B%2B)%7Brow_start%3D3*e%3Bfor(let t%3Drow_start%3Bt<row_start%2B3%26%26t<o.length%3Bt%2B%2B)r%5Be%5D.appendChild(o%5Bt%5D)%7Dconsole.info("%25cSorting finished!!%5Cn%25cResults are now ranked by the number of ratings they have!"%2C"color%3A limegreen%3B font-weight%3A bold%3B font-size%3A 130%25%3B"%2C"")%2Cconsole.groupCollapsed("Sorted data info")%2Cconsole.table(t.slice(1)%2C%5B"Title"%2C"Rating"%2C"Order"%5D)%2Cconsole.groupEnd()%2Cstop("auto")%7D()%3BsetTimeout((()%3D>%7Be(r)%7D)%2C500)%7D(100)%2Cfunction o()%7B"display%3A none%3B"%3D%3D%3Ddocument.querySelectorAll("div.h-a-Kd.a-Hd-mb")%5B0%5D.attributes.style.value%3Fr%2B%2B%3Ar%3D0%3Bif(r>e)return r%3D0%2Cvoid(l%3D!0)%3BsetTimeout((()%3D>%7Bo()%7D)%2C500)%7D()%7Dmain()%3B%7D)()

```

## Chrome development 
The script can be [viewed here](https://github.com/nicoleahmed/ChromeWebStoreSorter/blob/main/bookmarklet.js) by people who would like to develop further.
A minified version which is [more compact is here](https://github.com/nicoleahmed/ChromeWebStoreSorter/blob/main/minifiedsorter.js).

This code can be used when you are on the search page by either pasting directly into the console, or by saving the code as a snippet for repeated use.

**Minified code**
```
async function main(){console.clear();try{await validateUrl();var e=confirm("Start sorting?");console.clear()}catch(e){return}e&&(blurPage(!0),sortWebstore())}async function stop(e){stop=!0,blurPage(!1),window.scrollTo(0,0),"auto"===!e&&console.info("%cThe script was force stopped\n%cDid something go wrong? :(","color: orange; font-weight: bold; font-size: 130%;","")}async function blurPage(e){let o="html { filter: blur(5px); }";if(e){let e=document.createElement("style");e.textContent=o,document.head.appendChild(e)}else document.head.querySelectorAll("style").forEach((e=>{e.textContent.includes(o)&&e.remove()}))}async function validateUrl(){const e="chrome.google.com",o="webstore/search",t="extensions",n=window.location.hostname.toLowerCase(),r=window.location.pathname.toLowerCase(),[l,i,s]=r.split("/").slice(1),a=`${l}/${i}`,c=window.location.search.toLowerCase(),g=new URLSearchParams(c),d=g.get("_category")??"",h=g.get("hl")??"";if(n!==e)throw console.error(`%cError not in Chrome Web Store!\n%cSite should be "${e}"`,"color:orange; font-size: 130%; font-weight: bold","");if(a!==o)throw console.error(`%cError not searching Chrome Web Store!\n%cPath should be "/${o}/..."`,"color:orange; font-size: 130%; font-weight: bold","");if(c!==`?_category=${t}`&&c!==`?hl=${h}&_category=${t}`){if(console.warn(`%cError search not filtered to "${t}" !\n%cRecommend searching for "${t}".`,"color:orange; font-size: 130%; font-weight: bold",""),confirm(`ERROR!\n${t===d?"Search seems broken.":`Recommend searching for ${t}.`}\nWant to search in ${t}?`)){console.clear(),console.info("%cAttempting to fix search...%c\nRemember to %crestart Sorting%c after the page loads","color:orange; font-size: 130%; font-weight: bold","","font-weight: bold; color: skyblue; border-bottom: solid skyblue 2px",""),await new Promise((e=>setTimeout(e,2500)));const e=`https://${n}${r}?_category=${t}`;try{console.info("%cSuccess!\n%cTaking you to search for extensions now.","color:limegreen; font-size: 130%; font-weight: bold",""),await new Promise((e=>setTimeout(e,1500))),window.location.assign(e)}catch(e){throw console.clear(),console.error("%cFatal error!\n%cSorry search fix failed.\n","color:orange; font-size: 130%; font-weight: bold",""),e}}else console.info("%cContinuing sort!\n%cSearching without filtering for extensions.","color:orange; font-size: 130%; font-weight: bold","")}else console.info("%cSuccess!\n%cURL is valid.","color:limegreen; font-size: 130%; font-weight: bold","");return new Promise((e=>{setTimeout((()=>{e("success")}),800)}))}function sortWebstore(e=2){console.info("%cSorting search results!\n%cThis might take a moment. Be right back.","font-size: 130%; font-weight: bold; color: skyblue;","");let o,t=0,n=0,r=0,l=!1;!function e(r){t++,document.querySelectorAll("div.h-a-Hd-mb.a-Hd-mb")[0].scrollIntoView();let i=document.querySelectorAll(".a-d-na.a-d.webstore-test-wall-tile.a-d-zc.Xd.dd");o=i.length,n!=o&&(n=o);if(t>r||l)return t=0,n=0,l=!1,i[o-1].scrollIntoView(!1),void function(){let e=document.querySelectorAll(".a-d-na.a-d.webstore-test-wall-tile.a-d-zc.Xd.dd"),o=Array.from(e),t=[{}];try{o.forEach((e=>{itemTitle=e.querySelector("div.a-na-d-w").textContent.toString(),orderingNum=e.attributes.hasOwnProperty("index")?Number(e.attributes.index.value.toString().replace(/,/g,"")):0,rating_str=e.getElementsByClassName("nAtiRe").length>0?Number(e.getElementsByClassName("nAtiRe")[0].textContent.toString().replace(/,/g,"")).toString():"Not voted",t.push({Order:orderingNum,Title:itemTitle,Rating:rating_str})}))}catch(e){throw console.error(e)}o.sort(((e,o)=>{let t=e.getElementsByClassName("nAtiRe").length>0?Number(e.getElementsByClassName("nAtiRe")[0].textContent.toString().replace(/,/g,"")):0;return(o.getElementsByClassName("nAtiRe").length>0?Number(o.getElementsByClassName("nAtiRe")[0].textContent.toString().replace(/,/g,"")):0)-t}));let n=document.querySelectorAll('.h-a-x > [role="grid"] > [role="row"]'),r=Array.from(n);for(let e=0;e<r.length;e++){row_start=3*e;for(let t=row_start;t<row_start+3&&t<o.length;t++)r[e].appendChild(o[t])}console.info("%cSorting finished!!\n%cResults are now ranked by the number of ratings they have!","color: limegreen; font-weight: bold; font-size: 130%;",""),console.groupCollapsed("Sorted data info"),console.table(t.slice(1),["Title","Rating","Order"]),console.groupEnd(),stop("auto")}();setTimeout((()=>{e(r)}),500)}(100),function o(){"display: none;"===document.querySelectorAll("div.h-a-Kd.a-Hd-mb")[0].attributes.style.value?r++:r=0;if(r>e)return r=0,void(l=!0);setTimeout((()=>{o()}),500)}()}main();

```

### Console 
- Press ctrl shift i
- In the first blank link of your console paste the code above and follow the console / alert prompts

### Snippets
- Press ctrl shift i
- Click on Sources
- Above the first white rectangle on the left, press the double arrows to find snippets
- Then click new snipper
- Name something meaning like chromestoresort and paste the code above into the snippet
- To run the code in future press ctrl shift i to open the dev tools
- Press ctrl o
- Type !
- Select your snippet or start typing its name then press enter.


# The Script
Some screenshots of what to expect from the script

Confirming you want to sort:
![Screenshot of initation](/images/start%20sorting.PNG)

Checking if you want to filter to extensions:
![Screenshot of script asking about extension filtering](/images/extensions%20check.PNG)

Changing the search to filter for extensions:
![Screenshot of search alteration](/images/fix%20search.PNG)

Screenshot when sort if complete:
![Screenshot of compelted sort](/images/sorting%20finished.PNG)

