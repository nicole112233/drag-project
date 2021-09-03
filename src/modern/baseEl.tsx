import { Component } from "react";
export  {ListItem} from './listItem/ListItem'
export  {Detail} from './detail/Detail'

export class Div extends Component<any>{
    state:any
    render(){
        const {css,attr}:any = {...(this.props)}
        return(
            <div 
                onDragOver={e=>{e.preventDefault();e.stopPropagation()}} 
                onDrop={e=>{e.stopPropagation();this.props.drop(this.props.id);}} 
                className='use-outline' 
                style={css} 
                onClick={this.props.onClick}
            >
                {attr.text !==""?attr.text:null}
                {this.props.children}
            </div>
        )
    }
    static label='div'
    //默认样式
    static css:any = {
        // "text":"",
        "width":'100%',
        "minHeight":'20px'
    }  
    //属性
    static attr:any={
        "text":""
    }
}

export class Span extends Component<any>{
    state:any
    render(){
        const {css,attr}:any = {...(this.props)}
        return(
            <span className='use-outline' style={css} onClick={this.props.onClick}>{attr.text !==""?attr.text:null}</span>
        )
    }
    static label='span'
    //默认样式
    static css:any = {
        // "width":'100%',
        // "height":'20px',
        // "padding":'20px'
        "display":"inline"
    }
    //属性
    static attr:any={
        "text":"span"
    }
}
export class Img extends Component<any>{
    state:any
    render(){
        const {css,attr}:any = {...(this.props)}
        return(
            <img draggable='false' className='use-outline' style={css} onClick={this.props.onClick} alt='' src={attr.src}/>
        )
    }
    static label='img'
    //默认样式
    static css:any = {
        "width":'100%',
        // "height":'20px',
        // "padding":'20px'
        "display":"inline-block"
    }
    //属性
    static attr:any={
        src:'https://hbimg.huabanimg.com/7460ce10e557e42df8a53b1a8f29c59c4a341c29565ca-UJc61m_fw658/format/webp'
    }
}
