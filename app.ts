@classDec
class Demo{
    private _surname!: string;
    @fieldDec
    name: string ='Test';
    @IsString
    set surname(value: string){
        this._surname = value;
    }
    @Max(10)
    exec(a: number){
        console.log(a);
    }
}

function IsString<This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    context: ClassSetterDecoratorContext<This, (this: This, ...args: Args) => Return>
){
    console.log('Set method');
    return function(this: This, ...args: Args): Return{
        if(typeof arg !== 'string'){
            throw new Error ('Не строка');
        }
        const res = target.call(this, ...args);
        return res;
    }
}

function fieldDec<This>(
    target: undefined,
    context: ClassFieldDecoratorContext<This, string>
){
    return function(value: string){
        return value;
    }
}

function classDec<This, Args extends any[]>(
    target: new(...args: Args) => This,
    context: ClassMethodDecoratorContext<new(...args: Args) => This>
){
    console.log('Class method');
}

function Max(num: number){
    return function <This, Args extends any[], Return>(
        target: (this: This, ...args: Args) => Return,
        context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
    ){
        console.log('Init method');
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