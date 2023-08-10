/** HOW TO USE
Copy the following link, and replace the word 'PHRASE' with your own search phrase. 
https://chrome.google.com/webstore/search/PHRASE?_category=extensions
*/

main();

async function main() {
    console.clear();
    try {
        await validateUrl();
        var startPrompt = confirm("Start sorting?");
        console.clear();
    } catch (e) {
        return;
    }

    if (startPrompt) {
        blurPage(true);
        sortWebstore();
    }
}

async function stop(reason) {
    stop = true;
    blurPage(false);
    window.scrollTo(0, 0);

    if (!reason === "auto") {
        console.info(
            "%cThe script was force stopped\n%cDid something go wrong? :(",
            "color: orange; font-weight: bold; font-size: 130%;",
            ""
        );
    }
}


async function blurPage(state) {
  let style = "html { filter: blur(5px); }";

  if (state) {
    let styleEl = document.createElement('style');
    styleEl.textContent = style;
    document.head.appendChild(styleEl);
  } else {
    document.head.querySelectorAll("style").forEach(el => {
      if (el.textContent.includes(style)) {
        el.remove(); 
      }
    });
  }
}

async function validateUrl() {
    // Valid extensions URL example: 'https://chrome.google.com/webstore/search/PHRASE?_category=extensions'
    // Adding functionality to continue sort with no filtering or when filtered for themes
    const validHostname = "chrome.google.com",
        validPath = "webstore/search",
        validCategory = "extensions";
    const hostname = window.location.hostname.toLowerCase(); // 'chrome.google.com'
    const pathname = window.location.pathname.toLowerCase(), // '/webstore/search/PHRASE'
        [path1, path2, searchPhrase] = pathname.split("/").slice(1),
        pathFull = `${path1}/${path2}`;
    const queryString = window.location.search.toLowerCase(), // ?_category=extensions'
        params = new URLSearchParams(queryString),
        category = params.get("_category") ?? "",
        lang = params.get("hl") ?? "";

    if (hostname !== validHostname) {
        throw console.error(
            `%cError not in Chrome Web Store!\n` +
                `%cSite should be "${validHostname}"`,
            "color:orange; font-size: 130%; font-weight: bold",
            ""
        );
    } else if (pathFull !== validPath) {
        throw console.error(
            `%cError not searching Chrome Web Store!\n` +
                `%cPath should be "/${validPath}/..."`,
            "color:orange; font-size: 130%; font-weight: bold",
            ""
        );
    } else if (
        queryString !== `?_category=${validCategory}` &&
        queryString !== `?hl=${lang}&_category=${validCategory}`
    ) {
        console.warn(
            `%cError search not filtered to "${validCategory}" !\n` +
                `%cRecommend searching for "${validCategory}".`,
            "color:orange; font-size: 130%; font-weight: bold",
            ""
        );

        let redirectPrompt = confirm(
            `ERROR!\n${validCategory === category ? `Search seems broken.` : `Recommend searching for ${validCategory}.`}\nWant to search in ${validCategory}?`
        );

        if (redirectPrompt) {
            console.clear();
            console.info(
                "%cAttempting to fix search...%c" +
                    "\nRemember to %crestart Sorting%c after the page loads",
                "color:orange; font-size: 130%; font-weight: bold",
                "",
                "font-weight: bold; color: skyblue; border-bottom: solid skyblue 2px",
                ""
            );
            await new Promise(res => setTimeout(res, 2500)); // sleep 2.5 seconds
            const finalURL = `https://${hostname}${pathname}?_category=${validCategory}`;

            try {
                console.info(
                    `%cSuccess!\n` + `%cTaking you to search for extensions now.`,
                    "color:limegreen; font-size: 130%; font-weight: bold",
                    ""
                 );
                await new Promise(res => setTimeout(res, 1500)); // sleep 1.5 second
                window.location.assign(finalURL);
                
            } catch (error) {
                console.clear();
                console.error(
                    `%cFatal error!\n` + `%cSorry search fix failed.\n`,
                    "color:orange; font-size: 130%; font-weight: bold",
                    ""
                );
                throw error;
            }
        } else {
            console.info(
                `%cContinuing sort!\n` +
                    `%cSearching without filtering for extensions.`,
                "color:orange; font-size: 130%; font-weight: bold",
                ""
            );
        }
    } else {
        console.info(
            `%cSuccess!\n` + `%cURL is valid.`,
            "color:limegreen; font-size: 130%; font-weight: bold",
            ""
        );
    }
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("success");
        }, 800);
    });
}

