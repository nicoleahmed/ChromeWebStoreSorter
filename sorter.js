/** HOW TO USE
Copy the following link, and replace the word 'PHRASE' with your own search phrase. 
https://chrome.google.com/webstore/search/PHRASE?_category=extensions
*/

main();

async function main() {
    console.clear();
    try {
        await validateUrl();
        var startPrompt = confirm("Initiate sorting?");
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
            "%cThe script was forcefully stopped\n%cDid I do bad? :(",
            "color: orange; font-weight: bold; font-size: 130%;",
            ""
        );
    }
}

async function blurPage(state) {
    let style = "html { filter: blur(5px); }";

    if (state) {
        document.head.insertAdjacentHTML(
            "beforeend",
            `<style>${style}</style>`
        );
    } else {
        document.head.querySelectorAll("style").forEach((element) => {
            if (element.textContent.includes(style)) element.remove();
        });
    }
}

async function validateUrl() {
    // Valid URL example: 'https://chrome.google.com/webstore/search/PHRASE?_category=extensions'
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
            `%cError incorrect host!\n` +
                `%cURL hostname must be "${validHostname}"`,
            "color:orange; font-size: 130%; font-weight: bold",
            ""
        );
    } else if (pathFull !== validPath) {
        throw console.error(
            `%cError incorrect path!\n` +
                `%cURL path must be "/${validPath}/..."`,
            "color:orange; font-size: 130%; font-weight: bold",
            ""
        );
    } else if (
        queryString !== `?_category=${validCategory}` &&
        queryString !== `?hl=${lang}&_category=${validCategory}`
    ) {
        console.warn(
            `%cError incorrect query string!\n` +
                `%cThe webstore search category must be "${validCategory}".`,
            "color:orange; font-size: 130%; font-weight: bold",
            ""
        );

        let redirectPrompt = confirm(
            `ERROR!\n${validCategory === category ? `The URL query string is incorrect.` : `The search category should be "${validCategory}" but is instead "${category}".`}\nWould you like me to automatically correct this?`
        );

        if (redirectPrompt) {
            console.clear();
            console.info(
                "%cAttempting to correct URL...%c" +
                    "\nRemember to %crelaunch the script manually%c after the page loads",
                "color:orange; font-size: 130%; font-weight: bold",
                "",
                "font-weight: bold; color: skyblue; border-bottom: solid skyblue 2px",
                ""
            );
            await new Promise(res => setTimeout(res, 5000)); // sleep 5 seconds
            const finalURL = `https://${hostname}${pathname}?_category=${validCategory}`;

            try {
                window.location.assign(finalURL);
                console.info(
                    `%cSuccess!\n` + `%cURL has been corrected.`,
                    "color:limegreen; font-size: 130%; font-weight: bold",
                    ""
                );
            } catch (error) {
                console.clear();
                console.error(
                    `%cFatal error!\n` + `%cURL redirect failed.\n`,
                    "color:orange; font-size: 130%; font-weight: bold",
                    ""
                );
                throw error;
            }
        } else {
            throw console.error(
                `%cFatal error!\n` +
                    `%cThe query string is incorrect.`,
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
        }, 1000);
    });
}

function sortWebstore(MAX_PAGE_LOADS = 25) {
    console.info(
        "%cBeginning webstore sort!\n" +
            "%cSit tight, this may take a short moment. The screen will unblur when sorting has concluded.",
        "font-size: 130%; font-weight: bold; color: skyblue;",
        ""
    );

    let startIndex = 0;
    let itemCount = 0;
    let pageLoadsCount = 0;
    let checkEnded = false;
    let newItemCount;

    startLoad(3000);
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
        }, 100);
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
        }, 100);
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

        console.clear();
        console.info(
            "%cSorting has finished!\n%cEnjoy your significantly improved extension browsing shopping!",
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
