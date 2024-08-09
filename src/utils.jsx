
function inputs2object(inputs) {
    var ret = {}

    for (let i = 0; i < inputs.length; i++) {
        const element = inputs[i];
        if (element.id != null && element.value != "") {
            if (element.type == "checkbox") {
                if (element.checked)
                    ret[element.id] = "true"
            } else {
                ret[element.id] = element.value
            }
        }
    }

    return ret
}

export {
    inputs2object
}