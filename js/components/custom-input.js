Vue.component('custom-input', {
    props: ['type', 'placeholder', 'label', 'value', 'index', 'options', 'required', 'columns'],
    template: '#form-element',
    data: function () {
        return {
            theValue: this.value,
            theIndex: this.index,
            theType: this.type,
            validationRules: 'required',
            theColumns: this.columns,
            template: "",
        }
    },
    inject: ['$validator'],
    watch: {
        theValue: function () {
            Bus.$emit('inputUpdated', this.theValue, this.theIndex);
        }
    },
    created: function () {
        
    },
    mounted: function () {
        this.updateTemplate();
    },
    updated: function(){
        
    },
    destroyed: function(){
        console.log('destroyed');
        this.updateTemplate();
    },
    methods: {
        getCheckboxValues: function (options) {
            var checkedArray = [];
            options.forEach(x => {
                if (x.value) {
                    checkedArray.push(x.name);
                }
            });
            Bus.$emit('inputUpdated', checkedArray, this.theIndex);
        },
        updateTemplate: function () {
            Bus.$emit('templateUpdated');
        }
    }
});