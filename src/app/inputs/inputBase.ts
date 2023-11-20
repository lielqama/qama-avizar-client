import { Input, Directive, Output, EventEmitter } from "@angular/core";

import { AppState } from "src/app/services/AppState";

@Directive()
export class InputBase {

    @Input() hideLabel: boolean = false;
    @Input() _class: string = 'my-2';
    @Input() required: boolean = false;
    @Input() placeholder: string = '';
    @Input() icon: string = null;
    @Input() help: string = null;

    @Output() focus: EventEmitter<any> = new EventEmitter();

    onFocus() {
        this.focus.emit();
    }
    uid = this.uniqId();

    disabled: boolean = false;
    innerValue: any;

    onChange: (_: any) => {};

    writeValue(obj: any): void {
        this.innerValue = obj;
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void { }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    private uniqId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    public isValid(event: Event) {
        var input: any = event.currentTarget;
        if (input.checkValidity()) {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        }
        else {
            input.classList.add("is-invalid");
            input.classList.remove("is-valid");
        }
    }

    isValidID(event: Event) {
        var input: any = event.currentTarget;
        let _ev: any = event;
        let val = _ev.currentTarget.value;
        if (input.checkValidity() && (!val || this.israelIDValidation(val))) {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        }
        else {
            input.classList.add("is-invalid");
            input.classList.remove("is-valid");
        }
    }

    private israelIDValidation(str) {
        if (!str || str.length != 9)
            return false;

        let step1Result = [];
        for (let index = 0; index < 8; index++) {
            var asInt = parseInt(str[index]);
            if (index % 2 == 0) {
                step1Result.push(1 * asInt);
            }
            else {
                step1Result.push(2 * asInt);
            }
        }

        let step2Result = [];
        step1Result.forEach(element => {
            if (element >= 10) {
                let asString = element.toString();
                var digit1 = parseInt(asString[0]);
                var digit2 = parseInt(asString[1]);
                step2Result.push(digit1 + digit2);
            }
            else {
                step2Result.push(element);
            }
        });

        let step3Result = 0;
        step2Result.forEach(element => {
            step3Result += element;
        });

        let checkdigit = 0;
        while (((step3Result + checkdigit) % 10) != 0) {
            checkdigit++;
        }

        return checkdigit.toString() === str[8];

    }

    setData() {
        AppState.helpContent = this.help;
    }

}