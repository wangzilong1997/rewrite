function Promise(executor){
    this.PromiseState = 'pending'
    this.PromiseResult = null
    
    let self = this

    //声明回调函数
    this.callback = {}

    function resolve(data){
        //判断状态 
        if (self.PromiseState !== 'pending') return

        self.PromiseState = 'fulfilled'
        self.PromiseResult = data

        //调用成功的回调函数
        if(self.callback.onResolved){
            self.callback.onResolved(data)
        }

    }

    function reject(data){
        //判断状态 
        if (self.PromiseState !== 'pending') return

        self.PromiseState = 'reject'
        self.PromiseResult = data

       
        //调用失败时候的回调
        if(self.callback.onRejected){
            self.callback.onRejected(data)
        }
    }

    try{
        //同步调用【执行器函数】
        executor(resolve,reject)
    }catch(e){
        // throw e
        reject(e)
    }
    Promise.prototype.then = function(onResolved,onRejected){
        //调用回调函数
        //并且传递参数
        if(this.PromiseState === 'fulfilled'){
            onResolved(this.PromiseResult)
        }
    
        if(this.PromiseState === 'reject'){
            onRejected(this.PromiseResult)
        }

        //判断pending状态
    if(this.PromiseState === 'pending'){
        //保存回调函数

        this.callback = {
            onResolved:onResolved,
            onRejected:onRejected
        }

    }
    
    }
}