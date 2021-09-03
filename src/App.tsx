
import './App.css';
import './modern/base.css';
import React from 'react';
import axios from 'axios'
import Register from './modern/register';

const reg:Register = new Register();

class App extends React.Component{
  state:any
  targetType:any //拖放元素的目标类型
  target:any //选中的元素的
  constructor(props:any){
    super(props);
    this.state={
      list:reg.labels, //组件
      el:[],// 展示的组件
    }
    this.drop = this.drop.bind(this);
    this.chooseEL = this.chooseEL.bind(this);
    this.dropEl = this.dropEl.bind(this);
    this.elDrop = this.elDrop.bind(this);
    this.delete = this.delete.bind(this);
    this.buildFile = this.buildFile.bind(this);
  }
  //开始拖拽
  drag_start(type:string){
    this.targetType = type;    
  }
  //拖放结束
  drop(e:any){
    e.preventDefault();
    const {list,el} = this.state;
    let node = {...(list.filter((item:any)=>item.type === this.targetType)[0])};
    node.id = `el_${el.length}`;
    node.children=[]
    el.push(node);
    this.setState({
      el
    })
  }
  //修改样式、属性
  setCss(data:any,item:any,type:string){
    let {el} = this.state;
    item[type] = data;
    this.setState({
      el
    })
  }
  
  //取消焦点
  dropEl(){
    return new Promise((res:any)=>{
      document.querySelectorAll('.el-focus').forEach((e:any)=>{      
        e.classList.remove('el-focus')
      })
      this.setState({
        target:''
      },()=>{
        res();
      })        
    })
  }
  //元素聚焦  
  async chooseEL(e:any,item:any){
    e.stopPropagation();
    await this.dropEl();
    //获取根节点
    const getNode=(el:any)=>{
      if(el.classList.contains('use-outline')){
        return el
      }else{
        return el.parentNode
      }
    }
    let target = getNode(e.target);
    target.classList.add('el-focus');
    this.setState({
      target:item
    })
  }
  // 删除
  delete(item:any){
    const {el} = this.state;
    item.delete=true;
    this.setState({
      el,
      target:null
    },()=>{
      console.log('el: ', el);
    })
  }
  //扁平数组
  flatArr(arr:any){
    let list:any = []
    arr.forEach((item:any)=>{
      list = [
        ...list,
        ...[item],
        ...(this.flatArr(item.children))
      ]
    })
    return list;
  }
  //组件元素拖放
  elDrop(id:any,item:any){
    
    const {list,el} = this.state;  
    const node = {...(list.filter((item:any)=>item.type === this.targetType)[0])};
    node.id = `${id}_${item.children.length}`;
    node.children=[];
    item.children.push(node);  
    this.setState({
      el
    },()=>{
      console.log('el: ', el);
    })

  }
  //显示边框
  useOutline(){
    document.body.classList.contains('outline')?
    document.body.classList.remove('outline'):
    document.body.classList.add('outline');
  }
  buildFile(){
    const {el} = this.state;
    let list = [...el];
    //删除多余数据
    const drop=(arr:any)=>{
      arr = arr.filter((item:any)=>!item.delete);
      if(arr.length === 0) return [];
      arr.forEach((item:any)=>{
        item.children = drop(item.children)
      })
      return arr;
    }
    let li = drop(list)

    axios.get('http://localhost:9090/build_file?msg='+encodeURIComponent(JSON.stringify(li)))
    alert('生成成功')
  }
  render(){
    let {list,el,target} = this.state;
    let deepEl:any = (list:any)=>{
      return list.map((item:any,key:number)=>
      item.delete?null:
      <item.component
        key={key}
        css={item.css} 
        attr={item.attr}
        id={item.id}
        drop={(id:any)=>{this.elDrop(id,item)}}
        onClick={(e:any)=>{this.chooseEL(e,item)}} 
      >
        {
           deepEl(item.children)
        }
      </item.component>      
      )
    }
    return (
      <div className="App" >
        <div id="page" onDragOver={e=>e.preventDefault()} onDrop={this.drop} onClick={this.dropEl}>                
          {
            deepEl(el)
          }
        </div>
        <div id="drag">
          <div className="top-area">
            <label style={{display:'inline-block',"marginBottom":"20px"}} >
              <span>outline</span>
              <input type="checkbox"  onChange={this.useOutline} />
            </label>
            {
              (el.filter((item:any)=>!item.delete)).length?
              <button style={{"marginLeft":"40px"}} onClick={this.buildFile}>生成html文件</button>
              :null
            }
            
          </div>
          <div id="drag_con">
            <div className="menu-list">
              {
                list.map((li:any,index:number)=>
                  <button 
                    key={index} 
                    draggable='true'
                    onDragStart={()=>this.drag_start(li.type)}>
                    {li.label}
                  </button>
                )
              }
            </div>
            <div className='css-list'>
              {
                target?
                <target.cssMode 
                  css={target.css} 
                  attr={target.attr}
                  changeCss={(data:any)=>{this.setCss(data,target,'css')}} 
                  changeAttr={(data:any)=>{this.setCss(data,target,'attr')}} 
                  delete={()=>{this.delete(target)}}
                />:null
              }
            </div>
            
          </div>
        </div>
      </div>
    );

  }
}


export default App;
