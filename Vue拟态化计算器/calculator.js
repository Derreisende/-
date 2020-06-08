new Vue({
    el:"#app",
    data:{
        equation: '0',
        //是否有小数点
        isDecimalAdded: false,
        //是否输入运算符
        isOperatorAdded: false,
        //是否已经输入数字
        isStarted: false
    },
    methods: {
        //判断charactor是否加减乘除
        isOperator(character){
            return ['+','-','×','÷'].indexOf(character) > -1
        },
        //点击+-×÷或.时
        append(character){
            if(this.equation === '0' && !this.isOperator(character)){
                if(character === '.'){
                    this.equation += '' + character
                    this.isDecimalAdded = true
                }else{
                    this.equation = '' + character
                }
                this.isStarted = true
                return
            }
            
            //if Number
            if(!this.isOperator(character)){
                if(character === '.' && this.isDecimalAdded){
                    return
                }
                if(character === '.'){
                    this.isDecimalAdded = true
                    this.isOperatorAdded = true
                }else{
                    this.isOperatorAdded = false
                }
                this.equation += '' + character
            }
            
            if(this.isOperator(character) && !this.isOperatorAdded){
                
                this.equation += '' + character
                this.isDecimalAdded = false
                this.isOperatorAdded = true
            }
        },
        //点击=时
        calculate(){
            let result = this.equation.replace(new RegExp('×','g'),
            '*').replace(new RegExp('÷','g'),'/')
            this.equation = parseFloat(eval(result).toFixed(9)).toString()
            this.isDecimalAdded = false
            this.isOperatorAdded = false
        },
        //点击±时
        calculateToggle(){
            if(this.isOperatorAdded || !this.isStarted){
                return
            }
            this.equation = this.equation + '* -1'
            this.calculate()
        },
        //点击%时
        calculatePercent(){
            if(this.isOperatorAdded || !this.isStarted){
                return
            }
            this.equation = this.equation + '* 0.01'
            this.calculate()
        },
        //点击AC时
        clear(){
            this.equation = '0'
            this.isDecimalAdded = false
            this.isOperatorAdded = false
            this.isStarted = false
        }
    }
})