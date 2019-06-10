window.Bus = new Vue();
Vue.use(VeeValidate);



Vue.component('custom-input', {
    props: ['type', 'placeholder', 'label', 'value', 'index', 'options', 'required'],
    template: `
        <div class="input-wrap">
            <ValidationProvider rules="required" v-slot="{ errors }">
                <input v-model="value" type="text">
                <span id="error">{{ errors[0] }}</span>
            </ValidationProvider>

        </div>
    `,
    data: function () {
        return {
            theValue: this.value,
            theIndex: this.index,
            theType: this.type,
            validationRules: 'required'
        }
    },
    inject: ['$validator'],
    watch: {
        theValue: function () {
            Bus.$emit('inputUpdated', this.theValue, this.theIndex);
        }
    },
    created: function () {
        console.log(this.theType);

        this.$validator = this.$parent.$validator

    },
    mounted: function () {

    },
    methods: {
        getCheckboxValues: function (options) {
            var checkedArray = [];
            options.forEach(x => {
                console.log(x.value);
                if (x.value) {
                    checkedArray.push(x.name);
                }
            });
            Bus.$emit('inputUpdated', checkedArray, this.theIndex);
        }
    }
});


var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        formElements: [
            //text
            {
                type: "text",
                label: "label - Question Goes Here",
                placeholder: "placeholder text",
                value: "",
                required: true,

            },
            
        ]

    },
    created: function () {
        Bus.$on('inputUpdated', function (value, index) {
            //update value on input/change
            app.formElements[index].value = value;
            console.log(app.formElements[index].label, app.formElements[index].value);
            console.log(app.formElements);
        });
    },
    mounted: function () {
        this.$on('veeValidate', () => {
            Bus.$emit('veeValidate');
        });

    },
    methods: {
        validateCustomForm: function () {
            // console.log("validate custom form");

            this.$validator.validateAll().then((result) => {
                console.log(result);
                if (!result) {
                    alert('error');
                    return;
                }
                alert('success');
            }).catch(() => {
                alert('catch');
            });
        }



    }
});
