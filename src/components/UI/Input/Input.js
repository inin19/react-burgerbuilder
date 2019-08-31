import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputELement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shoudValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }






    switch (props.elementType) {
        case ('input'):
            inputELement = <input onChange={props.changed} className={inputClasses.join(' ')}  {...props.elementConfig} value={props.value} />
            break;
        case ('textarea'):
            inputELement = <input onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} />
            break;
        case ('select'):
            inputELement = (
                <select onChange={props.changed} className={inputClasses.join(' ')} value={props.value}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}> {option.displayValue} </option>
                    ))}
                </select>
            )
            break;
        default:
            inputELement = <input onChange={props.changed} className={inputClasses.join(' ')}  {...props.elementConfig} value={props.value} />;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.Label}</label>
            {inputELement}
        </div>
    )
};
export default input;