const scraper = async (browser, url) => {
    let page = await browser.newPage();
    await page.goto(url);

    const menuData = await page.evaluate(() => {
        // Each views element container contains the day and lunch OR just the dinner
        return Array.from(document.querySelectorAll('.views-element-container'), (e) => {
            const day = e.querySelector('.menu-title--day');
            const mealtime = e.querySelector('h3');
            const mitems = Array.from(e.querySelectorAll('.mitem'), (e2) => {
                const name = e2.querySelector('.mname');
                
                // handle allergens
                const allergensParent = e2.querySelector('.micons');
                const allergens = [];
                if (allergensParent) {
                    const vegetarian = allergensParent.querySelector('.icons-vegetarian');
                    if (vegetarian) allergens.push('vegetarian');
                
                    const vegan = allergensParent.querySelector('.icons-vegan');
                    if (vegan) allergens.push('vegan');

                    const gluten = allergensParent.querySelector('.icons-gluten');
                    if (gluten) allergens.push('gluten');
                
                    const soy = allergensParent.querySelector('.icons-soy');
                    if (soy) allergens.push('soy');
                
                    const dairy = allergensParent.querySelector('.icons-milk');
                    if (dairy) allergens.push('dairy');
                
                    const eggs = allergensParent.querySelector('.icons-eggs');
                    if (eggs) allergens.push('eggs');
                
                    const fish = allergensParent.querySelector('.icons-fish');
                    if (fish) allergens.push('fish');
                
                    const shellfish = allergensParent.querySelector('.icons-shellfish');
                    if (shellfish) allergens.push('shellfish');
                
                    const peanuts = allergensParent.querySelector('.icons-peanuts');
                    if (peanuts) allergens.push('peanuts');
                
                    const treeNuts = allergensParent.querySelector('.icons-tree-nuts');
                    if (treeNuts) allergens.push('treenuts');
                
                    const halal = allergensParent.querySelector('.icons-halal');
                    if (halal) allergens.push('halal');
                
                    const sesame = allergensParent.querySelector('.icons-sesame');
                    if (sesame) allergens.push('sesame');
                }
                
                return {
                    name: name ? name.innerText : null,
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