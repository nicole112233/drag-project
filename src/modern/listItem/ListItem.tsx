import { Component } from "react";

export class ListItem extends Component<any>{
    state:any
    render(){
        const {css,attr}:any = {...(this.props)}
        return(
            <div 
                className='use-outline list-item' 
                style={css} 
                onClick={this.props.onClick}            >
                <img src={attr.img} alt="" />
                <h6>{attr.title}</h6>
                <p>{attr.desc}</p>                
            </div>
        )
    }
    static label='listItem'
    //默认样式
    static css:any = {
        "width":'100%',
    }  
    //属性
    static attr:any={
        "title":"title",
        "desc":"desc",
        "img":"https://hbimg.huabanimg.com/7460ce10e557e42df8a53b1a8f29c59c4a341c29565ca-UJc61m_fw658/format/webp"
    }
}