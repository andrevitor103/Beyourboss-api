const { param } = require("express/lib/request");

class Validator {
    errors = [];
    names = [];

    async resolve(validation, data, names) {
        // let errors = [];
        this.errors = [];
        this.names = [];
        this.names = names;
        console.log(names);
        await this.validate(validation, data);
        console.log("aquii");   
        console.log(this.errors);
        return this.errors;
    }
    
    async validate(validation, data) {
        for (let label in validation) {
            console.log(label);
            this.process(validation, label, data);
        }
    }

    process(validation, label, data) {
        // const errors = [];
        const rules = validation[label];
        rules.split('|').forEach(async (rule) => {

            const result = await this.resolveValitation(validation, label, data[label], rule);

            if( !result?.isValid ) {
                this.errors.push({ 'campo': result['field'],'message': result['message']});
            }
        })
    }

    resolveValitation(validation, label, data, rule) {
        let params = [];
        let callResolve = rule;

        //@todo: melhorar essa solução e min/max
        if(rule.indexOf(':') > 0) {
            callResolve = rule.split(':')[0];
            const name = callResolve;
            if(name == 'min') {
                params.push({'min': rule.split(':')[1]});
            }

            if(name == 'max') {
                params.push({'max': rule.split(':')[1]});
            }

            if(name == 'in') {
                params.push({'in': rule.split(':')[1]});
            }

            console.log(params);
            console.log('regraaa min ');
        }   

        return this[callResolve](label, data, params);
    }

    required(label, data, params) {
        if(data) {
            return {
                'isValid': true,
                'message': ''
            }
        }
        return {
            'isValid': false,
            'field': this.names[label],
            'message': `campo ${this.names[label]} é obrigatório`
        };
    }

    numeric(label, data, params) {
        if(!isNaN(data)) {
            return {
                'isValid': true,
                'message': ''
            }
        }
        return {
            'isValid': false,
            'field': this.names[label],
            'message': `campo ${this.names[label]} deve ser númerico`
        };
    }

    email(label, data, params) {
        const pattern = /\S+@\S+\.\S+/;
        const isEmail = pattern.test(data)

        if(isEmail) {
            return {
                'isValid': true,
                'message': ''
            }
        }
        return {
            'isValid': false,
            'field': this.names[label],
            'message': `campo ${this.names[label]} não é um email válido`
        };

    }

    in(label, data, params) {
        const isValid = params[0].in.indexOf(data) >= 0;
        if(isValid) {
            return {
                'isValid': true,
                'message': ''
            }
        }
        return {
            'isValid': false,
            'field': this.names[label],
            'message': `valor do campo ${this.names[label]}, não existe`
        };
    }

    min(label, data, params) {
        const rule = label.split(':');
        const minChar = params[0].min ?? 0;
        console.log({ 'eitaa': minChar });
        if(label && data.toString().length >= minChar) {
            return {
                'isValid': true,
                'message': ''
            }
        }
        return {
            'isValid': false,
            'field': this.names[label],
            'message': `campo ${this.names[label]} deve ter no mínimo ${minChar} caracteres`
        };
    }

    max(label, data, params) {
        const rule = label.split(':');
        const maxChar = params[0].max ?? 1000;
        console.log({ 'eitaa': maxChar });
        if(label && data.toString().length <= maxChar) {
            return {
                'isValid': true,
                'message': ''
            }
        }
        return {
            'isValid': false,
            'field': this.names[label],
            'message': `campo ${this.names[label]} deve ter no máximo ${maxChar} caracteres`
        };
    }
}

module.exports = new Validator();
