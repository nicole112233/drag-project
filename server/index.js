
const express = require('express');
const app = new express();
const path = require('path');
const fs = require('fs')

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
    //执行
    async init(data) {
        const time = new Date().getTime();
        fs.mkdirSync(path.resolve(__dirname,`../dists/${time}`))
        let cssMsg = this.build_css(data);
        fs.writeFileSync(path.resolve(__dirname, `../dists/${time}/index.css`), cssMsg);
        //构建html
        let Htmlmsg = HtmlBuild.init(data)
        fs.writeFileSync(path.resolve(__dirname, `../dists/${time}/index.html`), Htmlmsg)

        
        fs.writeFileSync(path.resolve(__dirname, `../dists/${time}/index.js`), 'window.listMsg = '+JSON.stringify(data,null,2))
    }
    //构建css
    build_css(list) {
        if(list.length == 0) return ''        
        //css大写转横杠
        const transStyle = str => {
            return str.replace(/([A-Z])/g, '-$1').toLowerCase();
        }
        let cssMsg = fs.readFileSync(path.resolve(__dirname,'../src/modern/base.css'),'utf-8')
        list.map(item => {
            cssMsg += '.' + item.id + '{';
            let css = item.css;
            Object.keys(css).map(li => {
                cssMsg += transStyle(li) + ':' + css[li] + ';'
            })
            cssMsg += '} '
            cssMsg += this.build_css(item.children)            
        })
        return cssMsg
    }

}

const parseData = new PaserData();


app.use(express.static(path.resolve(__dirname,'../static')));

//允许跨域
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});



app.get('/build_file', (req, res,next) => {
    // eslint-disable-next-line no-undef
    parseData.init(JSON.parse(req.query.msg))
    res.send({code:0});
});

app.listen('9090', () => {
    console.log(`Server running at http://localhost:9090/`);
});

