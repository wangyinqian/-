/**
      * @method recursionQuery 递归查询
      * @author msy
      * @param {object} component  需要递归的目标数据
      * @param {string} name 条件名称 
      * @return {object} 需要的数据
     */
    function recursionQuery(component,name){
        //递归查找
        function query(components,parents){
            let _arrayList = [],_parents = [],j = 0,u = 0;

            for(let i = 0,len = components.length;i < len;i++)
            {
                const e = components[i];
                //如果控件是容器则合并到数组中，如果本次循环未查找到按钮，则在下次循环中循环该数组。
                if(e.components){ _arrayList = _arrayList.concat(e.components); _parents.push(e); }
                //更改存放父级的数组，保证获取到按钮的直系父级
                if(u != parents[j].components.length){ u++; }else{ j++; u = 0;  }
                //如果查找到按钮返回，并停止递归
                if(e.type == name){ return {component:e,parent:parents[j]}  }
            }
            //如果数组中无元素则不再递归
            if(_arrayList.length){ return query(_arrayList,_parents); }
        }
        
        return query(component.components,[component])
    }
