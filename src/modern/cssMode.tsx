import './cssMode.css';
import { mode } from "./interface";
import { Component } from 'react';

//所有元素的基础样式
const d_mode:mode={
    // 'width':'100%',
    // 'height':'10px',
    'borderLeftWidth':'0px',
    'borderRightWidth':'0px',
    'borderTopWidth':'0px',
    'borderBottomWidth':'0px',
    'borderStyle':'none',
    'borderColor':'none',
    'paddingLeft':'0px',
    'paddingRight':'0px',
    'paddingTop':'0px',
    'paddingBottom':'0px',
    'marginLeft':'0px',
    'marginRight':'0px',
    'marginTop':'0px',
    'marginBottom':'0px'
}

export class CssMode extends Component{
    state:{css:any,attr:any,[prop:string]:any};
    props:any;
    constructor(props:any){
        super(props);
        this.props = props;
        let css= Object.assign({},props.css,d_mode,props.css);
        let attr = Object.assign({},props.attr) 
        this.state={
            css,
            attr
        };
        this.changeAttr = this.changeAttr.bind(this);
        this.changeCss = this.changeCss.bind(this);
    }    
    render(){
        const {css,attr} = this.state
        return (          
            <>
                <button onClick={this.props.delete}>删除</button>
                {
                    Object.keys(attr).map((item:string,index:number)=>      
                        <div className='css-mode' key={index}>
                            <label>{item}</label>
                            <input type="text" value={attr[item]} onChange={(e)=>this.changeAttr(e,item)} />
                        </div>
                    )
                }
                <div style={{"borderBottom":"1px solid grey","margin":"20px 0"}}></div>
                {
                    Object.keys(css).map((item:string,index:number)=>      
                        <div className='css-mode' key={index}>
                            <label>{item}</label>
                            <input type="text" value={css[item]} onChange={(e)=>this.changeCss(e,item)} />
                        </div>
                    )
                }
            </>
        )
    }
    changeCss(e:any,item:string){
        const css = {...(this.state.css)}
        css[item]=e.target.value
        this.setState({
            css
        },()=>{
            this.props.changeCss && this.props.changeCss(this.state.css);
        })
    }
    
    changeAttr(e:any,item:string){
        const attr = {...(this.state.attr)}
        attr[item]=e.target.value
        this.setState({
            attr
        },()=>{
            this.props.changeAttr && this.props.changeAttr(this.state.attr);
        })
    }
    
    
}


