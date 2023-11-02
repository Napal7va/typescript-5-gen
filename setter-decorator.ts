@classDec
class Demo{
    private _surname!: string;
    @fieldDec
    name: string ='Test';
    @setDec
    set surname(value: string){
        this._surname = value;
    }
    @Max(10)
    exec(a: number){
        console.log(a);
    }
}

function setDec<This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    context: ClassSetterDecoratorContext<This, (this: This, ...args: Args) => Return>
){
    console.log('Init method decorator');
    return function(this: This, ...args: Args): Return{
        const res = target.call(this, ...args);
        return res;
    }
}

const demo = new Demo();
demo.exec(1);
demo.exec(11);