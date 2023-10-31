class Demo{

    @methodDec
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

const demo = new Demo()
demo.exec(1);