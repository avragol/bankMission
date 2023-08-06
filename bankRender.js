function bankRender(template, dataArr) {
    let h = '';
    const r = /\{(.*)\}/g;
    let propertiesInTemplate = template.match(r);
    for (let i = 0; i < propertiesInTemplate.length; i++) {
        let p = propertiesInTemplate[i];
        p.replace('[', '').replace(']', '');
        propertiesInTemplate[i] = p;
    }
    dataArr.forEach(item => {
        let itemHtml = template
        for (let prop in item) {
            let propValue = item[prop];
            itemHtml = itemHtml.replace(`{${prop}}`, propValue);
        }
        h += itemHtml;
    });
    return h;
}