import {FunctionArguments} from './types';
import {isFunction} from './assetions'
import memoizeOne from 'memoize-one'

export const runIfFn = <T, U>(valueOrFn: T | ((...args: U[]) => T), ...args: U[]): T => {
    return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn
}

export const callAllHandler = <T extends (event: any) => void>(
    ...fns: (T | undefined)[]
) => {
    return (event: FunctionArguments<T>[0]) => {
        fns.some((fn) => {
            fn && fn(event)
            return event && event.defaultPrevented
        })
    }
}

export {memoizeOne}

export const once = (fn?: Function | null) => {
    let result: any;

    return function (this: any, ...args: any[]){
        if(fn){
            result = fn.apply(this, args)
            fn = null
        }

        return result
    }
}

export const noop = () => {}