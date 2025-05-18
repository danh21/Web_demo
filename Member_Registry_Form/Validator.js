function validator(options) {
    var formElement = document.querySelector(options.form)
    var selectorRules = {}  // key là các field input, value là mảng chứa các rule là function 



    function getParent(element, selector) {             // lấy ra element cha của element là selector
        while(element.parentElement) {
            if(element.parentElement.matches(selector))
                return element.parentElement
            element = element.parentElement
        }
    }



    function validate(inputElement, rule, errorElement) { // xử lí báo lỗi
        var errorMessage       
        var rules = selectorRules[rule.selector] // mảng chứa các rule của inputElement đang xét

        // lặp qua từng rule và test
        for (var i = 0; i < rules.length; i++) { 
            switch(inputElement.type) {
                case 'checkbox':
                case 'radio':   // kiểm tra đã chọn chưa
                    errorMessage = rules[i](formElement.querySelector(rule.selector + ':checked'))
                    break
                default:
                    errorMessage = rules[i](inputElement.value)
                    break
            }
            if (errorMessage) break;
        }
        
        // handle error
        if (errorMessage) {
            getParent(inputElement, options.formGroupSelector).classList.add('invalid')
            errorElement.innerText = errorMessage
        }
        else {
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
            errorElement.innerText = ''
        }

        return errorMessage
    }



    formElement.onsubmit = function (e) {   // handle submit form
        e.preventDefault()  // ngăn lỗi submit mặc định      
        var isFormValid = true
        
        // kiểm tra từng rule 
        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector)
            var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector)
            validate(inputElement, rule, errorElement)          
            if (validate(inputElement, rule, errorElement)) // kiểm tra form có lỗi j ko
                isFormValid = false
        })

        if (isFormValid) {  // form ko lỗi, có thể submit
            if (typeof options.onSubmit === 'function') { // hàm submit bằng javascript
                var enableInputs = formElement.querySelectorAll('[name]') // Nodelist 
                var formValues = Array.from(enableInputs).reduce(function (values, input) { // all giá trị nhập vào
                    switch (input.type) {
                        case 'radio':
                            values[input.name] = formElement.querySelector('input[name=' + input.name + ']' + ':checked').value
                            break
                        case 'checkbox':
                            if (!Array.isArray(values[input.name]))
                                values[input.name] = []
                            if (input.matches(':checked'))
                                values[input.name].push(input.value)                           
                            break
                        case 'file':
                            values[input.name] = input.files
                            break
                        default:
                            values[input.name] = input.value
                            break
                    }
                   return values
                }, {})
                options.onSubmit(formValues) // output
            } 
            else // nếu ko có hàm submit bằng javascript thì xử lí mặc định
                formElement.submit()  
        }
    } 

    

    if (formElement) {
        options.rules.forEach(function (rule) {
            var inputElements = document.querySelectorAll(rule.selector)
            Array.from(inputElements).forEach(function (inputElement) {
                var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector)                
                // handle events
                if (inputElement) {
                    // Khi blur khỏi input
                    inputElement.onblur = function() {  
                        validate(inputElement, rule, errorElement)
                    }
                    // Khi nhập vào input
                    inputElement.oninput = function() { 
                        errorElement.innerText = ''
                        getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
                    }
                } 
            })
            // Tạo ra selectorRules chứa tất cả các rule theo từng selector
            if (Array.isArray(selectorRules[rule.selector])) 
                selectorRules[rule.selector].push(rule.test)
            else 
               selectorRules[rule.selector] = [rule.test]        
        })
    }       
}



validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        test: function(valueForm) {
            return valueForm.trim() ? undefined : message || 'Vui lòng nhập vào trường này.'  // trim để loại bỏ dấu space
        }
    }
    
}

validator.isChecked = function(selector, message) {
    return {
        selector: selector,
        test: function(valueForm) {
            return valueForm ? undefined : message || 'Vui lòng chọn vào trường này.' 
        }
    }
    
}

// https://www.w3resource.com/javascript/form/email-validation.php
validator.isEmail = function(selector) {
    return {
        selector: selector,
        test: function(valueForm) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(valueForm) ? undefined : 'Vui lòng nhập email chính xác.'
        }
    }
}


validator.minLength = function(selector, minLen) {
    return {
        selector: selector,
        test: function(valueForm) {
            return valueForm.length >= minLen ? undefined : `Vui lòng nhập ít nhất ${minLen} kí tự.`
        }
    }
}


validator.isConfirmed = function(selector, getPasswordValue, message) {
    return {
        selector: selector,
        test: function(valueForm) {
            return valueForm === getPasswordValue() ? undefined : message || 'Giá trị nhập vào không chính xác.'
        }
    }
}