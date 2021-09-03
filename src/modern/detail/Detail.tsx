import { Component } from "react";

export class Detail extends Component<any>{
    state:any
    render(){
        const {css,attr}:any = {...(this.props)}
        return(
            <div 
                className='use-outline detail-item' 
                style={css} 
                onClick={this.props.onClick}            >
                <img src={attr.img} alt="" draggable='false' />
                <p className='name'>{attr.name}</p>
                <div className='price'><span>￥</span>{attr.price}</div>   
                <div className = 'mid'>
                    <span>产品详情</span>
                    <div className="line"></div>
                </div>   
                <div className="detail" 
                    onDragOver={e=>{e.preventDefault();e.stopPropagation()}} 
                    onDrop={e=>{e.stopPropagation();this.props.drop(this.props.id);}} 
                >
                    {this.props.children}
                </div>          
            </div>
        )
    }
    static label='detail'
    //默认样式
    static css:any = {
        "width":'100%',
    }  
    //属性
    static attr:any={
        "name":"name",
        "price":"100",
        "img":"https://hbimg.huabanimg.com/7460ce10e557e42df8a53b1a8f29c59c4a341c29565ca-UJc61m_fw658/format/webp"
    }
}