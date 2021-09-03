const fs = require('fs')
const path = require('path')

class HtmlBuild {
    static init(list){
        let msg = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>drag html</title>
            <link rel="stylesheet" href="./index.css">
        </head>
        <body>
        `
        list.map(li => {
            msg += HtmlBuild[li.type](li)
        })
        return msg +`</body>
        </html>`;
    }
    static div(item) {
        let msg = `<div class="${item.id}">${item.attr.text}`
        item.children.map(li => {
            msg += HtmlBuild[li.type](li)
        })
        msg += `</div>`
        return msg + '\n';
    }
    static span(item) {
        return `<span class="${item.id}">${item.attr.text}</span>\n`
    }
    static img(item) {
        return `<img class="${item.id}" src="${item.attr.src}" />\n`
    }
    static listItem(item) {
        return`<div  class="list-item ${item.id}">
            <img src="${item.attr.img}" alt="" />
            <h6>${item.attr.title}</h6>
            <p>${item.attr.desc}</p>
        </div>\n`
    }
    static detail(item) {
        let msg = `<div  class="detail-item ${item.id} ">
            <img src=${item.attr.img} alt="" />
            <p class='name'>${item.attr.name}</p>
            <div class='price'><span>￥</span>${item.attr.price}</div>
            <div class = 'mid'>
                <span>产品详情</span>
                <div class="line"></div>
            </div>
            <div class="detail">`
            item.children.map(li => {
                msg += HtmlBuild[li.type](li)
            })
            msg+=`
                </div>
            </div>`
            return msg + '\n';
    }
}


 class PaserData {
    cssMsg = ''
    list = []
    constructor() {}
    //执行
    async init(data) {
        this.list = data
        await this.build_css();
        await this.build_html();
        fs.writeFileSync(path.resolve(__dirname, '../dists/index.js'), 'window.listMsg = '+JSON.stringify(data,null,2))
    }
    //构建html
    build_html() {
        return new Promise(res => {
            let msg = HtmlBuild.init(this.list)
            fs.writeFileSync(path.resolve(__dirname, '../dists/index.html'), msg)
            res();
        })
    }
    //构建css
    build_css() {
        return new Promise(res => {
            //css大写转横杠
            const transStyle = str => {
                return str.replace(/([A-Z])/g, '-$1').toLowerCase();
            }
            let cssMsg = fs.readFileSync(path.resolve(__dirname,'../src/modern/base.css'),'utf-8')
            this.list.map(item => {
                cssMsg += '.' + item.id + '{';
                let css = item.css;
                Object.keys(css).map(li => {
                    cssMsg += transStyle(li) + ':' + css[li] + ';'
                })
                cssMsg += '} '
            })
            fs.writeFileSync(path.resolve(__dirname, '../dists/index.css'), cssMsg)
            res();
        })
    }

}

window.parseData = new PaserData();

