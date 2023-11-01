class Demo{

    @Max(10)
    exec(a: number){
        console.log(a);
    }
}

function methodDec<This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
){
    console.log('Init method decorator');
    return function(this: This, ...args: Args): Return{
        const res = target.call(this, ...args);
        return res;
    }
}


function Max(num: number){
    return function <This, Args extends any[], Return>(
        target: (this: This, ...args: Args) => Return,
        context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
    ){
        return function(this: This, ...args: Args): Return{
            if (args[0] > num){
                throw new Error(`Значение больше ${num}`);
            }
            const res = target.call(this, ...args);
            return res;
        }
    }
}   

const demo = new Demo();
demo.exec(1);
demo.exec(11);