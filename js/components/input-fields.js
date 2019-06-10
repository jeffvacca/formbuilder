Vue.component('question',{
    props: ['value'],
    inject: ['$validator'],
    template: `
        <div class="input-wrap">
            <label for="question">Question</label>
            <input type="text" name="question" :value="value"  placeholder="Question" v-on:input="updateQuestion($event.target.value)" ref="input"
                v-validate="'required'"
                :class="{'input': true, 'is-danger': errors.has('addField.question')}"
            >
            <span v-show="errors.has('addField.question')" class="help is-danger">{{ errors.first('addField.question') }}</span>
        </div>
    `,
    methods: {
        updateQuestion: function(question){
            this.$emit('input', question);
        }
    } 
})


Vue.component('section-header',{
    props: ['value'],
    inject: ['$validator'],
    template: `
        <div class="input-wrap">
            <label for="section-header">Header Text</label>
            <input type="text" name="section-header" :value="value"  placeholder="Header Text" v-on:input="updateQuestion($event.target.value)" ref="input"
                v-validate="'required'"
                :class="{'input': true, 'is-danger': errors.has('addField.section-header')}"
            >
            <span v-show="errors.has('addField.section-header')" class="help is-danger">{{ errors.first('addField.section-header') }}</span>
        </div>
    `,
    methods: {
        updateQuestion: function(question){
            this.$emit('input', question);
        }
    } 
})

Vue.component('placeholder',{
    props: ['value'],
    template: `
        <div class="input-wrap">
            <label for="placeholder">Placeholder</label>
            <input type="text" name="placeholder" :value="value" placeholder="Add default display text here" v-on:input="updatePlaceholder($event.target.value)" ref="input">
        </div>
    `,
    methods: {
        updatePlaceholder: function(plHolder){
            this.$emit('input', plHolder);
        }
    }
})

Vue.component('required',{
    props: ['value'],
    template: `
        <div class="input-wrap">
            <label for="required">Required?</label>
            <input type="checkbox" name="required" :value="value" v-on:input="updateRequired($event.target.value)" ref="input">
        </div>
    `,
    methods: {
        updateRequired: function(req){
            this.$emit('input', req);
        }
    }
})

Vue.component('columns',{
    props: ['value'],
    inject: ['$validator'],
    template: `
        <div class="input-wrap">
            <label for="columns">Width - how many columns / 12</label>
            <input type="number" name="columns" :value="value" placeholder="Enter number of columns / 12" min="1" max="12" v-on:input="updateColumns($event.target.value)" ref="input"
                v-validate="'required|numeric|between:1,12'"
                :class="{'input': true, 'is-danger': errors.has('addField.columns')}"
            >
            <span v-show="errors.has('addField.columns')" class="help is-danger">{{ errors.first('addField.columns') }}</span>
        </div>
    `,
    methods: {
        updateColumns: function(col){
            this.$emit('input', col);
        }
    }
})

Vue.component('option-input',{
    //props: ['value'],
    props: {
        value: {
            type:String,
            default:'',
        },
        index: {
            type: Number,
            default: null
        }
    },
    inject: ['$validator'],
    template: `
        <div>
            <label for="question">Add Option</label>
            <input type="text" :name="'option'+index" :value="value" placeholder="Add option here" v-on:input="updateOption($event.target.value)" ref="input"
                :data-vv-name="'option'+(index+1)"
                v-validate="'required'"
                :class="{'input': true, 'is-danger': errors.has('addField.option'+(index+1))}"
            >
            </input>
            <span v-show="errors.has('addField.option'+(index+1))" class="help is-danger">{{ errors.first('addField.option'+(index+1)) }}</span>
        </div>
    `,
    methods: {
        updateOption: function(opt){
            this.$emit('input', opt);
        },
    }
})

Vue.component('option-buttons',{
    props: {
        index: {
            type: Number,
            default: null
        },
        optiontype: {
            type: String,
            default:''
        }
    },
    template: `
        <div>
            <span v-show="errors.has('addField.option'+(index+1))" class="help is-danger">{{ errors.first('addField.option'+(index+1)) }}</span>
            <span v-if="index > 1" class="button hollow alert" v-on:click="removeOption(index)">Remove This Option</span>
        </div>
    `,
    methods: {
        removeOption: function(i){
            if(this.optiontype == 'checkbox'){
                Bus.$emit('removeNewCheckboxOption', i);
            }else{
                Bus.$emit('removeNewOption', i);
            }
        },
    }
})

Vue.component('save-buttons',{
    props: [],
    inject: ['$validator'],
    template: `
        <div>
            <div class="button" v-on:click="validateField()">Save</div>
            <div class="button secondary" v-on:click="clearFields(true)">Cancel</div>
        </div>
    `,
    methods: {
        validateField: function(){
            Bus.$emit('validateNewField');
        },
        clearFields: function(all){
            Bus.$emit('clearNewFields', all);
        }
    }
})

Vue.component('add-option',{
    props: [],
    template: `
        <div class="input-wrap">
            <div class="button success hollow" v-on:click="addOption()">Add another option</div>
        </div>
    `,
    methods: {
        addOption: function(){
            Bus.$emit('addNewOption');
        },
    }
})

Vue.component('add-checkbox-option',{
    props: [],
    template: `
        <div class="input-wrap">
            <div class="button success hollow" v-on:click="addCheckboxOption()">Add another option</div>
        </div>
    `,
    methods: {
        addCheckboxOption: function(){
            Bus.$emit('addNewCheckboxOption');
        },
    }
})








