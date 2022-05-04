export {}

export const asyncHandlerTest = () => async (func: Function, deps?: any) => {
    const res =  await func(deps!)
    return res
}