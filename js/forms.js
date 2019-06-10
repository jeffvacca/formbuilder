window.Bus = new Vue();

Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

const dictionary = {
    en: {
        messages: {
            decimal: (field, [decimals = '*'] = []) => `The ${field} field must be numeric.`,
        }
    },
};

VeeValidate.Validator.localize(dictionary);
Vue.use(VeeValidate);

var app = new Vue({
    el: '#app',
    data: {
        fieldType: "",
        question: "",
        required: false,
        placeholder: "",
        columns: 12,
        hoverIndex: null,
        showAddFormElements: false,
        showRemoveFormElements: false,
        showConfirm: false,
        itemToRemove: null,
        showChangeOrder: false,
        options: [
            {
                name: "",
                value: "",
            }, {
                name: "",
                value: "",
            }
        ],
        checkboxOptions: [
            {
                name: "",
                value: false,
            }, {
                name: "",
                value: false,
            }
        ],
        formElements: [
            {
                type: 'text',
                label: '1',
                placeholder: '1',
                value: "",
                required: false,
                columns: 12
            },
            {
                type: 'text',
                label: '2',
                placeholder: '2',
                value: "",
                required: false,
                columns: 12
            },
            {
                type: 'text',
                label: '3',
                placeholder: '3',
                value: "",
                required: false,
                columns: 6
            },
            {
                type: 'text',
                label: '4',
                placeholder: '4',
                value: "",
                required: false,
                columns: 6
            },
        ],
        template: "",


    },
    watch: {
        fieldType: function () {
            this.clearFields(false);
        }
    },
    computed: {
        output: function () {
            var theOutput = this.formElements.map(x => [x.label, x.value]);
            return theOutput;
        }
    },
    created: function () {
        this.listeners();

    },
    mounted: function () {

    },
    methods: {
        changeOrder: function(direction, i){
            if(direction == 'up'){
                //up
                if(i == 0) return;
                this.formElements.move(i, i-1);

            }else{
                //down
                if(i == this.formElements.length - 1) return;
                this.formElements.move(i, i+1);

            }
            this.updateTemplate();
        }, 
        updateTemplate: function(){
            Vue.nextTick(function () {
                var code = document.getElementById('form-container').innerHTML;
                app.template = code;
            })
        },
        listeners: function () {
            Bus.$on('inputUpdated', function (value, index) {
                //update value on input/change
                app.formElements[index].value = value;
            });
            Bus.$on('templateUpdated', function () {
                Vue.nextTick(function () {
                    app.updateTemplate();
                })
            });
            Bus.$on('validateNewField', function () {
                app.validateField();
            });
            Bus.$on('clearNewFields', function (all) {
                app.clearFields(all);
            });
            Bus.$on('addNewOption', function () {
                app.addOption();
            });
            Bus.$on('removeNewOption', function (i) {
                app.removeOption(i);
            });
            Bus.$on('addNewCheckboxOption', function () {
                app.addCheckboxOption();
            });
            Bus.$on('removeNewCheckboxOption', function (i) {
                app.removeCheckboxOption(i);
            });
        },

        clearErrors: function (scope) {
            this.$validator.reset(scope);
        },
        validateCustomForm: function () {
            this.$validator.validateAll('customInputs').then((result) => {
                if (!result) {
                    //alert('error');
                    return;
                }
                alert('success');
            }).catch(() => {
                alert('catch');
            });
        },
        addOption: function () {
            this.options.push(
                {
                    name: "",
                    value: "",
                }
            );
        },
        removeOption: function (i) {
            this.options.splice(i, 1);
        },
        addCheckboxOption: function () {
            this.checkboxOptions.push(
                {
                    name: "",
                    value: false,
                }
            );
        },
        removeCheckboxOption: function (i) {
            this.checkboxOptions.splice(i, 1);
        },
        validateField: function () {
            console.log('validateField');
            this.$validator.validateAll('addField').then((result) => {
                console.log(result);
                if (!result) {
                    return;
                }
                this.saveField();
            }).catch(() => {

            });
        },
        saveField: function () {
            //console.log('saveField');
            if (this.fieldType == "text" || this.fieldType == "number" || this.fieldType == "textarea" || this.fieldType == "tel" || this.fieldType == 'email') {
                this.formElements.push(
                    {
                        type: this.fieldType,
                        label: this.question,
                        placeholder: this.placeholder,
                        value: "",
                        required: this.required,
                        columns: this.columns
                    }
                );

                this.clearFields(true);


            };
            if(this.fieldType == "separator"){
                this.formElements.push(
                    {
                        type: this.fieldType,
                        columns: 12
                    }
                );

                this.clearFields(true);
            };
            if(this.fieldType == "section-header"){
                this.formElements.push(
                    {
                        type: this.fieldType,
                        label: this.question,
                        columns: 12
                    }
                );

                this.clearFields(true);
            };
            if (this.fieldType == "checkbox") {
                this.formElements.push(
                    {
                        type: this.fieldType,
                        label: this.question,
                        value: false,
                        required: this.required,
                        columns: this.columns
                    }
                );
                this.clearFields(true);
            }
            if (this.fieldType == "select") {
                this.options.forEach(function (x, i) {
                    x.name = x.value;
                });
                this.formElements.push(
                    {
                        type: "select",
                        label: this.question,
                        placeholder: this.placeholder,
                        value: this.placeholder,
                        required: this.required,
                        options: this.options,
                        columns: this.columns
                    }
                );
                this.clearFields(true);
            }
            if (this.fieldType == "checkbox-group") {
                this.checkboxOptions.forEach(function (x) {
                    x.value = false;
                });
                this.formElements.push(
                    {
                        type: "checkbox-group",
                        label: this.question,
                        value: "",
                        placeholder: this.placeholder,
                        required: this.required,
                        options: this.checkboxOptions,
                        columns: this.columns
                    }
                );
                this.clearFields(true);
            }
            if (this.fieldType == "radio") {
                this.options.forEach(function (x) {
                    x.value = x.name;
                });
                this.formElements.push(
                    {
                        type: "radio",
                        label: this.question,
                        required: this.required,
                        options: this.options,
                        value: "",
                        columns: this.columns
                    }
                );
                //clear fields
                this.clearFields(true);
            }

        },
        clearFields: function (all) {
            this.$validator.pause();
            if (all) {
                this.fieldType = "";
            }
            this.question = "";
            this.placeholder = "";
            this.required = false;
            this.columns = 12;
            this.options = [
                {
                    name: "",
                    value: "",
                }, {
                    name: "",
                    value: "",
                }
            ];
            this.checkboxOptions = [
                {
                    name: "",
                    value: false,
                }, {
                    name: "",
                    value: false,
                }
            ];
            this.clearErrors('addField');
            //prevents vee-validate from trying to run validatin on a non-existant field.
            setTimeout(() => {
                this.$validator.resume();
            }, 100);
        },
        mouseOver: function (i) {
            this.hoverIndex = i;
        },
        mouseLeave: function () {
            this.hoverIndex = null;
        },
        confirmRemove(i) {
            this.showConfirm = true;
            this.itemToRemove = i;
        },
        cancelConfirm() {
            this.showConfirm = false;
            this.itemToRemove = null;
        },
        removeFormElement: function (i) {
            this.formElements.splice(i, 1);
            this.hoverIndex = null;
            this.showConfirm = false;
            this.itemToRemove = null;
            this.showRemoveFormElements = false;
        }

    }
});
