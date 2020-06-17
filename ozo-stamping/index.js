const { chromium } = require("playwright");
const stamps = ["shukkin", "taisyutu"];
const [stamp, url, token, id] = argsParser(process.argv);
console.table({ stamp, url, token, id });
const tokenCookie = {
    name: "CFTOKEN",
    value: token,
    domain: "manage.ozo-cloud.jp",
    path: "/",
};
const idCookie = {
    name: "CFID",
    value: id,
    domain: "manage.ozo-cloud.jp",
    path: "/",
};

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    context.addCookies([tokenCookie, idCookie]);
    const page = await context.newPage();
    await page.goto(url, {
        waitUntil: "load",
    });
    if (stamp === stamps[1]) {
        await page.evaluate(() => {
            window.doDakoku("taisyutu");
        });
        await page.waitForNavigation({ waitUntil: "load" });
    } else {
        await page.evaluate(() => {
            window.doDakoku("shukkin");
        });
        await page.waitForNavigation({ waitUntil: "load" });
    }
    await page.screenshot({ path: "./ozo-screen.png" });
    await browser.close();
})();

/**
 * @param {string[]} args
 * @returns {string[]}
 */
function argsParser(args) {
    const [, , stampArg, urlArg, tokenArg, idArg] = args;
    (!urlArg || !stampArg || !tokenArg || !idArg) && process.exit(1);
    const [tokenKey, tokenVal] = tokenArg.split("=");
    const [idKey, idVal] = idArg.split("=");
    if (tokenKey !== "token" || idKey !== "id") process.exit(1);
    return [stampArg, urlArg.replace(/['"]+/g, ""), tokenVal, idVal];
}