function sortWebstore(MAX_PAGE_LOADS = 2) { // was 25. Gives ~200 results which is good for speed and for relevance of top results.
    console.info(
        "%cSorting search results!\n" +
            "%cThis might take a moment. Be right back.",
        "font-size: 130%; font-weight: bold; color: skyblue;",
        ""
    );

    let startIndex = 0;
    let itemCount = 0;
    let pageLoadsCount = 0;
    let checkEnded = false;
    let newItemCount;

    startLoad(100);
    loadMaxCheck();

    function startLoad(max) {
        startIndex++;

        //document.querySelectorAll('div.h-a-Kd.a-Hd-mb')[0];
        let pageBottom = document.querySelectorAll("div.h-a-Hd-mb.a-Hd-mb")[0];
        pageBottom.scrollIntoView();
        // scrollTo(scrollX,scrollY+1000);
        // console.log(i.toString());

        let items = document.querySelectorAll(
            ".a-d-na.a-d.webstore-test-wall-tile.a-d-zc.Xd.dd"
        );
        newItemCount = items.length;
        if (itemCount != newItemCount) {
            itemCount = newItemCount;
            // console.info(
            //     "Loaded extensions : %c" + newItemCount,
            //     "font-weight: bold; color: skyblue;"
            // );
        }

        if (startIndex > max || checkEnded) {
            startIndex = 0;
            itemCount = 0;
            checkEnded = false;
            items[newItemCount - 1].scrollIntoView(false);
            sortsort();
            return;
        }

        setTimeout(() => {
            startLoad(max);
        }, 500);
    }

    function loadMaxCheck() {
        let loadIndicator = document.querySelectorAll("div.h-a-Kd.a-Hd-mb")[0];
        let loadIndicatorState =
            loadIndicator.attributes.style.value === "display: none;";
        if (loadIndicatorState) pageLoadsCount++;
        else pageLoadsCount = 0;

        // console.log("Counter : " + counter);
        if (pageLoadsCount > MAX_PAGE_LOADS) {
            pageLoadsCount = 0;
            checkEnded = true;
            return;
        }

        setTimeout(() => {
            loadMaxCheck();
        }, 500);
    }

    function sortsort() {
        let itemsNodeList = document.querySelectorAll(
            ".a-d-na.a-d.webstore-test-wall-tile.a-d-zc.Xd.dd"
        );
        let itemElemsArr = Array.from(itemsNodeList);
        let logArr = [{}];

        try {
            itemElemsArr.forEach((itemElement) => {
                itemTitle = itemElement
                    .querySelector("div.a-na-d-w")
                    .textContent.toString();
                orderingNum = itemElement.attributes.hasOwnProperty("index")
                    ? Number(
                          itemElement.attributes.index.value
                              .toString()
                              .replace(/,/g, "")
                      )
                    : 0;
                rating_str =
                    itemElement.getElementsByClassName("nAtiRe").length > 0
                        ? Number(
                              itemElement
                                  .getElementsByClassName("nAtiRe")[0]
                                  .textContent.toString()
                                  .replace(/,/g, "")
                          ).toString()
                        : "Not voted";
                logArr.push({
                    Order: orderingNum,
                    Title: itemTitle,
                    Rating: rating_str,
                });
            });
        } catch (err) {
            throw console.error(err);
        }

        itemElemsArr.sort((item1, item2) => {
            let item1_rating =
                item1.getElementsByClassName("nAtiRe").length > 0
                    ? Number(
                          item1
                              .getElementsByClassName("nAtiRe")[0]
                              .textContent.toString()
                              .replace(/,/g, "")
                      )
                    : 0;
            let item2_rating =
                item2.getElementsByClassName("nAtiRe").length > 0
                    ? Number(
                          item2
                              .getElementsByClassName("nAtiRe")[0]
                              .textContent.toString()
                              .replace(/,/g, "")
                      )
                    : 0;

            return item2_rating - item1_rating;
        });
        
        let itemRowsNodeList = document.querySelectorAll(
            '.h-a-x > [role="grid"] > [role="row"]'
        );
        let itemRowsArr = Array.from(itemRowsNodeList);

        for (let i = 0; i < itemRowsArr.length; i++) {
            row_start = i * 3;

            //let logMsg = i.toString() + " <--- ";
            for (
                let sortedRow = row_start;
                sortedRow < row_start + 3 && sortedRow < itemElemsArr.length;
                sortedRow++
            ) {
                //logMsg += "1:" + sortedRow + " ";
                itemRowsArr[i].appendChild(itemElemsArr[sortedRow]);
            }
            //console.log(logMsg);
        }

        // console.clear();
        console.info(
            "%cSorting finished!!\n%cResults are now ranked by the number of ratings they have!",
            "color: limegreen; font-weight: bold; font-size: 130%;",
            ""
        );

        console.groupCollapsed("Sorted data info");
        console.table(logArr.slice(1), ["Title", "Rating", "Order"]);
        console.groupEnd();
        
        stop("auto");
        return;
    }
}
