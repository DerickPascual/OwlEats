// Obtains menus object from url
const scraper = async (browser, url) => {
    console.log(`Navigating to URL: ${url}`);
    
    let page = await browser.newPage();
    await page.goto(url);
    await page.click('input[value="Apply Filters"]')
    await page.waitForSelector('.static-date')
    
    const { menuData, logs } = await page.evaluate(async () => {
        const logs = [];
        
        const containers = document.querySelectorAll('.views-element-container');
        logs.push(`Found ${containers.length} containers`);

        const data = Array.from(containers, (e) => {
            
            const day = e.querySelector('.static-date');
            logs.push(`Day: ${day ? day.innerText : 'Not found'}`);
            
            const mealtime = e.querySelector('h2');
            logs.push(`Mealtime: ${mealtime ? mealtime.innerText : 'Not found'}`);
            
            const mitems = Array.from(e.querySelectorAll('.mitem'), (e2) => {
                const name = e2.querySelector('.mname');
                logs.push(`Item: ${name ? name.innerText : 'Not found'}`);
                
                const dietInfoParent = e2.querySelector('.micons');
                logs.push(`Diet info: ${dietInfoParent ? 'Found' : 'Not found'}`);
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
                    diets: diets ? diets: [],
                    allergens: allergens ? allergens: []
                }
            });

            return {
                day: day ? day.innerText.toLowerCase() : null,
                mealtime: mealtime ? mealtime.innerText.toLowerCase() : null,
                mitems: mitems ? mitems : null,
            }
        });
        
        return { menuData: data, logs };
    });

    // Print logs in the Node.js console
    logs.forEach(log => console.log(log));
    
    await browser.close();

    const finalMenuData = menuData.slice(1, menuData.length);
    return finalMenuData;
}

module.exports = scraper;