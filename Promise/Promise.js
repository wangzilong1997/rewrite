function Promise(executor){
    this.PromiseState = 'pending'
    this.PromiseResult = null
    
    let self = this

    //声明回调函数
    this.callback = []

    function resolve(data){
        //判断状态 
        if (self.PromiseState !== 'pending') return

        self.PromiseState = 'fulfilled'
        self.PromiseResult = data

        //调用成功的回调函数
        
        self.callback.forEach((item)=>{
            item.onResolved(data)
        })

    }

    function reject(data){
        //判断状态 
        if (self.PromiseState !== 'pending') return

        self.PromiseState = 'reject'
        self.PromiseResult = data

       
        //调用失败时候的回调
        self.callback.forEach((item)=>{
            item.onRejected(data)
        })
    }

    try{
        //同步调用【执行器函数】
        executor(resolve,reject)
    }catch(e){
        // throw e
        reject(e)
    }
    Promise.prototype.then = function(onResolved,onRejected){

        return new Promise((resolve,reject)=>{
           
            //调用回调函数
            //并且传递参数
            if(this.PromiseState === 'fulfilled'){
                try{
                    let result = onResolved(this.PromiseResult)

                    if(result instanceof Promise){
                        //如果是Promise对象
                        result.then(v =>{
                            resolve(v)
                        },r=>{
                            reject(r)
                        })
                    }else{
                        //当前结果变为成功
                        resolve(result)
                    }
                }catch(e){
                    reject(e)
                }
                
                
            }
        
            if(this.PromiseState === 'reject'){
                onRejected(this.PromiseResult)
            }

            //判断pending状态
            if(this.PromiseState === 'pending'){
            //保存回调函数

            this.callback.push({
                onResolved:onResolved,
                onRejected:onRejected
            })

            }
        })
        
    
    }
}