function Promise(executor){
    this.PromiseState = 'pending'
    this.PromiseResult = null
    
    let self = this

    function resolve(data){
        //判断状态 
        if (self.PromiseState !== 'pending') return

        self.PromiseState = 'fulfilled'
        self.PromiseResult = data

    }

    function reject(data){
        //判断状态 
        if (self.PromiseState !== 'pending') return
        
        self.PromiseState = 'reject'
        self.PromiseResult = data
    }

    try{
        //同步调用【执行器函数】
        executor(resolve,reject)
    }catch(e){
        // throw e
        reject(e)
    }
}