import { Fragment } from "react";

function RadioChoice({ choices, id, onChange, value}) {
    return <div id={id} className="btn-group" role="group" aria-label="Basic radio toggle button group">
        {choices.map((choice, i) => <Fragment key={i}>
            <input onChange={onChange ? () => {onChange(getRadioChoiceValue(id))} : null}
                type="radio" className="btn-check" data_radio_val={choice.value} name={id} id={id + "-btn-" + i} autoComplete="off" defaultChecked={choice.value == value} />
            <label className="btn btn-outline-primary" htmlFor={id + "-btn-" + i}>{choice.name}</label>
        </Fragment>)}
    </div>
}

function getRadioChoiceValue(id) {
    const elems = document.getElementById(id).children

    for (let i = 0; i < elems.length; i++) {
        const elem = elems[i];
        if (elem.localName == "input" && elem.checked)
            return elem.attributes.data_radio_val.value
    }
}

export {
    RadioChoice,
    getRadioChoiceValue
}