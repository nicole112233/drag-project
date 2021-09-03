
// import {Div,Span,Img} from './baseEl'
import * as El from './baseEl'
import { CssMode } from './cssMode';

let Ell:any={...El}
const labels:any=[];
// eslint-disable-next-line array-callback-return
Object.keys(Ell).map((item:string)=>{
    const el = Ell[item];
    labels.push({
        label:el.label,
        type:el.label,
        component:el,
        cssMode:CssMode,
        css:el.css,
        attr:el.attr
    })

})
export default class Register{
    labels=labels
    // labels=[
    //     {
    //         label:'div',
    //         type:'0',
    //         component:Div,
    //         cssMode:CssMode,
    //         css:Div.css,
    //         attr:Div.attr
    //       },
    //       {
    //           label:'span',
    //           type:'1',
    //           component:Span,
    //           cssMode:CssMode,
    //           css:Span.css,
    //           attr:Span.attr
    //         },
    //         {
    //             label:'img',
    //             type:'2',
    //             component:Img,
    //             cssMode:CssMode,
    //             css:Img.css,
    //             attr:Img.attr
    //           }
    // ]
}