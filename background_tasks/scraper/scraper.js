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
                
                return {
                    name: name ? name.innerText : null,
                    diets: [],
                    allergens: []
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