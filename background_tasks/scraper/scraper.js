const { PricingV2TrunkingCountryInstanceOriginatingCallPrices } = require("twilio/lib/rest/pricing/v2/country");

const scraper = async (browser, url) => {
    let page = await browser.newPage();
    await page.goto(url);

    /* istanbul ignore next */
    const menuData = await page.evaluate(() => {
        // Each views element container contains the day and lunch OR just the dinner
        return Array.from(document.querySelectorAll('.views-element-container'), (e) => {
            const day = e.querySelector('.static-date');
            const mealtime = e.querySelector('h2');
            const mitems = Array.from(e.querySelectorAll('.mitem'), (e2) => {
                const name = e2.querySelector('.mname');
                
                // handle allergens
                const dietInfoParent = e2.querySelector('.micons');
                const diets = []
                const allergens = [];
                if (dietInfoParent) {
                    const vegetarian = dietInfoParent.querySelector('.vegetarian');
                    if (vegetarian) diets.push('vegetarian');
                
                    const vegan = dietInfoParent.querySelector('.vegan');
                    if (vegan) diets.push('vegan');

                    const halal = dietInfoParent.querySelector('.halal');
                    if (halal) diets.push('halal');

                    const gluten = dietInfoParent.querySelector('.gluten');
                    if (gluten) allergens.push('gluten');
                
                    const soy = dietInfoParent.querySelector('.soy');
                    if (soy) allergens.push('soy');
                
                    const dairy = dietInfoParent.querySelector('.milk');
                    if (dairy) allergens.push('dairy');
                
                    const eggs = dietInfoParent.querySelector('.eggs');
                    if (eggs) allergens.push('eggs');
                
                    const fish = dietInfoParent.querySelector('.fish');
                    if (fish) allergens.push('fish');
                
                    const shellfish = dietInfoParent.querySelector('.shellfish');
                    if (shellfish) allergens.push('shellfish');
                
                    const peanuts = dietInfoParent.querySelector('.peanuts');
                    if (peanuts) allergens.push('peanuts');
                
                    const treeNuts = dietInfoParent.querySelector('.treenuts');
                    if (treeNuts) allergens.push('treenuts');
                
                    const sesame = dietInfoParent.querySelector('.sesame');
                    if (sesame) allergens.push('sesame');
                }
                
                return {
                    name: name ? name.innerText : null,
                    diets: diets ? diets : [],
                    allergens: allergens ? allergens : []
                }
            });

            return {
                day: day ? day.innerText.toLowerCase() : null,
                mealtime: mealtime ? mealtime.innerText.toLowerCase() : null,
                mitems: mitems ? mitems : null,
            }
        });
    });

    await browser.close();

    // the first value of the array isn't menu data due to the nature of the website we are scraping
    return menuData.slice(1, menuData.length);
}

module.exports = scraper;